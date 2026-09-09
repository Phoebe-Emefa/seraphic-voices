"use client";

import UpcomingEventCard from "@/components/home/UpcomingEventCard";
import UpcomingEventsEmpty from "@/components/home/UpcomingEventsEmpty";
import UpcomingEventsSkeleton from "@/components/home/skeletons/UpcomingEventsSkeleton";
import CustomButton from "@/components/shared/CustomButton";
import { useEvents } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { resolveHomeUpcomingEvents } from "@/lib/resolveEvents";
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

const HOME_EVENT_LIMIT = 2;

const UpcomingEvents = () => {
  const eventsQuery = useEvents();
  const { data } = eventsQuery;
  const upcomingEvents = useMemo(
    () => resolveHomeUpcomingEvents(data),
    [data],
  );
  const eventsToShow = upcomingEvents.slice(0, HOME_EVENT_LIMIT);
  const isEmpty = !isCmsLoading(eventsQuery) && eventsToShow.length === 0;

  if (isCmsLoading(eventsQuery)) {
    return <UpcomingEventsSkeleton />;
  }

  return (
    <Box
      as="section"
      aria-labelledby="upcoming-events-heading"
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
              <HStack spacing={3} color="secondary.700">
                <Box w={8} h="2px" bg="secondary.700" />
                <Text
                  fontSize={{ base: "2xs", sm: "xs" }}
                  fontWeight="bold"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                >
                  On Stage Next
                </Text>
              </HStack>
              <Heading
                as="h2"
                id="upcoming-events-heading"
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "4.5xl" }}
                fontWeight="bold"
                color="secondary.700"
                lineHeight={1.15}
                letterSpacing="-0.02em"
              >
                Upcoming Concerts
              </Heading>
              {!isEmpty ? (
                <Text fontSize={{ base: "sm", sm: "md" }} color="text" maxW="36rem" lineHeight={1.6}>
                  Join us for evenings of choral artistry — from seasonal celebrations to gala
                  performances across Toronto&apos;s finest venues.
                </Text>
              ) : null}
            </VStack>

            {!isEmpty ? (
              <Box display={{ base: "none", md: "block" }} flexShrink={0}>
                <CustomButton
                  title="View all events"
                  href="/events"
                  width="12.5rem"
                  height="3.25rem"
                  fontSize="sm"
                />
              </Box>
            ) : null}
          </Flex>

          {isEmpty ? (
            <UpcomingEventsEmpty />
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
                />
              ))}
            </Grid>
          )}

          {!isEmpty ? (
            <Box display={{ base: "block", md: "none" }} pt={2}>
              <CustomButton
                title="View all events"
                href="/events"
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
