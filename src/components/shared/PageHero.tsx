"use client";

import { PortableText } from "@/components/shared/PortableText";
import { useHeroNav } from "@/components/home/Hero/HeroNavContext";
import { Box, Heading, Image } from "@chakra-ui/react";
import { useEffect } from "react";

const PageHero = ({
  heading,
  description,
  image,
  alt,
}: {
  heading?: string;
  description?: string | any[];
  image?: string;
  alt?: string;
}) => {
  const heroNav = useHeroNav();

  useEffect(() => {
    heroNav?.setPageHeroActive(true);
    heroNav?.setTheme(image ? "immersive" : "light");
    return () => heroNav?.setPageHeroActive(false);
  }, [heroNav, image]);

  return (
    <Box width="full" minH={{ base: "16rem", md: "22rem" }} position="relative" mt={-20}>
      {image ? (
        <Image
          src={image}
          alt={alt || heading || "Seraphic Voices of Toronto"}
          width="100%"
          height={{ base: "16rem", md: "22rem" }}
          objectFit="cover"
          objectPosition="center"
        />
      ) : (
        <Box bg="secondary.100" height={{ base: "16rem", md: "22rem" }} />
      )}
      <Box
        position="absolute"
        inset={0}
        bg="linear-gradient(180deg, rgba(4,35,92,0.15) 0%, rgba(4,35,92,0.72) 100%)"
      />
      <Box
        position="absolute"
        left={{ base: 4, md: 12 }}
        bottom={{ base: 6, md: 10 }}
        right={{ base: 4, md: 12 }}
        color="white"
        maxW="3xl"
      >
        <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }} fontWeight={700} lineHeight={1.1} pb={1}>
          {heading}
        </Heading>
        {description ? (
          <Box mt={3} fontSize={{ base: "md", md: "lg" }} maxW="65ch" noOfLines={3}>
            {Array.isArray(description) ? (
              <PortableText value={description} color="white" />
            ) : (
              <Box color="white">{description}</Box>
            )}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default PageHero;
