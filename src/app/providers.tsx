// app/providers.tsx
'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { Space_Grotesk } from 'next/font/google';

const brandFont = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700']
});

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-spacegrotesk: ${brandFont.style.fontFamily};
          }
        `}
      </style>

      <CacheProvider>
        <ChakraProvider theme={theme}>
            {children}
        </ChakraProvider>
      </CacheProvider>
    </>
  );
}
