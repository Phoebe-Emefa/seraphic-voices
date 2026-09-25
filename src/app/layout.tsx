import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import AppShell from "@/components/container";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildSiteJsonLd,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

/** CMS-backed routes must stay dynamic — literals required by Next.js segment config. */
export const dynamic = "force-dynamic";
export const revalidate = 0;

const brandFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-spacegrotesk",
});

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Seraphic Voices of Toronto",
    "gospel choir Toronto",
    "African choral music Toronto",
    "Toronto choir concerts",
    "non-denominational choir Toronto",
    "Western and African choral music",
    "book choir Toronto",
    "gospel choir Ontario",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: { index: true, follow: true },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" className={brandFont.variable}>
      <body className={brandFont.className}>
        <JsonLd data={buildSiteJsonLd()} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
