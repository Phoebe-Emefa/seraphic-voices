"use client";

import GallerySpotlight from "@/components/home/Hero/GallerySpotlight";
import HeroSkeleton from "@/components/home/skeletons/HeroSkeleton";
import { useFeaturedUpcomingEvents, useHomePage, useResolvedEvents } from "@/hooks/useCms";
import { isAnyCmsLoading } from "@/hooks/useCmsLoading";
import { Box } from "@chakra-ui/react";

const Hero = () => {
  const homeQuery = useHomePage();
  const { events, eventPage, pageQuery } = useResolvedEvents();
  const featuredEvents = useFeaturedUpcomingEvents(events);
  const detailsLabel = eventPage?.listing?.detailsLabel;

  if (isAnyCmsLoading(homeQuery, pageQuery)) {
    return <HeroSkeleton />;
  }

  return (
    <Box as="section" aria-label="Hero" width="100%" mt={-20} h="100dvh">
      <GallerySpotlight
        home={homeQuery.data ?? null}
        featuredEvents={featuredEvents}
        detailsLabel={detailsLabel}
      />
    </Box>
  );
};

export default Hero;
