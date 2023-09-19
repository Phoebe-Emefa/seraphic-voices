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
              image="/images/hail-power.jpg"
              url="https://www.youtube.com/embed/mm67HkAnlVA?si=Ok7y0EbMhxKKWoqm"
            />
            <VideoCard
              title="Ye de anigye besom yen Nyame(Busy Body)"
              image="/images/busy-body.jpg"
              url="https://www.youtube.com/embed/2egcDazXmcs?si=s6jqjCw56MuIoPRs"
            />
            <VideoCard
              title="Beautiful Star"
              image="/images/beautiful-star.jpg"
              url="https://www.youtube.com/embed/1EvR_ZX-cY0?si=iLUttWoEVv6g_VW"
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
