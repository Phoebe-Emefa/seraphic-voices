"use client";
import Hero from "@/components/about/Hero";
import EventCard from "@/components/shared/EventCard";
import { Container, Flex, Grid, Heading } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import { groq } from "next-sanity";
import { client } from "../../../sanity/sanity-client";

const Events = () => {
      const { isLoading, data } = useQuery("events", async () => {
    return client.fetch(groq`*[_type == "events"]`);
  });

  return (
    <>
      <Hero
        heading="Upcoming Events"
        description="Explore our upcoming events, from mesmerizing concerts to community engagements, and let the harmonious magic of our choir inspire your soul"
        image="images/events.jpg"
      />
      <Container
        maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }}
        py={16}
      >
       {
        data?.length > 0 ? (
           <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", xl: "repeat(3, 1fr)"}} gap={6} mt={6} mb={4}>
            {
          data?.map((item: any) => (
             <EventCard key={item} event={item} />
          ))
         }
       
        </Grid>
        ) : (
          <Flex justify="center" align="center" mt={16}>
            <Heading as="h3" fontSize="3xl">No Events Available</Heading>
          </Flex>
        )
       }
      </Container>
    </>
  );
};

export default Events;
