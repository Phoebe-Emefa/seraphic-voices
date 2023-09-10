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

const Repettoire = () => {
  return (
    <Box backgroundColor="bg.100" py={{base: 12, md:20}}>
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
            <VideoCard
              title="All Hail the Power"
              image="/images/choir-3.jpg"
              url="https://www.youtube.com/embed/Ud7YvLSrpUk"
            />
            <VideoCard
              title="See the Conquering Hero comes"
              image="/images/choir-3.jpg"
              url="https://www.youtube.com/embed/O5VoaiWNP1A?si=YTIq59hKwtoG9k43"
            />
            <VideoCard
              title="Seraphic Noël hilifes"
              image="/images/choir-3.jpg"
              url="https://www.youtube.com/embed/HfawZypVNVw?si=yEqmjwLth4cN8h2-"
            />
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
