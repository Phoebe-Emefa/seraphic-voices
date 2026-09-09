"use client";

import SectionEyebrow from "@/components/about/SectionEyebrow";
import AboutVisionSkeleton from "@/components/about/skeletons/AboutVisionSkeleton";
import { useWhoWeAre } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { resolveAboutVision } from "@/lib/aboutUsContent";
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
  const whoWeAreQuery = useWhoWeAre();
  const { data } = whoWeAreQuery;
  const content = data?.[0];

  if (isCmsLoading(whoWeAreQuery)) {
    return <AboutVisionSkeleton />;
  }

  const vision = resolveAboutVision(content);

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
            <SectionEyebrow label={vision.eyebrow} accent="gold" />
            <Box>
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
              <Text
                mt={2}
                fontSize={{ base: "sm", md: "md" }}
                color="secondary.700"
                fontWeight="semibold"
                letterSpacing="0.04em"
              >
                {vision.founderTitle}
              </Text>
            </Box>
            <VStack spacing={{ base: 3, md: 4 }} align="flex-start" w="full" maxW={{ base: "full", lg: "50ch" }}>
              {vision.paragraphs.map((paragraph) => (
                <Text
                  key={paragraph}
                  fontSize={{ base: "md", sm: "md" }}
                  color="secondary.700"
                  opacity={0.9}
                  lineHeight={{ base: 1.7, md: 1.75 }}
                  sx={{ textWrap: "pretty" }}
                >
                  {paragraph}
                </Text>
              ))}
            </VStack>
          </VStack>

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
        </Grid>

        <Box
          mt={{ base: 6, md: 14 }}
          w="full"
          pt={{ base: 6, md: 10 }}
          borderTop="1px solid"
          borderColor="blackAlpha.100"
        >
          <Box w={{ base: "2.5rem", md: "3.5rem" }} h="2px" bg="secondary.500" mb={{ base: 5, md: 6 }} />
          <Text
            w="full"
            fontSize={{ base: "md", sm: "md", md: "xl" }}
            color="secondary.700"
            lineHeight={1.7}
            fontStyle="italic"
            fontWeight="medium"
            sx={{ textWrap: "pretty" }}
          >
            {vision.approach}
          </Text>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutVision;
