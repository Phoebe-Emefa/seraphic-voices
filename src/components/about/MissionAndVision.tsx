"use client";
import { Box, Container, Flex, Grid, VStack, Heading, Text } from "@chakra-ui/react";
import React from "react";

const MissionAndVision = () => {
  return (
    <Box backgroundColor="bg.100" py={{base: 12, md:20}}>
      <Container
        maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }}
        py={16}
      >
        <Grid templateColumns={{base: "repeat(1, 1fr)", xl: "repeat(2, 1fr)"}} gap={6} >
          <VStack align="left" pl={4} borderLeft="10px solid #04235c" backgroundColor="white" p={4} boxShadow="rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" >
            <Heading
              as="h4"
              fontSize={{ base: "2xl", xl: "3xl" }}
              color="secondary.700"
            >
              Mission Statement
            </Heading>
            <Text>
              Our mission is to share the beauty and power of both Western and
              African choral music with audiences in Canada and beyond. We seek
              to show the vibrancy and richness of African Culture through
              choral music. Through our performances, we celebrate the richness
              of these diverse musical traditions while also promoting
              cross-cultural exchange and understanding.
            </Text>
          </VStack>
          <VStack align="left" pl={4} borderLeft="10px solid #04235c" backgroundColor="white" p={4} boxShadow="rgba(17, 12, 46, 0.15) 0px 48px 100px 0px">
            <Heading
              as="h4"
              fontSize={{ base: "2xl", xl: "3xl" }}
              color="secondary.700"
            >
              Vision Statement
            </Heading>
            <Text>
              Our vision is to be a premier choral ensemble that bridges the gap
              between Western and African musical traditions. We strive to
              showcase the unique qualities of both choral forms, while also
              exploring new and innovative ways to blend them together. Through
              our art, we aim to promote mutual respect and appreciation among
              people of diverse backgrounds and cultures. We envision a future
              where music is a universal language that unites us all in our
              shared humanity.
            </Text>
          </VStack>
        </Grid>
      </Container>
    </Box>
  );
};

export default MissionAndVision;
