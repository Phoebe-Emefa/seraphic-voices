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
import { useQuery } from "react-query";
import { groq } from "next-sanity";
import { client, urlFor } from "../../../sanity/sanity-client";
import DataLoader from "@/components/shared/DataLoader";
import Reveal from "@/components/shared/Reveal";

const Story = () => {
  const { isLoading, data } = useQuery("whoWeAre", async () => {
    return client.fetch(groq`*[_type == "whoWeAre"]`);
  });

  const content = data?.[0];

  return (
    <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }} py={16}>
      {isLoading ? (
        <DataLoader />
      ) : (
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          gap={6}
        >
          <Box height={{ md: "14rem", xl: "25rem" }}  width={{ base: "100%", md: "45%" }}>
        <Reveal>
              <Image
              src={
                content?.image &&
                (urlFor(content?.image?.asset?._ref) as unknown as string)
              }
              alt={content?.image?.alt}
              width="100%"
              height="100%"
              objectFit="cover"
              objectPosition="bottom"
              rounded="md"
            />
        </Reveal>
          </Box>
          <Box width={{ base: "100%", md: "45%" }}>
          <Reveal>
              <Heading
              as="h4"
              fontSize={{ base: "2xl", xl: "3xl" }}
              color="secondary.700"
            >
              {content?.title}
            </Heading>
          </Reveal>
            <VStack fontSize={{ md: "md", xl: "lg" }} spacing={6} mt={3}>
             <Reveal> <Text>{content?.description_1}</Text></Reveal>
              <Reveal><Text>{content?.description_2}</Text></Reveal>
              <Reveal><Text>{content?.description_3}</Text></Reveal>
            </VStack>
          </Box>
        </Flex>
      )}
    </Container>
  );
};

export default Story;
