"use client";
import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const Story = () => {
  return (
    <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }} py={16}>
      <Flex direction={{base: "column", md: "row"}} justify="space-between" align="center" gap={6}>
        <Box height={{ md: "14rem", xl: "25rem" }}>
          <Image
            src="/images/choir-2.jpg"
            alt="The seraphic voices"
            width="100%"
            height="100%"
            objectFit="cover"
            objectPosition="bottom"
            rounded="md"
          />
        </Box>
        <Box width={{ base: "100%", md: "45%" }}>
          <Heading
            as="h4"
            fontSize={{ base: "2xl", xl: "3xl" }}
            color="secondary.700"
          >
            Our Story
          </Heading>
          <VStack fontSize={{ md: "md", xl: "lg" }} spacing={6} mt={3}>
            <Text>
              In the vibrant heart of Toronto&apos;s music scene, Seraphic
              Voices of Toronto emerged as a brilliant testament to the power of
              harmonious fusion. Founded by the visionary Samuel Wesley
              Asare-Kusi in May 2019, this exceptional choral ensemble embarked
              on a mission to bridge continents through song. With an initial
              ensemble of just eight singers, their collective passion for both
              Western and African choral traditions ignited a harmonious spark
              that would soon set the entire city ablaze with musical wonder
            </Text>
            <Text>
              As the years unfolded, Seraphic Voices of Toronto&apos;s
              resounding echoes became synonymous with excellence and
              innovation. Their dynamic performances, pulsating with an eclectic
              repertoire, graced the hallowed halls of churches, concert venues,
              community centers, and even virtual screens through live-streamed
              concerts. Easter, Christmas, and community engagement concerts
              became annual highlights, captivating audiences far and wide.
              Collaborations with diverse musical talents, both local and
              global, have not only broadened the group&apos;s sonic horizons
              but also deepened their commitment to fostering cultural
              understanding.
            </Text>
            <Text>
              Today, with a flourishing membership of 26, Seraphic Voices of
              Toronto stands unwavering in its dedication to excellence,
              cultural diversity, and community enrichment. Their music
              continues to serve as a wellspring of joy and inspiration,
              promising to serenade the world with boundless harmony and
              enduring unity.
            </Text>
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default Story;
