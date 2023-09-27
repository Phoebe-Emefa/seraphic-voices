"use client";
import Hero from "@/components/about/Hero";
import EventCard from "@/components/shared/EventCard";
import { Container,  Grid,  Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { groq } from "next-sanity";
import { client, urlFor } from "../../../sanity/sanity-client";
import DataLoader from "@/components/shared/DataLoader";
import { SEO } from "@/components/shared/SEO";
import Reveal from "@/components/shared/Reveal";

const Events = () => {
  const { isLoading, data } = useQuery("events", async () => {
    return client.fetch(groq`*[_type == "events"]`);
  });

  const { data: heroEvent, isLoading: heroIsLoading } = useQuery(
    "eventHero",
    async () => {
      return client.fetch(groq`*[_type == "eventHero" ]`);
    }
  );

  const heroContent = heroEvent?.[0];

  return (
    <>
      <SEO
        title="Events"
        description="Discover our upcoming events, from mesmerizing concerts to community engagements, and let our choir inspire your soul."
        path="/events"
      />
      {isLoading || heroIsLoading ? (
        <DataLoader />
      ) : (
        <>
          <Reveal  width="100%" height={{ base: "100%", xl: "28rem" }}>
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
          <Container
            maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }}
            py={16}
          >
            {data?.length > 0 ? (
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                }}
                gap={6}
                mt={6}
                mb={4}
              >
                {data?.map((item: any) => (
                  <EventCard key={item} event={item} />
                ))}
              </Grid>
            ) : (
              <VStack width="full" textAlign="center">
                <Text fontSize="xl" maxW="lg">
                  We currently have no upcoming events. Please stay tuned for
                  future updates and exciting happenings!
                </Text>
              </VStack>
            )}
          </Container>
        </>
      )}
    </>
  );
};

export default Events;
