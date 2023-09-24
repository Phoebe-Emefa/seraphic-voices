import EventCard from "@/components/shared/EventCard";
import {
  Heading,
  Container,
  VStack,
  Grid,
  Button,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useQuery } from "react-query";
import { groq } from "next-sanity";
import { client } from "../../../sanity/sanity-client";
import DataLoader from "@/components/shared/DataLoader";

const UpcomingEvents = () => {
  const router = useRouter();
  const { isLoading, data } = useQuery("events", async () => {
    return client.fetch(groq`*[_type == "events"]`);
  });

  return (
    <Container
      maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }}
      py={{ base: 12, md: 20 }}
    >
      {isLoading ? (
        <DataLoader />
      ) : (
        <VStack>
          <Heading
            as="h4"
            fontSize={{ base: "2xl", xl: "3xl" }}
            color="secondary.700"
          >
            Upcoming Events
          </Heading>
          {data?.length > 0 ? (
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
              {data?.map((item: any) => (
                <EventCard key={item} event={item} />
              ))}
            </Grid>
          ) : (
            <VStack  textAlign="center">
              <Text fontSize="xl" maxW="lg">
                We currently have no upcoming events. Please stay tuned for
                future updates and exciting happenings!
              </Text>
            </VStack>
          )}
          {data?.length > 3 && (
            <Button
              color="secondary.700"
              variant="outline"
              rightIcon={<Icon as={BsArrowRightShort} boxSize={6} />}
              onClick={() => router?.push("/events")}
            >
              View All Events
            </Button>
          )}
        </VStack>
      )}
    </Container>
  );
};

export default UpcomingEvents;
