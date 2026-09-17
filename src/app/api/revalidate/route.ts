import { revalidateSanityDocument, type SanityWebhookDocument } from "@/lib/cms/revalidate";
import { timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function readSecret(request: NextRequest): string | null {
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) {
    return auth.slice("Bearer ".length).trim();
  }

  const header = request.headers.get("x-sanity-revalidate-secret");
  if (header) return header.trim();

  const query = request.nextUrl.searchParams.get("secret");
  return query?.trim() ?? null;
}

function isAuthorized(request: NextRequest): boolean {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected) return false;

  const provided = readSecret(request);
  if (!provided) return false;

  return secretsMatch(provided, expected);
}

function parseWebhookBody(body: unknown): SanityWebhookDocument[] {
  if (!body || typeof body !== "object") return [];

  const record = body as Record<string, unknown>;

  if (typeof record._type === "string") {
    return [{ _type: record._type, _id: typeof record._id === "string" ? record._id : undefined }];
  }

  if (Array.isArray(body)) {
    return body.flatMap((item) => parseWebhookBody(item));
  }

  return [];
}

export async function POST(request: NextRequest) {
  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json(
      { ok: false, message: "SANITY_REVALIDATE_SECRET is not configured." },
      { status: 503 },
    );
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON body." }, { status: 400 });
  }

  const documents = parseWebhookBody(body);
  if (documents.length === 0) {
    return NextResponse.json(
      { ok: false, message: "Webhook body must include a published document _type." },
      { status: 400 },
    );
  }

  const results = documents.map((document) => revalidateSanityDocument(document));

  return NextResponse.json({
    ok: true,
    revalidated: results,
    now: Date.now(),
  });
}
