"use client";
import Hero from "@/components/about/Hero";
import EventCard from "@/components/shared/EventCard";
import { Container,  Grid,  Tab,  TabList,  TabPanel,  TabPanels,  Tabs,  Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { groq } from "next-sanity";
import { client, urlFor } from "../../../sanity/sanity-client";
import DataLoader from "@/components/shared/DataLoader";
import { SEO } from "@/components/shared/SEO";
import Reveal from "@/components/shared/Reveal";
import { eventTabs } from "@/utils/misc";

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

  // getting upcoming and past events
  const currentDate = new Date();
  const upcomingEvents = data?.filter((event: any) => {
    const eventStartDate = new Date(event?.start_date);
    return eventStartDate > currentDate;
  });

  const pastEvents = data?.filter((event: any) => {
    const eventStartDate = new Date(event.start_date);
    return eventStartDate < currentDate;
  });

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
          <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }} py={20}>
      <Tabs isFitted>
       <Reveal width="100%">
         <TabList overflow={{base: "auto", md: "visible "}}> 
          {eventTabs(upcomingEvents,pastEvents)?.map((teamTab) => (
            <Tab
              key={teamTab?.label}
              _selected={{ color: "white", bg: "primary", borderRadius: "sm" }}
              fontSize="xl"
              fontWeight={500}
            >
              {teamTab?.label}
            </Tab>
          ))}
        </TabList>
       </Reveal>
        <TabPanels >
          {eventTabs(upcomingEvents,pastEvents )?.map((teamTab) => (
            <TabPanel
              px={0}
              key={teamTab?.label}
              _selected={{ color: "white", bg: "primary", borderRadius: "sm" }}
              fontSize="xl"
              fontWeight={500}
            >
              {teamTab?.comp}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Container>
         
        </>
      )}
    </>
  );
};

export default Events;
