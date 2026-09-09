import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import AppShell from "@/components/container";

const brandFont = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-spacegrotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.seraphicvoicestoronto.com"),
  title: {
    default: "Seraphic Voices of Toronto",
    template: "%s | Seraphic Voices of Toronto",
  },
  description:
    "Explore the fusion of Western and African music, fostering cross-cultural connections",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={brandFont.variable}>
      <body className={brandFont.className}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
