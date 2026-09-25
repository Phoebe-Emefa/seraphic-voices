"use client";

import { Providers } from "@/app/providers";
import Footer from "@/components/container/Footer";
import NavBar from "@/components/container/Navbar";
import { HeroNavProvider } from "@/components/home/Hero/HeroNavContext";
import RouteTransition from "@/components/shared/RouteTransition";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return (
      <Providers>
        <Box as="main" role="main" h="100dvh" w="full" overflow="hidden">
          {children}
        </Box>
      </Providers>
    );
  }

  return (
    <Providers>
      <HeroNavProvider>
        <NavBar />
        <RouteTransition onNavigatingChange={setIsNavigating} />
        <Box
          as="main"
          role="main"
          minH="100dvh"
          pos="relative"
          mt={20}
          opacity={isNavigating ? 0.92 : 1}
          transition="opacity 150ms ease-out"
        >
          {children}
        </Box>
        <Footer />
      </HeroNavProvider>
    </Providers>
  );
};

export default AppShell;
