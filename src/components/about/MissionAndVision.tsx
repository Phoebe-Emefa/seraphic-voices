"use client";
import {
  Box,
  Container,
  Grid,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { groq } from "next-sanity";
import { client } from "../../../sanity/sanity-client";

const MissionAndVision = () => {
  const { isLoading, data } = useQuery("whoWeAre", async () => {
    return client.fetch(groq`*[_type == "whoWeAre"]`);
  });

  const content = data?.[0];

  return (
    <Box backgroundColor="bg.100" py={{ base: 12, md: 20 }}>
      <Container
        maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }}
        py={16}
      >
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(2, 1fr)" }}
          gap={6}
        >
          <VStack
            align="left"
            pl={4}
            borderLeft="10px solid #04235c"
            backgroundColor="white"
            p={4}
            boxShadow="rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"
          >
            <Heading
              as="h4"
              fontSize={{ base: "2xl", xl: "3xl" }}
              color="secondary.700"
            >
              Mission Statement
            </Heading>
            <Text>{content?.mission}</Text>
          </VStack>
          <VStack
            align="left"
            pl={4}
            borderLeft="10px solid #04235c"
            backgroundColor="white"
            p={4}
            boxShadow="rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"
          >
            <Heading
              as="h4"
              fontSize={{ base: "2xl", xl: "3xl" }}
              color="secondary.700"
            >
              Vision Statement
            </Heading>
            <Text>{content?.vision}</Text>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
};

export default MissionAndVision;
