"use client";

import SectionEyebrow from "@/components/about/SectionEyebrow";
import EventsGridSkeleton from "@/components/events/skeletons/EventsGridSkeleton";
import EventsListingSkeleton from "@/components/events/skeletons/EventsListingSkeleton";
import UpcomingEventCard from "@/components/home/UpcomingEventCard";
import UpcomingEventsEmpty from "@/components/home/UpcomingEventsEmpty";
import CustomButton from "@/components/shared/CustomButton";
import { EVENTS_PAST_EMPTY, EVENTS_UPCOMING_EMPTY } from "@/data/eventsEmptyContent";
import { useResolvedEvents } from "@/hooks/useCms";
import { isAnyCmsLoading } from "@/hooks/useCmsLoading";
import type { EventDocument } from "@/lib/cms/types";
import { cmsHref } from "@/lib/cmsHref";
import { isPastEvent, isUpcomingEvent } from "@/lib/eventDates";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

function EventsSoloGrid({
  events,
  tone,
  showTicketCta,
  statusLabel,
  purchaseLabel,
  detailsLabel,
}: {
  events: EventDocument[];
  tone: "upcoming" | "past";
  showTicketCta?: boolean;
  statusLabel?: string;
  purchaseLabel?: string;
  detailsLabel?: string;
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
          statusLabel={statusLabel}
          purchaseLabel={purchaseLabel}
          detailsLabel={detailsLabel}
        />
      ))}
    </Grid>
  );
}

const EventsListing = () => {
  const { events, eventPage: page, pageQuery } = useResolvedEvents();
  const listing = page?.listing;
  const purchaseLabel = listing?.ticketButtonLabel;
  const detailsLabel = listing?.detailsLabel;
  const initialTab: "upcoming" | "past" = listing?.upcomingTab
    ? "upcoming"
    : listing?.pastTab
      ? "past"
      : "upcoming";
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">(initialTab);
  const [isSwitching, setIsSwitching] = useState(false);

  const upcomingEvents = useMemo(() => events.filter(isUpcomingEvent), [events]);
  const pastEvents = useMemo(() => events.filter(isPastEvent), [events]);
  const bookingHref = cmsHref(page?.bookingCta?.href);

  const tabs = [
    { key: "upcoming" as const, label: listing?.upcomingTab },
    { key: "past" as const, label: listing?.pastTab },
  ].filter((tab) => tab.label);

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

  if (isAnyCmsLoading(pageQuery)) {
    return <EventsListingSkeleton />;
  }

  const upcomingCount = upcomingEvents.length;
  const pastCount = pastEvents.length;

  const tabContent =
    activeTab === "upcoming" ? (
      upcomingEvents.length === 0 ? (
        <UpcomingEventsEmpty {...EVENTS_UPCOMING_EMPTY} />
      ) : (
        <EventsSoloGrid
          events={upcomingEvents}
          tone="upcoming"
          showTicketCta
          statusLabel={listing?.upcomingTab}
          purchaseLabel={purchaseLabel}
          detailsLabel={detailsLabel}
        />
      )
    ) : pastEvents.length === 0 ? (
      <UpcomingEventsEmpty {...EVENTS_PAST_EMPTY} />
    ) : (
      <EventsSoloGrid
        events={pastEvents}
        tone="past"
        statusLabel={listing?.pastTab}
        detailsLabel={detailsLabel}
      />
    );

  if (
    !listing?.eyebrow &&
    !listing?.heading &&
    !listing?.intro &&
    tabs.length === 0 &&
    events.length === 0 &&
    !page?.bookingCta?.title
  ) {
    return null;
  }

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
          {listing?.eyebrow || listing?.heading || listing?.intro ? (
            <VStack align="flex-start" spacing={4} maxW="40rem">
              {listing.eyebrow ? <SectionEyebrow label={listing.eyebrow} /> : null}
              {listing.heading ? (
                <Heading
                  as="h2"
                  id="events-listing-heading"
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                  fontWeight="bold"
                  color="secondary.700"
                  lineHeight={1.15}
                  letterSpacing="-0.02em"
                >
                  {listing.heading}
                </Heading>
              ) : null}
              {listing.intro ? (
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="secondary.700"
                  opacity={0.9}
                  lineHeight={1.75}
                  sx={{ textWrap: "pretty" }}
                >
                  {listing.intro}
                </Text>
              ) : null}
            </VStack>
          ) : null}

          {tabs.length > 0 ? (
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
                {tabs.map((tab) => {
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
          ) : null}

          {isSwitching ? <EventsGridSkeleton count={2} /> : tabContent}

          {page?.bookingCta?.title || page?.bookingCta?.body || (page?.bookingCta?.button && bookingHref) ? (
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
                  {page.bookingCta?.title ? (
                    <Text
                      fontSize={{ base: "lg", md: "xl" }}
                      fontWeight="bold"
                      color="secondary.700"
                      letterSpacing="-0.01em"
                    >
                      {page.bookingCta.title}
                    </Text>
                  ) : null}
                  {page.bookingCta?.body ? (
                    <Text fontSize={{ base: "sm", md: "md" }} color="text" lineHeight={1.7}>
                      {page.bookingCta.body}
                    </Text>
                  ) : null}
                </VStack>
                {page.bookingCta?.button && bookingHref ? (
                  <Box w={{ base: "full", md: "12.5rem" }} flexShrink={0}>
                    <CustomButton
                      title={page.bookingCta.button}
                      href={bookingHref}
                      width="100%"
                      height="3.25rem"
                      fontSize="sm"
                    />
                  </Box>
                ) : null}
              </Flex>
            </Box>
          ) : null}
        </VStack>
      </Container>
    </Box>
  );
};

export default EventsListing;
