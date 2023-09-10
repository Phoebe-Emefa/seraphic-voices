import EventCard from "@/components/shared/EventCard";
import {
  Heading,
  Container,
  VStack,
  Box,
  Grid,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";

const UpcomingEvents = () => {
  const router = useRouter();
  return (
    <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }} py={{base: 12, md: 20}}>
      <VStack>
        <Heading
          as="h4"
          fontSize={{ base: "2xl", xl: "3xl" }}
          color="secondary.700"
        >
          Upcoming Events
        </Heading>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
          }}
          gap={6}
          mt={6}
          mb={4}
        >
          <EventCard />
          <EventCard />
          <EventCard />
        </Grid>
        <Button
          color="secondary.700"
          variant="outline"
          rightIcon={<Icon as={BsArrowRightShort} boxSize={6} />}
          onClick={() => router?.push("/events")}
        >
          View All Events
        </Button>
      </VStack>
    </Container>
  );
};

export default UpcomingEvents;
