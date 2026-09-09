"use client";

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  Icon,
  Grid,
} from "@chakra-ui/react";
import { imageSrc } from "../../../sanity/sanity-client";
import { PortableText } from "@/components/shared/PortableText";
import { FaMapMarkerAlt, FaRegCalendarAlt, FaClock } from "react-icons/fa";
import { formatEventDate, formatEventTime, isUpcomingEvent } from "@/lib/eventDates";
import ReactPlayer from "react-player";
import NextLink from "next/link";
import CustomButton from "@/components/shared/CustomButton";
import { useEvent } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import EventDetailsSkeleton from "@/components/events/skeletons/EventDetailsSkeleton";
import { httpsUrl } from "@/lib/httpsUrl";

export default function EventDetailsPage({ slug }: { slug: string }) {
  const eventQuery = useEvent(slug);
  const { data: event } = eventQuery;

  if (isCmsLoading(eventQuery)) return <EventDetailsSkeleton />;

  if (!event) {
    return (
      <Box minH="60dvh" display="flex" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Text fontSize="2xl">Event not found</Text>
          <NextLink href="/events">
            <Button>All events</Button>
          </NextLink>
        </VStack>
      </Box>
    );
  }

  const upcoming = isUpcomingEvent(event);
  const ticket = httpsUrl(event.ticket_url);
  const video = httpsUrl(event.video);

  return (
    <>
      <Box position="relative" minH={{ base: "auto", md: "100dvh" }} overflow="hidden">
        <Box position="absolute" inset={0} zIndex={1}>
          {video ? (
            <ReactPlayer url={video} width="100%" height="100%" playing={false} muted loop />
          ) : (
            <Image
              src={imageSrc(event.image?.asset?._ref)}
              alt={event.image?.alt || event.title}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          )}
          <Box
            position="absolute"
            inset={0}
            bg="linear-gradient(135deg, rgba(4,35,92,0.82) 0%, rgba(4,35,92,0.55) 100%)"
          />
        </Box>

        <Container maxW="7xl" position="relative" zIndex={5} minH={{ md: "100dvh" }} py={{ base: 16, md: 24 }}>
          <VStack spacing={6} align="start" color="white" maxW="3xl">
            <NextLink href="/events">
              <Button variant="ghost" color="white" size="sm">
                All events
              </Button>
            </NextLink>
            {upcoming ? (
              <Text fontWeight={700} fontSize="sm">
                Upcoming
              </Text>
            ) : (
              <Text fontWeight={700} fontSize="sm">
                Past concert
              </Text>
            )}
            <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} lineHeight={1.1}>
              {event.title}
            </Heading>
            <HStack spacing={3}>
              <Icon as={FaRegCalendarAlt} />
              <Text>{formatEventDate(event.start_date)}</Text>
            </HStack>
            <HStack spacing={3}>
              <Icon as={FaClock} />
              <Text>
                {formatEventTime(event.start_date)}
                {event.end_date ? ` - ${formatEventTime(event.end_date)}` : ""}
              </Text>
            </HStack>
            <HStack spacing={3}>
              <Icon as={FaMapMarkerAlt} />
              <Text>{event.location}</Text>
            </HStack>
            {upcoming && ticket ? (
              <Box display={{ base: "none", md: "block" }}>
                <CustomButton title="Purchase tickets" href={ticket} />
              </Box>
            ) : null}
          </VStack>
        </Container>
      </Box>

      <Box bg="secondary.100" py={16}>
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={12}>
            <Box maxW="65ch">
              <Heading as="h2" fontSize="3xl" color="secondary.700" mb={6}>
                About this concert
              </Heading>
              <PortableText value={event.description} />
            </Box>
            <VStack align="stretch" spacing={4} bg="white" p={8} borderRadius="md">
              <Heading as="h3" fontSize="xl" color="secondary.700">
                Details
              </Heading>
              <Text>{formatEventDate(event.start_date)}</Text>
              <Text>{event.location}</Text>
            </VStack>
          </Grid>
        </Container>
      </Box>

      {upcoming && ticket ? (
        <Box
          display={{ base: "block", md: "none" }}
          position="sticky"
          bottom={0}
          bg="white"
          p={4}
          borderTop="1px solid"
          borderColor="secondary.100"
        >
          <CustomButton title="Purchase tickets" href={ticket} width="100%" />
        </Box>
      ) : null}
    </>
  );
}
