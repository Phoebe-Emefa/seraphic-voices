"use client";

import { Providers } from "@/app/providers";
import Footer from "@/components/container/Footer";
import NavBar from "@/components/container/Navbar";
import { HeroNavProvider } from "@/components/home/Hero/HeroNavContext";
import RouteTransition from "@/components/shared/RouteTransition";
import { Box } from "@chakra-ui/react";
import React, { useState } from "react";

const AppShell = ({ children }: { children: React.ReactNode }) => {
  const [isNavigating, setIsNavigating] = useState(false);

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
