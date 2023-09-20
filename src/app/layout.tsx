"use client"
import Container from '@/components/container';
import { Metadata } from 'next';
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";


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
