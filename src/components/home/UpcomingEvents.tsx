"use client";

import UpcomingEventCard from "@/components/home/UpcomingEventCard";
import UpcomingEventsEmpty from "@/components/home/UpcomingEventsEmpty";
import UpcomingEventsSkeleton from "@/components/home/skeletons/UpcomingEventsSkeleton";
import CustomButton from "@/components/shared/CustomButton";
import { EVENTS_UPCOMING_EMPTY } from "@/data/eventsEmptyContent";
import { useHomePage, useResolvedEvents } from "@/hooks/useCms";
import { isAnyCmsLoading } from "@/hooks/useCmsLoading";
import { EVENTS_PAGE_PATH, selectHomeUpcomingEvents } from "@/lib/homeUpcomingEvents";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMemo } from "react";

const UpcomingEvents = () => {
  const homeQuery = useHomePage();
  const { events, eventPage, pageQuery } = useResolvedEvents();
  const section = homeQuery.data?.upcomingEvents;
  const listing = eventPage?.listing;
  const purchaseLabel = listing?.ticketButtonLabel;
  const detailsLabel = listing?.detailsLabel;

  const eventsToShow = useMemo(() => selectHomeUpcomingEvents(events), [events]);
  const isLoading = isAnyCmsLoading(homeQuery, pageQuery);
  const isEmpty = !isLoading && eventsToShow.length === 0;

  if (isLoading) {
    return <UpcomingEventsSkeleton />;
  }

  if (!section?.eyebrow && !section?.heading && !section?.intro && isEmpty) {
    return null;
  }

  return (
    <Box
      as="section"
      aria-labelledby={section?.heading ? "upcoming-events-heading" : undefined}
      bg="secondary.100"
      py={{ base: 16, sm: 20, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 5, sm: 6, md: 8, xl: 12 }}
      >
        <VStack spacing={{ base: 8, md: 12 }} align="stretch">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "flex-end" }}
            gap={{ base: 5, md: 8 }}
          >
            <VStack align="flex-start" spacing={3} maxW="38rem">
              {section?.eyebrow ? (
                <HStack spacing={3} color="secondary.700">
                  <Box w={8} h="2px" bg="secondary.700" />
                  <Text
                    fontSize={{ base: "2xs", sm: "xs" }}
                    fontWeight="bold"
                    letterSpacing="0.2em"
                    textTransform="uppercase"
                  >
                    {section.eyebrow}
                  </Text>
                </HStack>
              ) : null}
              {section?.heading ? (
                <Heading
                  as="h2"
                  id="upcoming-events-heading"
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "4.5xl" }}
                  fontWeight="bold"
                  color="secondary.700"
                  lineHeight={1.15}
                  letterSpacing="-0.02em"
                >
                  {section.heading}
                </Heading>
              ) : null}
              {section?.intro ? (
                <Text fontSize={{ base: "sm", sm: "md" }} color="text" maxW="36rem" lineHeight={1.6}>
                  {section.intro}
                </Text>
              ) : null}
            </VStack>

            {section?.viewAllTitle ? (
              <Box display={{ base: "none", md: "block" }} flexShrink={0}>
                <CustomButton
                  title={section.viewAllTitle}
                  href={EVENTS_PAGE_PATH}
                  width="12.5rem"
                  height="3.25rem"
                  fontSize="sm"
                />
              </Box>
            ) : null}
          </Flex>

          {isEmpty ? (
            <UpcomingEventsEmpty {...EVENTS_UPCOMING_EMPTY} />
          ) : (
            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={{ base: 6, md: 8 }}
              alignItems="stretch"
            >
              {eventsToShow.map((event, index) => (
                <UpcomingEventCard
                  key={event._id || event.title}
                  event={event}
                  index={index}
                  showTicketCta
                  statusLabel={listing?.upcomingTab}
                  purchaseLabel={purchaseLabel}
                  detailsLabel={detailsLabel}
                />
              ))}
            </Grid>
          )}

          {section?.viewAllTitle ? (
            <Box display={{ base: "block", md: "none" }} pt={2}>
              <CustomButton
                title={section.viewAllTitle}
                href={EVENTS_PAGE_PATH}
                width="100%"
                height="3.25rem"
                fontSize="sm"
              />
            </Box>
          ) : null}
        </VStack>
      </Container>
    </Box>
  );
};

export default UpcomingEvents;
