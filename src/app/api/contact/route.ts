import { emailHtmlTemplate } from "@/utils/template";
import { mailOptions, transporter } from "../../../../config/nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contactSchema";
import { escapeHtml } from "@/lib/escapeHtml";

const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY = 32_768;
const buckets = new Map<string, { count: number; reset: number }>();

const messageFields = {
  subject: "Subject",
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  message: "Message",
} as const;

function clientKey(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function rateLimited(key: string) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || now > current.reset) {
    buckets.set(key, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_LIMIT;
}

function originAllowed(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function generateEmailContent(data: Record<string, string>) {
  const stringData = Object.entries(messageFields).reduce((str, [key, label]) => {
    return `${str}${label}:\n${data[key] ?? ""}\n\n`;
  }, "");

  const htmlData = Object.entries(messageFields).reduce((str, [key, label]) => {
    return `${str}<h3 class="form-heading" align="left">${escapeHtml(
      label
    )}</h3><p class="form-answer" align="left">${escapeHtml(data[key])}</p>`;
  }, "");

  return {
    text: stringData,
    html: emailHtmlTemplate(htmlData),
  };
}

export async function POST(request: NextRequest) {
  if (!originAllowed(request)) {
    return NextResponse.json({ message: "Invalid request" }, { status: 403 });
  }

  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY) {
    return NextResponse.json({ message: "Message is too large" }, { status: 413 });
  }

  if (rateLimited(clientKey(request))) {
    return NextResponse.json({ message: "Please try again later" }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  let data;
  try {
    data = await contactSchema.validate(json, { stripUnknown: true, abortEarly: false });
  } catch {
    return NextResponse.json({ message: "Please check the form and try again" }, { status: 400 });
  }

  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent(data as Record<string, string>),
      subject: data.subject || "Message from Website",
    });
  } catch {
    return NextResponse.json({ message: "Unable to send your message" }, { status: 500 });
  }

  return NextResponse.json({ message: "This message has been successfully sent" });
}
