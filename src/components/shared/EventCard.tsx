import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  HStack,
  VStack,
  Icon,
  Flex,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment-timezone";
import React from "react";
import { BiTime } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { urlFor } from "../../../sanity/sanity-client";
import Reveal from "@/components/shared/Reveal";
import { FaMapMarkerAlt, FaPlayCircle, FaRegCalendarAlt } from "react-icons/fa";
import EventDetails from "./EventDetails";
import { truncateString } from "@/utils/misc";
import CustomButton from "./CustomButton";

const EventCard = ({ event }: { event: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Reveal>
      <Box
        bg="secondary.100"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="md"
        m="auto"
        onClick={onOpen}
        cursor="pointer"
        borderBottomRadius="md"
      >
        {!event?.video && (
          <Box height={72}>
            <Image
              src={
                event?.image &&
                (urlFor(event?.image?.asset?._ref) as unknown as string)
              }
              alt={event?.image?.alt}
              w="100%"
              h="100%"
              objectFit="cover"
            />
          </Box>
        )}
        {event?.video && (
          <Box position="relative" w="100%" h="auto">
            <Box height={72}>
              <Image
                src={
                  event?.image &&
                  (urlFor(event?.image?.asset?._ref) as unknown as string)
                }
                alt={event?.image?.alt}
                w="100%"
                h="100%"
                objectFit="cover"
              />
            </Box>
            <Box
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
              bg="rgba(0, 0, 0, 0.4)"
              zIndex="1"
            />
            <Icon
              as={FaPlayCircle}
              boxSize={12}
              color="white"
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              zIndex="2"
            />
          </Box>
        )}

        <VStack spacing={4} p={6} align="left">
          <Heading as="h3" size="md">
            {event?.title}
          </Heading>
          <Flex align="center" color="gray.500">
            <FaRegCalendarAlt />
            <Text ml={2} fontSize="sm">
              {`${moment(event?.start_date)
                .tz("America/Toronto")
                .format("llll")} - ${moment(event?.end_date)
                .tz("America/Toronto")
                .format("llll")} (Eastern Standard Time (ET))`}
            </Text>
          </Flex>
          <Flex align="center" color="gray.500">
            <FaMapMarkerAlt />
            <Text ml={2} fontSize="sm">
              {event?.location}
            </Text>
          </Flex>
          <Text fontSize="sm">{truncateString(event?.description, 80)}</Text>
          <Flex justify="center" width="100%">
            <CustomButton title="View Details" onClick={onOpen} />
          </Flex>
        </VStack>
      </Box>
      <EventDetails isOpen={isOpen} closeModal={onClose} event={event} />
    </Reveal>
  );
};

export default EventCard;
