"use client";

import SectionEyebrow from "@/components/about/SectionEyebrow";
import AboutVisionSkeleton from "@/components/about/skeletons/AboutVisionSkeleton";
import { VisionPortableText } from "@/components/about/VisionPortableText";
import { useWhoWeArePage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { resolveAboutVision } from "@/lib/aboutUsContent";
import { hasPortableText } from "@/lib/portableText";
import {
  Box,
  Container,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

const AboutVision = () => {
  const pageQuery = useWhoWeArePage();

  if (isCmsLoading(pageQuery)) {
    return <AboutVisionSkeleton />;
  }

  const vision = resolveAboutVision(pageQuery.data);

  if (!vision) {
    return null;
  }

  const hasApproach = hasPortableText(vision.approach);

  return (
    <Box
      as="section"
      aria-labelledby="about-vision-heading"
      bg="bg.100"
      py={{ base: 10, sm: 16, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 4, sm: 6, md: 8, xl: 12 }}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "0.95fr 1.05fr" }}
          gap={{ base: 6, lg: 16 }}
          alignItems="center"
        >
          <VStack align="flex-start" spacing={{ base: 5, md: 6 }} order={{ base: 2, lg: 1 }}>
            {vision.eyebrow ? <SectionEyebrow label={vision.eyebrow} accent="gold" /> : null}
            {vision.founderName || vision.founderTitle ? (
              <Box>
                {vision.founderName ? (
                  <Heading
                    as="h2"
                    id="about-vision-heading"
                    fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                    fontWeight="bold"
                    color="secondary.700"
                    lineHeight={1.2}
                    letterSpacing="-0.02em"
                  >
                    {vision.founderName}
                  </Heading>
                ) : null}
                {vision.founderTitle ? (
                  <Text
                    mt={2}
                    fontSize={{ base: "sm", md: "md" }}
                    color="secondary.700"
                    fontWeight="semibold"
                    letterSpacing="0.04em"
                  >
                    {vision.founderTitle}
                  </Text>
                ) : null}
              </Box>
            ) : null}
            <VStack
              spacing={{ base: 3, md: 4 }}
              align="flex-start"
              w="full"
              maxW={{ base: "full", lg: "50ch" }}
            >
              <VisionPortableText value={vision.content} variant="body" />
            </VStack>
          </VStack>

          {vision.imageUrl ? (
            <Box order={{ base: 1, lg: 2 }} position="relative">
              <Box
                position="relative"
                h={{ base: "16rem", sm: "20rem", md: "26rem", lg: "28rem" }}
                borderRadius={{ base: "xl", md: "2xl" }}
                overflow="hidden"
                boxShadow="0 28px 64px -20px rgba(4, 35, 92, 0.3)"
              >
                <Image
                  src={vision.imageUrl}
                  alt={vision.imageAlt}
                  w="full"
                  h="full"
                  objectFit="cover"
                  objectPosition="center top"
                />
                <Box
                  position="absolute"
                  inset={0}
                  bg="linear-gradient(to top, rgba(3, 18, 48, 0.55) 0%, transparent 50%)"
                  pointerEvents="none"
                />
              </Box>
              <Box
                position="absolute"
                top={{ base: 4, md: 6 }}
                left={{ base: -3, md: -4 }}
                w={{ base: "5rem", md: "6rem" }}
                h={{ base: "5rem", md: "6rem" }}
                borderRadius="full"
                border="1px solid"
                borderColor="secondary.500"
                opacity={0.35}
                pointerEvents="none"
                aria-hidden
              />
            </Box>
          ) : null}
        </Grid>

        {hasApproach ? (
          <Box
            mt={{ base: 6, md: 14 }}
            w="full"
            pt={{ base: 6, md: 10 }}
            borderTop="1px solid"
            borderColor="blackAlpha.100"
          >
            <Box w={{ base: "2.5rem", md: "3.5rem" }} h="2px" bg="secondary.500" mb={{ base: 5, md: 6 }} />
            <VisionPortableText value={vision.approach} variant="approach" />
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

export default AboutVision;
