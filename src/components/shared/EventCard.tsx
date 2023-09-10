import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  HStack,
  Box,
  Divider,
  ButtonGroup,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { BiSolidShareAlt, BiTime } from "react-icons/bi";
import { GrLocation } from "react-icons/gr";

const EventCard = () => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Image
          src="/images/choir-3.jpg"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack mt="6" spacing="6">
          <Heading as="h3" size="md">
            Seraphic Summer Praise
          </Heading>
          <Stack>
            <HStack>
              <Icon as={BiTime} />
              <Text fontWeight={500} fontSize="sm">
                Sunday, 12 April 2023 | 6:00pm - 8:00pm
              </Text>
            </HStack>

            <HStack>
              <Icon as={GrLocation} />
              <Text fontWeight={500} fontSize="sm">
                2459 Islington Ave, Etobicoke, ON M9W 3X9, Toronto, Canada
              </Text>
            </HStack>
          </Stack>
        </Stack>
      </CardBody>
  <CardFooter display="flex" justify="flex-end" alignItems="center" gap={2} cursor="pointer">
     <Icon as={BiSolidShareAlt} />
   <Text fontSize="sm">Share Event</Text>
  </CardFooter>
    </Card>
  );
};

export default EventCard;
