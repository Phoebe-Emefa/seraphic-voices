import ImageCarousel from "@/components/home/Hero/ImageCarousel";
import { Box, VStack, Heading, Text, Flex } from "@chakra-ui/react";
import React from "react";

const MobileHero = ({ content }: { content: any }) => {
  const sliderImages = content?.imageSlider?.map((image: any) => {
    return {
      imageSrc: image?.asset?._ref,
      imageAlt: image?.alt,
    };
  });

  return (
    <Box bg="secondary.100" pt={8} pb={40} position="relative">
      <VStack spacing={6} align="left" mx={8}>
        <Heading as="h1" fontSize="3xl" color="primary">
          Harmonizing Cultures, Elevating Hearts
        </Heading>

        <Text>
          Explore the fusion of Western and African music, fostering
          cross-cultural connections
        </Text>
      </VStack>
      <Flex justify="flex-end" position="absolute" bottom="-65%"  >
        <ImageCarousel images={sliderImages} />
      </Flex>
    </Box>
  );
};

export default MobileHero;
