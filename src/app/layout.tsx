import Container from '@/components/container';
import { Metadata } from 'next';

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
        <Container>{children}</Container>
      </body>
    </html>
  );
}
