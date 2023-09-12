import ImageCarousel from "@/components/home/Hero/ImageCarousel";
import { Box, Container, VStack, Heading, Text, Flex } from "@chakra-ui/react";
import React from "react";

const MobileHero = () => {
  const sliderImages = [
    "/images/choir-1.jpg",
    "/images/choir-2.jpg",
    "/images/choir-3.jpg",
  ];

  return (
    <Box bg="secondary.100" pt={8} pb={40} position="relative">
      <VStack spacing={6} align="left" mx={8}>
        <Heading as="h1" fontSize="3xl" color="primary">
          Harmonizing Cultures, Elevating Hearts
        </Heading>

        <Text>
         Explore the fusion of Western and African music, fostering cross-cultural connections
        </Text>
      </VStack>
      <Flex justify="flex-end" position="absolute" bottom="-60%">
        <ImageCarousel images={sliderImages} />
      </Flex>
    </Box>
  );
};

export default MobileHero;
