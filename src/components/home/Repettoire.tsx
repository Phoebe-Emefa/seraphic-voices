"use client";

import CustomButton from "@/components/shared/CustomButton";
import VideoCard from "@/components/shared/VideoCard";
import RepettoireSkeleton from "@/components/home/skeletons/RepettoireSkeleton";
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
import { imageSrc } from "../../../sanity/sanity-client";
import { useRepertoire } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";

const Repettoire = () => {
  const repertoireQuery = useRepertoire();
  const { data } = repertoireQuery;

  if (isCmsLoading(repertoireQuery)) {
    return <RepettoireSkeleton />;
  }

  return (
    <Box
      as="section"
      aria-labelledby="repertoire-heading"
      bg="bg.100"
      py={{ base: 16, sm: 20, md: 24 }}
      position="relative"
    >
      <Container maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }} px={{ base: 5, sm: 6, md: 8, xl: 12 }}>
        <VStack spacing={{ base: 8, md: 12 }} align="stretch">
          {/* Section Header */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "flex-end" }}
            gap={{ base: 5, md: 8 }}
          >
            <VStack align="flex-start" spacing={3} maxW="38rem">
              <HStack spacing={3} color="secondary.700">
                <Box w={8} h="2px" bg="secondary.700" />
                <Text
                  fontSize={{ base: "2xs", sm: "xs" }}
                  fontWeight="bold"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                >
                  Live Performances
                </Text>
              </HStack>
              <Heading
                as="h2"
                id="repertoire-heading"
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "4.5xl" }}
                fontWeight="bold"
                color="secondary.700"
                lineHeight={1.15}
                letterSpacing="-0.02em"
              >
                Featured Repertoire
              </Heading>
              <Text fontSize={{ base: "sm", sm: "md" }} color="text" maxW="36rem" lineHeight={1.6}>
                Experience the choral harmony and cultural blend through select recordings of our past concerts and special performances.
              </Text>
            </VStack>

            <Box display={{ base: "none", md: "block" }}>
              <CustomButton
                title="View full channel"
                href="https://www.youtube.com/@seraphicvoicesoftoronto"
                width="13.5rem"
                height="3.25rem"
                fontSize="sm"
              />
            </Box>
          </Flex>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={{ base: 6, md: 8 }}
          >
            {data?.map((item: any) => (
              <VideoCard
                key={item._id || item.title}
                title={item?.title}
                image={imageSrc(item?.image?.asset?._ref) || ""}
                url={item?.url}
              />
            ))}
          </Grid>

          {/* Mobile View All CTA */}
          <Box display={{ base: "block", md: "none" }} pt={2}>
            <CustomButton
              title="View full channel"
              href="https://www.youtube.com/@seraphicvoicesoftoronto"
              width="100%"
              height="3.25rem"
              fontSize="sm"
            />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Repettoire;
