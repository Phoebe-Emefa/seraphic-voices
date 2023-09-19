"use client"
import Container from '@/components/container';
import { Metadata } from 'next';
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const metadata: Metadata = {
  title: 'Seraphic Vocies of Toronto',
  description: `Seraphic Voices of Toronto`,
  openGraph: {
    images: ['/images/seraphic-voices.png']
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <ProgressBar height="4px" color="#04235c" shallowRouting />
        <Container>{children}</Container>
      </body>
    </html>
  );
}
