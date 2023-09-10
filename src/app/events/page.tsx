"use client";
import Hero from "@/components/about/Hero";
import EventCard from "@/components/shared/EventCard";
import { Container, Grid } from "@chakra-ui/react";
import React from "react";

const Events = () => {
  return (
    <>
      <Hero
        heading="Upcoming Events"
        description="Explore our upcoming events, from mesmerizing concerts to community engagements, and let the harmonious magic of our choir inspire your soul"
      />
      <Container
        maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }}
        py={16}
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={6} mt={6} mb={4}>
          <EventCard />
          <EventCard />
          <EventCard />
        </Grid>
      </Container>
    </>
  );
};

export default Events;
