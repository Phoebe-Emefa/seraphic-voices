"use client";

import SectionEyebrow from "@/components/about/SectionEyebrow";
import EventsGridSkeleton from "@/components/events/skeletons/EventsGridSkeleton";
import EventsListingSkeleton from "@/components/events/skeletons/EventsListingSkeleton";
import UpcomingEventCard from "@/components/home/UpcomingEventCard";
import UpcomingEventsEmpty from "@/components/home/UpcomingEventsEmpty";
import CustomButton from "@/components/shared/CustomButton";
import { EVENTS_FALLBACK } from "@/data/eventsContent";
import { useEvents } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { isPastEvent, isUpcomingEvent } from "@/lib/eventDates";
import type { EventDetail } from "@/lib/eventDisplay";
import { resolveEvents } from "@/lib/resolveEvents";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

const TABS = [
  { label: "Upcoming", key: "upcoming" as const },
  { label: "Past", key: "past" as const },
];

function EventsSoloGrid({
  events,
  tone,
  showTicketCta,
}: {
  events: EventDetail[];
  tone: "upcoming" | "past";
  showTicketCta?: boolean;
}) {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      gap={{ base: 6, md: 8 }}
      alignItems="stretch"
    >
      {events.map((event, index) => (
        <UpcomingEventCard
          key={event._id || event.title}
          event={event}
          index={index}
          tone={tone}
          showTicketCta={showTicketCta}
        />
      ))}
    </Grid>
  );
}

function renderTabContent(
  activeTab: "upcoming" | "past",
  upcomingEvents: EventDetail[],
  pastEvents: EventDetail[],
) {
  if (activeTab === "upcoming") {
    if (upcomingEvents.length === 0) {
      return <UpcomingEventsEmpty showViewAll={false} />;
    }

    return (
      <EventsSoloGrid
        events={upcomingEvents}
        tone="upcoming"
        showTicketCta
      />
    );
  }

  if (pastEvents.length === 0) {
    return (
      <VStack
        spacing={3}
        py={{ base: 12, md: 16 }}
        px={6}
        borderRadius="2xl"
        bg="white"
        border="1px solid"
        borderColor="blackAlpha.100"
        textAlign="center"
      >
        <Text fontSize="lg" fontWeight="semibold" color="secondary.700">
          No past events listed yet
        </Text>
        <Text fontSize="md" color="text" maxW="28rem" lineHeight={1.7}>
          Our concert archive will be updated as past performances are added.
        </Text>
      </VStack>
    );
  }

  return <EventsSoloGrid events={pastEvents} tone="past" />;
}

const EventsListing = () => {
  const eventsQuery = useEvents();
  const { data } = eventsQuery;
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [isSwitching, setIsSwitching] = useState(false);

  const events = useMemo(() => resolveEvents(data), [data]);
  const upcomingEvents = useMemo(
    () => events.filter(isUpcomingEvent),
    [events],
  );
  const pastEvents = useMemo(() => events.filter(isPastEvent), [events]);

  const handleTabChange = (key: "upcoming" | "past") => {
    if (key === activeTab) return;
    setActiveTab(key);
    setIsSwitching(true);
  };

  useEffect(() => {
    if (!isSwitching) return;
    const timer = window.setTimeout(() => setIsSwitching(false), 420);
    return () => window.clearTimeout(timer);
  }, [activeTab, isSwitching]);

  if (isCmsLoading(eventsQuery)) {
    return <EventsListingSkeleton />;
  }

  const upcomingCount = upcomingEvents.length;
  const pastCount = pastEvents.length;
  const activeCount = activeTab === "upcoming" ? upcomingCount : pastCount;
  const skeletonCount = Math.max(activeCount, activeTab === "upcoming" ? 2 : 2);

  return (
    <Box
      as="section"
      aria-labelledby="events-listing-heading"
      bg="secondary.100"
      py={{ base: 10, sm: 16, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 4, sm: 6, md: 8, xl: 12 }}
      >
        <VStack spacing={{ base: 8, md: 12 }} align="stretch">
          <VStack align="flex-start" spacing={4} maxW="40rem">
            <SectionEyebrow label={EVENTS_FALLBACK.section.eyebrow} />
            <Text
              id="events-listing-heading"
              fontSize={{ base: "md", md: "lg" }}
              color="secondary.700"
              opacity={0.9}
              lineHeight={1.75}
              sx={{ textWrap: "pretty" }}
            >
              {EVENTS_FALLBACK.section.intro}
            </Text>
          </VStack>

          <Box
            position={{ base: "sticky", md: "static" }}
            top={{ base: "4.5rem", md: "auto" }}
            zIndex={2}
            bg="secondary.100"
            py={{ base: 2, md: 0 }}
            mx={{ base: -4, sm: 0 }}
            px={{ base: 4, sm: 0 }}
          >
            <Flex
              gap={2}
              overflowX="auto"
              pb={1}
              sx={{
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
                scrollSnapType: "x proximity",
              }}
            >
              {TABS.map((tab) => {
                const count = tab.key === "upcoming" ? upcomingCount : pastCount;
                const isActive = activeTab === tab.key;

                return (
                  <Button
                    key={tab.key}
                    onClick={() => handleTabChange(tab.key)}
                    flexShrink={0}
                    h="2.5rem"
                    px={{ base: 4, md: 5 }}
                    borderRadius="full"
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="semibold"
                    scrollSnapAlign="start"
                    bg={isActive ? "secondary.700" : "white"}
                    color={isActive ? "white" : "secondary.700"}
                    border="1px solid"
                    borderColor={isActive ? "secondary.700" : "blackAlpha.100"}
                    boxShadow={
                      isActive
                        ? "0 12px 24px -12px rgba(4, 35, 92, 0.45)"
                        : "0 8px 20px -16px rgba(4, 35, 92, 0.12)"
                    }
                    _hover={{
                      bg: isActive ? "secondary.700" : "white",
                      borderColor: isActive ? "secondary.700" : "secondary.500",
                    }}
                    _active={{ transform: "scale(0.98)" }}
                    aria-pressed={isActive}
                  >
                    {tab.label}
                    {count > 0 ? (
                      <Text
                        as="span"
                        ml={2}
                        fontSize="xs"
                        opacity={isActive ? 0.85 : 0.55}
                        fontWeight="medium"
                      >
                        {count}
                      </Text>
                    ) : null}
                  </Button>
                );
              })}
            </Flex>
          </Box>

          {isSwitching ? (
            <EventsGridSkeleton count={skeletonCount} />
          ) : (
            renderTabContent(activeTab, upcomingEvents, pastEvents)
          )}

          <Box
            borderRadius={{ base: "xl", md: "2xl" }}
            bg="bg.100"
            border="1px solid"
            borderColor="blackAlpha.100"
            p={{ base: 6, md: 8, lg: 10 }}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "center" }}
              justify="space-between"
              gap={{ base: 5, md: 8 }}
            >
              <VStack align="flex-start" spacing={2} maxW="32rem">
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  fontWeight="bold"
                  color="secondary.700"
                  letterSpacing="-0.01em"
                >
                  {EVENTS_FALLBACK.section.cta.title}
                </Text>
                <Text fontSize={{ base: "sm", md: "md" }} color="text" lineHeight={1.7}>
                  {EVENTS_FALLBACK.section.cta.body}
                </Text>
              </VStack>
              <Box w={{ base: "full", md: "12.5rem" }} flexShrink={0}>
                <CustomButton
                  title={EVENTS_FALLBACK.section.cta.button}
                  href={EVENTS_FALLBACK.section.cta.href}
                  width="100%"
                  height="3.25rem"
                  fontSize="sm"
                />
              </Box>
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default EventsListing;
