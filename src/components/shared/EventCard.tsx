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
} from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { BiTime } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";
import { urlFor } from "../../../sanity/sanity-client";

const EventCard = ({ event }: { event: any }) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src={
            event?.image &&
            (urlFor(event?.image?.asset?._ref) as unknown as string)
          }
          alt={event?.image?.alt}
          borderRadius="lg"
        />
        <Stack mt="6" spacing="6">
          <Heading as="h3" size="md">
            {event?.title}
          </Heading>
          <Stack spacing={6}>
            <Flex justify="space-between">
              <VStack align="left">
                <HStack>
                  <Icon as={BiTime} />
                  <Heading as="h6" fontSize="sm">
                    Start Date:
                  </Heading>
                </HStack>
                <Text fontWeight={500} fontSize="sm">
                  {moment(event?.start_date).format("lll")}
                </Text>
              </VStack>
              <VStack align="right">
                <HStack>
                  <Icon as={BiTime} />
                  <Heading as="h6" fontSize="sm">
                    End Date:
                  </Heading>
                </HStack>
                <Text fontWeight={500} fontSize="sm">
                  {moment(event?.end_date).format("lll")}
                </Text>
              </VStack>
            </Flex>
            <VStack align="left">
              <HStack>
                <Icon as={GrLocation} />
                <Heading as="h6" fontSize="sm">
                  Location:
                </Heading>
              </HStack>
              <Text fontWeight={500} fontSize="sm">
                {event?.location}
              </Text>
            </VStack>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default EventCard;
