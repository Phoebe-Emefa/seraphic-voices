"use client";

import { useHeroNav } from "@/components/home/Hero/HeroNavContext";
import { Box, Skeleton } from "@chakra-ui/react";
import { useEffect } from "react";

const AboutHeroSkeleton = () => {
  const heroNav = useHeroNav();

  useEffect(() => {
    heroNav?.setPageHeroActive(true);
    heroNav?.setTheme("light");
    return () => heroNav?.setPageHeroActive(false);
  }, [heroNav]);

  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading page hero"
      width="full"
      minH={{ base: "16rem", md: "22rem" }}
      position="relative"
      bg="secondary.100"
      mt={-20}
    >
      <Skeleton
        position="absolute"
        inset={0}
        h={{ base: "16rem", md: "22rem" }}
        w="full"
        borderRadius={0}
      />
      <Box
        position="absolute"
        left={{ base: 4, md: 12 }}
        bottom={{ base: 6, md: 10 }}
        right={{ base: 4, md: 12 }}
        maxW="3xl"
      >
        <Skeleton h={{ base: "2.25rem", md: "2.75rem" }} w={{ base: "70%", md: "50%" }} mb={4} />
        <Skeleton h="1rem" w={{ base: "90%", md: "75%" }} />
        <Skeleton h="1rem" w={{ base: "75%", md: "60%" }} mt={2} />
      </Box>
    </Box>
  );
};

export default AboutHeroSkeleton;
