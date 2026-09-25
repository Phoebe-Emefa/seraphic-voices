"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ProgressBar
            height="2px"
            color="#FFE099"
            delay={120}
            shallowRouting
            options={{ showSpinner: false }}
          />
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
