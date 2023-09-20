import VideoCard from "@/components/shared/VideoCard";
import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Icon,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { useQuery } from "react-query";
import { groq } from "next-sanity";
import { client, urlFor } from "../../../sanity/sanity-client";

const Repettoire = () => {
  const { isLoading, data } = useQuery("repettoire", async () => {
    return client.fetch(groq`*[_type == "repettoire"]`);
  });

  const content = data;


  return (
    <Box backgroundColor="bg.100" py={{ base: 12, md: 20 }}>
      <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }}>
        <VStack>
          <Heading
            as="h4"
            fontSize={{ base: "2xl", xl: "3xl" }}
            color="secondary.700"
          >
            Repettoire
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
            {data?.map((item: any) => (
              <VideoCard
                key={item?.title}
                title={item?.title}
                image={
                  item?.image &&
                  (urlFor(item?.image?.asset?._ref) as unknown as string)
                }
                url={item?.url}
              />
            ))}
          </Grid>
          <a
            href="https://www.youtube.com/@seraphicvoicesoftoronto6557"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              color="secondary.700"
              variant="outline"
              rightIcon={<Icon as={BsArrowRightShort} boxSize={6} />}
            >
              View All
            </Button>
          </a>
        </VStack>
      </Container>
    </Box>
  );
};

export default Repettoire;
