"use client";

import CustomButton from "@/components/shared/CustomButton";
import { resolveObjectPosition } from "@/components/home/Hero/buildHeroSlides";
import AboutSkeleton from "@/components/home/skeletons/AboutSkeleton";
import { useHome } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { imageSrc } from "../../../sanity/sanity-client";

const About = () => {
  const homeQuery = useHome();
  const { data } = homeQuery;
  const content = data?.[0];

  if (isCmsLoading(homeQuery)) {
    return <AboutSkeleton />;
  }
  const aboutImage = content?.about_image;
  const imageUrl = imageSrc(aboutImage?.asset?._ref);
  const objectPosition = resolveObjectPosition(aboutImage);

  return (
    <Box
      as="section"
      aria-labelledby="home-about-heading"
      w="full"
      minH={{ base: "auto", lg: "100dvh" }}
      display="flex"
      alignItems="center"
      bg="secondary.100"
      py={{ base: 16, sm: 20, lg: 24 }}
      position="relative"
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 5, sm: 6, md: 8, xl: 12 }}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1.2fr" }}
          gap={{ base: 10, sm: 12, lg: 12, xl: 16 }}
          alignItems="center"
        >
          {/* Left Column: Narrative & Typography */}
          <VStack
            align="flex-start"
            spacing={{ base: 5, md: 6 }}
            order={{ base: 2, lg: 1 }}
          >
            {/* Elegant Minimal Eyebrow */}
            <HStack spacing={3} color="secondary.700">
              <Box w={8} h="2px" bg="secondary.700" />
              <Text
                fontSize={{ base: "xs", sm: "sm" }}
                fontWeight="bold"
                letterSpacing="0.18em"
                textTransform="uppercase"
              >
                About Our Ensemble
              </Text>
            </HStack>

            <Heading
              as="h2"
              id="home-about-heading"
              fontSize={{ base: "2.25xl", sm: "3xl", md: "4xl", lg: "4.5xl", xl: "5xl" }}
              fontWeight="bold"
              color="secondary.700"
              lineHeight={1.15}
              letterSpacing="-0.02em"
              sx={{ textWrap: "balance" }}
            >
              Harmonizing cultures through the gift of choral music.
            </Heading>

            {content?.about_description ? (
              <Text
                fontSize={{ base: "sm", sm: "md", lg: "lg" }}
                color="text"
                maxW="48ch"
                lineHeight={{ base: 1.7, md: 1.8 }}
              >
                {content.about_description}
              </Text>
            ) : null}

            <Box pt={{ base: 2, sm: 3 }} w={{ base: "full", sm: "auto" }}>
              <CustomButton
                title="Discover our story"
                href="/about-us"
                width={{ base: "100%", sm: "13rem" }}
                height={{ base: "3.25rem", md: "3.5rem" }}
                fontSize={{ base: "sm", md: "md" }}
              />
            </Box>
          </VStack>

          {/* Right Column: Massive Clean Cinematic Photo */}
          {imageUrl ? (
            <Flex
              direction="column"
              order={{ base: 1, lg: 2 }}
              w="full"
              align="center"
            >
              <Box
                position="relative"
                w="full"
                h={{ base: "18rem", sm: "24rem", md: "30rem", lg: "34rem" }}
                borderRadius={{ base: "xl", sm: "2xl" }}
                overflow="hidden"
                boxShadow="0 32px 72px -16px rgba(4, 35, 92, 0.28), 0 12px 28px -8px rgba(4, 35, 92, 0.12)"
                bg="primary"
              >
                <Image
                  src={imageUrl}
                  alt={aboutImage?.alt || "Seraphic Voices of Toronto ensemble"}
                  position="absolute"
                  inset={0}
                  w="full"
                  h="full"
                  objectFit="cover"
                  objectPosition={objectPosition}
                  loading="lazy"
                />

                {/* Ambient vignette scrim */}
                <Box
                  position="absolute"
                  inset={0}
                  bg="linear-gradient(to top, rgba(4, 25, 68, 0.35) 0%, transparent 40%)"
                  pointerEvents="none"
                />
              </Box>
            </Flex>
          ) : null}
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
