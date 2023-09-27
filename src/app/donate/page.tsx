"use client";
import Hero from "@/components/about/Hero";
import { SEO } from "@/components/shared/SEO";
import { Box, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { client, urlFor } from "../../../sanity/sanity-client";
import { groq } from "next-sanity";
import DataLoader from "@/components/shared/DataLoader";
import Reveal from "@/components/shared/Reveal";
import CustomList from "@/components/shared/CustomListItem";

const Donate = () => {
  const { data: heroDonate, isLoading: heroIsLoading } = useQuery(
    "donateHero",
    async () => {
      return client.fetch(groq`*[_type == "donateHero" ]`);
    }
  );

  const heroContent = heroDonate?.[0];

    const { data, isLoading } = useQuery(
    "donation",
    async () => {
      return client.fetch(groq`*[_type == "donation" ]`);
    }
  );

  const donationContent = data?.[0];


  return (
    <Box>
      <SEO
        title="Donate"
        description="Support Our Mission - Help us make a difference by donating today. Your contribution fuels our work and brings positive change to our community."
        path="/donate"
      />
      {heroIsLoading ? (
        <DataLoader />
      ) : (
        <>
          <Reveal width="100%" height={{ base: "100%", xl: "28rem" }}>
            <Hero
              heading={heroContent?.title}
              description={heroContent?.description}
              image={
                heroContent?.image &&
                (urlFor(heroContent?.image?.asset?._ref) as unknown as string)
              }
              alt={heroContent?.image?.alt}
            />
          </Reveal>
          <VStack py={16} spacing={6} px={8}>
          <Reveal>
              <Heading
              as="h2"
              fontSize={{ base: "2xl", xl: "3xl" }}
              textAlign="center"
              color="secondary.700"
            >
              {donationContent?.title}
            </Heading>
          </Reveal>
            <Box>
              <CustomList listItems={donationContent?.donationInstruction} />
            </Box>
          </VStack>
        </>
      )}
    </Box>
  );
};

export default Donate;
