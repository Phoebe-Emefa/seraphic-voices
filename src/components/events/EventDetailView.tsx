"use client";

import CustomButton from "@/components/shared/CustomButton";
import { PortableText } from "@/components/shared/PortableText";
import {
  eventMoment,
  formatEventDate,
  formatEventTime,
  isUpcomingEvent,
} from "@/lib/eventDates";
import { EventDetail, resolveEventImage } from "@/lib/eventDisplay";
import { httpsUrl } from "@/lib/httpsUrl";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import type { ElementType } from "react";
import { FaArrowLeft, FaClock, FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";

type EventDetailViewProps = {
  event: EventDetail;
  purchaseLabel?: string;
};

function formatDuration(start?: string, end?: string) {
  const startM = eventMoment(start);
  const endM = eventMoment(end);
  if (!startM || !endM) return null;

  const minutes = endM.diff(startM, "minutes");
  if (minutes <= 0) return null;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours && mins) return `${hours} hr ${mins} min`;
  if (hours) return `${hours} hr`;
  return `${mins} min`;
}

function DetailTile({
  icon,
  label,
  value,
  subValue,
}: {
  icon: ElementType;
  label: string;
  value: string;
  subValue?: string;
}) {
  return (
    <Box
      p={{ base: 3.5, md: 4 }}
      borderRadius="xl"
      bg="rgba(255, 255, 255, 0.06)"
      border="1px solid"
      borderColor="whiteAlpha.150"
    >
      <HStack spacing={2} mb={2} color="secondary.500">
        <Icon as={icon} boxSize={3.5} />
        <Text
          fontSize="2xs"
          fontWeight="bold"
          letterSpacing="0.14em"
          textTransform="uppercase"
        >
          {label}
        </Text>
      </HStack>
      <Text fontSize={{ base: "sm", md: "md" }} fontWeight="semibold" color="white">
        {value}
      </Text>
      {subValue ? (
        <Text fontSize="xs" color="whiteAlpha.700" mt={1}>
          {subValue}
        </Text>
      ) : null}
    </Box>
  );
}

const EventDetailView = ({ event, purchaseLabel }: EventDetailViewProps) => {
  const image = resolveEventImage(event);
  const ticket = httpsUrl(event.ticket_url);
  const upcoming = isUpcomingEvent(event);
  const duration = formatDuration(event.start_date, event.end_date);
  const badge = event.start_date ? eventMoment(event.start_date) : null;
  const showTicketCta = Boolean(ticket && upcoming && purchaseLabel);

  const poster = (
    <Box
      position="relative"
      w="full"
      flexShrink={0}
      aspectRatio={{ base: "4 / 3", sm: "16 / 10", lg: "auto" }}
      h={{ lg: "full" }}
      minH={{ lg: "28rem" }}
      bg="primary"
    >
      {image ? (
        <Image
          src={image}
          alt={event.image?.alt || event.title || "Event poster"}
          position="absolute"
          inset={0}
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center top"
        />
      ) : (
        <Flex position="absolute" inset={0} align="center" justify="center" p={8}>
          <Text color="whiteAlpha.600" fontSize="sm" textAlign="center">
            Event image coming soon
          </Text>
        </Flex>
      )}
      <Box
        position="absolute"
        inset={0}
        bg={{
          base: "linear-gradient(to top, rgba(4, 26, 66, 0.75) 0%, rgba(4, 26, 66, 0.15) 50%, transparent 100%)",
          lg: "linear-gradient(to right, transparent 50%, rgba(4, 26, 66, 0.35) 100%)",
        }}
        pointerEvents="none"
      />
      {badge ? (
        <VStack
          position="absolute"
          bottom={3}
          left={3}
          align="center"
          spacing={0}
          lineHeight={1}
          px={3}
          py={2}
          borderRadius="lg"
          bg="rgba(4, 25, 68, 0.75)"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="whiteAlpha.300"
          zIndex={1}
        >
          <Text fontSize="2xl" fontWeight="bold" color="white">
            {badge.format("D")}
          </Text>
          <Text
            fontSize="2xs"
            fontWeight="bold"
            letterSpacing="0.18em"
            color="secondary.500"
          >
            {badge.format("MMM")}
          </Text>
        </VStack>
      ) : null}
    </Box>
  );

  const details = (
    <VStack align="stretch" spacing={{ base: 5, md: 6 }}>
      <VStack align="flex-start" spacing={2}>
        <HStack spacing={2}>
          <Box w={1.5} h={1.5} borderRadius="full" bg="secondary.500" />
          <Text
            fontSize="2xs"
            fontWeight="bold"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="whiteAlpha.700"
          >
            {upcoming ? "Upcoming concert" : "Past concert"}
          </Text>
        </HStack>
        <Heading
          as="h1"
          fontSize={{ base: "xl", sm: "2xl", md: "2.5xl", lg: "3xl" }}
          fontWeight="bold"
          lineHeight={1.15}
          letterSpacing="-0.02em"
        >
          {event.title}
        </Heading>
      </VStack>

      {showTicketCta ? (
        <Box
          p={{ base: 4, md: 5 }}
          borderRadius="xl"
          bg="linear-gradient(145deg, rgba(212, 168, 83, 0.14) 0%, rgba(36, 73, 131, 0.38) 42%, rgba(4, 35, 92, 0.82) 100%)"
          border="1px solid"
          borderColor="secondary.500"
          boxShadow="0 16px 48px -12px rgba(212, 168, 83, 0.38)"
          position="relative"
          overflow="hidden"
        >
          <VStack align="stretch" spacing={4} position="relative" zIndex={1}>
            <CustomButton
              title={purchaseLabel!}
              href={ticket!}
              width="100%"
              height={{ base: "3.5rem", md: "3.75rem" }}
              fontSize={{ base: "md", md: "lg" }}
              bg="secondary.500"
              hoverBg="#c49a3d"
              textColor="secondary.700"
            />
          </VStack>
        </Box>
      ) : null}

      <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={3}>
        <DetailTile
          icon={FaRegCalendarAlt}
          label="Date"
          value={formatEventDate(event.start_date)}
          subValue={badge?.format("dddd")}
        />
        <DetailTile
          icon={FaClock}
          label="Time"
          value={`${formatEventTime(event.start_date)} – ${formatEventTime(event.end_date)}`}
          subValue={duration ? `${duration} · ET` : "Eastern Time"}
        />
        <Box gridColumn={{ base: "1 / -1", md: "auto" }}>
          <DetailTile
            icon={FaMapMarkerAlt}
            label="Venue"
            value={event.location || "To be announced"}
          />
        </Box>
      </Grid>

      {event.description ? (
        <Box>
          <Text
            fontSize="2xs"
            fontWeight="bold"
            letterSpacing="0.16em"
            textTransform="uppercase"
            color="secondary.500"
            mb={3}
          >
            About this concert
          </Text>
          <Box color="whiteAlpha.900" fontSize={{ base: "sm", md: "md" }} lineHeight={1.75}>
            <PortableText value={event.description as any} color="whiteAlpha.900" />
          </Box>
        </Box>
      ) : null}
    </VStack>
  );

  return (
    <Box as="article" bg="#041a42" color="white" minH="100dvh" pt={{ base: 24, md: 28 }}>
      <Container maxW="7xl" px={{ base: 4, sm: 6, md: 8 }} pb={{ base: 12, md: 16 }}>
        <Link
          as={NextLink}
          href="/events"
          display="inline-flex"
          alignItems="center"
          gap={2}
          mb={{ base: 6, md: 8 }}
          color="whiteAlpha.800"
          fontSize="sm"
          fontWeight="semibold"
          _hover={{ color: "white", textDecoration: "none" }}
        >
          <Icon as={FaArrowLeft} boxSize={3.5} />
          Back to events
        </Link>

        <Box
          borderRadius={{ base: 0, lg: "2xl" }}
          border={{ base: "none", lg: "1px solid" }}
          borderColor="whiteAlpha.200"
          overflow="hidden"
          boxShadow={{ base: "none", lg: "0 32px 80px -16px rgba(0, 0, 0, 0.6)" }}
        >
          <Box display={{ base: "block", lg: "none" }}>
            {poster}
            <Box px={{ base: 4, sm: 5 }} py={{ base: 5, sm: 6 }} pb={8}>
              {details}
            </Box>
          </Box>

          <Grid
            display={{ base: "none", lg: "grid" }}
            templateColumns="1fr 1.1fr"
            minH="28rem"
            alignItems="stretch"
          >
            <Box position="relative" minH="28rem">{poster}</Box>
            <Box px={8} py={8}>{details}</Box>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default EventDetailView;
