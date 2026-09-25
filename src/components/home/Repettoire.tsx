"use client";

import CustomButton from "@/components/shared/CustomButton";
import VideoCard from "@/components/shared/VideoCard";
import RepettoireSkeleton from "@/components/home/skeletons/RepettoireSkeleton";
import { useHomePage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { cmsHref } from "@/lib/cmsHref";
import { httpsUrl } from "@/lib/httpsUrl";
import { buildYouTubeThumbnailFromUrl } from "@/lib/youtube";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
const Repettoire = () => {
  const homeQuery = useHomePage();
  const home = homeQuery.data;
  const section = home?.repertoire;

  if (isCmsLoading(homeQuery)) {
    return <RepettoireSkeleton />;
  }
  const ctaHref = cmsHref(section?.ctaHref) || httpsUrl(section?.ctaHref);
  const videos = section?.performances ?? [];

  if (!section?.eyebrow && !section?.heading && !section?.intro && videos.length === 0) {
    return null;
  }

  return (
    <Box
      as="section"
      aria-labelledby={section?.heading ? "repertoire-heading" : undefined}
      bg="bg.100"
      py={{ base: 16, sm: 20, md: 24 }}
      position="relative"
    >
      <Container maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }} px={{ base: 5, sm: 6, md: 8, xl: 12 }}>
        <VStack spacing={{ base: 8, md: 12 }} align="stretch">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "flex-end" }}
            gap={{ base: 5, md: 8 }}
          >
            <VStack align="flex-start" spacing={3} maxW="38rem">
              {section?.eyebrow ? (
                <HStack spacing={3} color="secondary.700">
                  <Box w={8} h="2px" bg="secondary.700" />
                  <Text
                    fontSize={{ base: "2xs", sm: "xs" }}
                    fontWeight="bold"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                  >
                    {section.eyebrow}
                  </Text>
                </HStack>
              ) : null}
              {section?.heading ? (
                <Heading
                  as="h2"
                  id="repertoire-heading"
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "4.5xl" }}
                  fontWeight="bold"
                  color="secondary.700"
                  lineHeight={1.15}
                  letterSpacing="-0.02em"
                >
                  {section.heading}
                </Heading>
              ) : null}
              {section?.intro ? (
                <Text fontSize={{ base: "sm", sm: "md" }} color="text" maxW="36rem" lineHeight={1.6}>
                  {section.intro}
                </Text>
              ) : null}
            </VStack>

            {section?.ctaTitle && ctaHref ? (
              <Box display={{ base: "none", md: "block" }}>
                <CustomButton
                  title={section.ctaTitle}
                  href={ctaHref}
                  width="13.5rem"
                  height="3.25rem"
                  fontSize="sm"
                />
              </Box>
            ) : null}
          </Flex>

          {videos.length > 0 ? (
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
              gap={{ base: 6, md: 8 }}
            >
              {videos.map((item, index) => {
                const url = httpsUrl(item?.url) || "";
                const image = buildYouTubeThumbnailFromUrl(url) || "";
                return (
                  <VideoCard
                    key={`${item.title}-${index}`}
                    title={item?.title || ""}
                    image={image}
                    url={url}
                  />
                );
              })}
            </Grid>
          ) : null}

          {section?.ctaTitle && ctaHref ? (
            <Box display={{ base: "block", md: "none" }} pt={2}>
              <CustomButton
                title={section.ctaTitle}
                href={ctaHref}
                width="100%"
                height="3.25rem"
                fontSize="sm"
              />
            </Box>
          ) : null}
        </VStack>
      </Container>
    </Box>
  );
};

export default Repettoire;
