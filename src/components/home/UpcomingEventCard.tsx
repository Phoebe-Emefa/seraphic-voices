"use client";

import CustomButton from "@/components/shared/CustomButton";
import { eventMoment, isUpcomingEvent } from "@/lib/eventDates";
import { EventDetail, resolveEventImage } from "@/lib/eventDisplay";
import { eventPath } from "@/lib/eventPaths";
import { httpsUrl } from "@/lib/httpsUrl";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

function formatBadge(date?: string) {
  const m = eventMoment(date);
  if (!m) return { day: "—", month: "TBD", time: "", weekday: "" };
  return {
    day: m.format("D"),
    month: m.format("MMM"),
    time: m.format("h:mm A"),
    weekday: m.format("dddd"),
  };
}

export type UpcomingEventItem = EventDetail;

type UpcomingEventCardProps = {
  event: EventDetail;
  index?: number;
  tone?: "upcoming" | "past";
  showTicketCta?: boolean;
  statusLabel?: string;
  purchaseLabel?: string;
  detailsLabel?: string;
};

const UpcomingEventCard = ({
  event,
  tone = "upcoming",
  showTicketCta = false,
  statusLabel,
  purchaseLabel,
  detailsLabel,
}: UpcomingEventCardProps) => {
  const image = resolveEventImage(event);
  const badge = formatBadge(event.start_date);
  const isPast = tone === "past";
  const ticket = httpsUrl(event.ticket_url);
  const detailsHref = eventPath(event);
  const canPurchase =
    showTicketCta && Boolean(ticket) && isUpcomingEvent(event) && !isPast && Boolean(purchaseLabel);

  return (
    <Box
      as="article"
      role="group"
      display="grid"
      gridTemplateColumns="1fr"
      borderRadius={{ base: "xl", md: "2xl" }}
      overflow="hidden"
      bg="primary"
      border="1px solid"
      borderColor="whiteAlpha.200"
      boxShadow="0 28px 64px -18px rgba(4, 35, 92, 0.35)"
      h="full"
      transition="transform 280ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 280ms cubic-bezier(0.23, 1, 0.32, 1)"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "0 36px 80px -20px rgba(4, 35, 92, 0.42)",
      }}
    >
      <Box
        position="relative"
        w="full"
        aspectRatio={{ base: "16 / 10", md: "16 / 9" }}
        bg="primary"
        overflow="hidden"
      >
        {image ? (
          <Image
            src={image}
            alt={event.image?.alt || event.title || "Event"}
            position="absolute"
            inset={0}
            w="full"
            h="full"
            objectFit="cover"
            objectPosition="center 30%"
            filter={isPast ? "grayscale(0.35) brightness(0.92)" : "none"}
            transition="transform 600ms cubic-bezier(0.23, 1, 0.32, 1), filter 0.35s ease"
            _groupHover={{
              transform: "scale(1.04)",
              filter: isPast ? "grayscale(0)" : "none",
            }}
          />
        ) : null}
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(to top, rgba(4, 25, 68, 0.55) 0%, transparent 45%)"
          pointerEvents="none"
        />
      </Box>

      <Flex
        direction="column"
        justify="center"
        p={{ base: 5, sm: 6, md: 7 }}
        bg="linear-gradient(135deg, #041a42 0%, #052155 55%, #031433 100%)"
        gap={{ base: 4, md: 5 }}
        flex={1}
      >
        {statusLabel ? (
          <HStack spacing={2} alignSelf="flex-start">
            <Box w={1.5} h={1.5} borderRadius="full" bg="secondary.500" />
            <Text
              fontSize="2xs"
              fontWeight="bold"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="whiteAlpha.800"
            >
              {statusLabel}
            </Text>
          </HStack>
        ) : null}

        <HStack align="flex-end" spacing={5}>
          <VStack align="flex-start" spacing={0} lineHeight={1}>
            <Text
              fontSize={{ base: "3xl", sm: "4xl" }}
              fontWeight="bold"
              color="white"
              letterSpacing="-0.04em"
            >
              {badge.day}
            </Text>
            <Text
              fontSize="sm"
              fontWeight="bold"
              letterSpacing="0.22em"
              textTransform="uppercase"
              color="secondary.500"
            >
              {badge.month}
            </Text>
          </VStack>
          <Box w="1px" h="3.25rem" bg="whiteAlpha.300" />
          <VStack align="flex-start" spacing={1}>
            <Text fontSize="xs" color="whiteAlpha.700" letterSpacing="0.06em">
              {badge.weekday}
            </Text>
            <Text fontSize="sm" color="white" fontWeight="semibold">
              {badge.time} ET
            </Text>
          </VStack>
        </HStack>

        <Box>
          <Heading
            as="h3"
            fontSize={{ base: "xl", sm: "2xl" }}
            fontWeight="bold"
            color="white"
            lineHeight={1.15}
            letterSpacing="-0.02em"
            mb={3}
            sx={{ textWrap: "balance" }}
          >
            {event.title}
          </Heading>
          <HStack spacing={2} color="whiteAlpha.800">
            <Icon as={FaMapMarkerAlt} boxSize={3.5} flexShrink={0} />
            <Text fontSize="sm" noOfLines={2}>{event.location}</Text>
          </HStack>
        </Box>

        {canPurchase || detailsLabel ? (
          <Box pt={1} w="full" mt="auto">
            {canPurchase ? (
              <Flex direction={{ base: "column", sm: "row" }} gap={3} w="full">
                <CustomButton
                  title={purchaseLabel!}
                  href={ticket!}
                  width="100%"
                  height="3.25rem"
                  fontSize="sm"
                  bg="secondary.500"
                  hoverBg="#c49a3d"
                  textColor="secondary.700"
                />
                {detailsLabel ? (
                  <CustomButton
                    title={detailsLabel}
                    href={detailsHref}
                    width="100%"
                    height="3.25rem"
                    fontSize="sm"
                    variant="outline"
                    borderColor="whiteAlpha.600"
                    textColor="white"
                    hoverBg="whiteAlpha.100"
                  />
                ) : null}
              </Flex>
            ) : detailsLabel ? (
              <CustomButton
                title={detailsLabel}
                href={detailsHref}
                width="100%"
                height="3.25rem"
                fontSize="sm"
              />
            ) : null}
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
};

export default UpcomingEventCard;
