"use client";

import GallerySpotlight from "@/components/home/Hero/GallerySpotlight";
import HeroSkeleton from "@/components/home/skeletons/HeroSkeleton";
import { nextUpcomingEvent, useEvents, useHome } from "@/hooks/useCms";
import { isAnyCmsLoading } from "@/hooks/useCmsLoading";
import { Box } from "@chakra-ui/react";

const Hero = () => {
  const homeQuery = useHome();
  const eventsQuery = useEvents();
  const { data } = homeQuery;
  const { data: events } = eventsQuery;

  if (isAnyCmsLoading(homeQuery, eventsQuery)) {
    return <HeroSkeleton />;
  }

  const content = data?.[0];
  const featuredEvent = nextUpcomingEvent(events);

  return (
    <Box as="section" aria-label="Hero" width="100%" mt={-20} h="100dvh">
      <GallerySpotlight content={content} featuredEvent={featuredEvent} />
    </Box>
  );
};

export default Hero;
