import ImageCarousel from "@/components/home/Hero/ImageCarousel";
import Reveal from "@/components/shared/Reveal";
import { Box, VStack, Heading, Text, Flex } from "@chakra-ui/react";
import React from "react";

const MobileHero = ({ content }: { content: any }) => {


  return (
    <Box bg="secondary.100" pt={8} pb={40} position="relative">
      <VStack spacing={6} align="left" mx={8}>
        <Reveal>
          <Heading as="h1" fontSize="3xl" color="primary">
          Harmonizing Cultures, Elevating Hearts
        </Heading>
        </Reveal>

       <Reveal>
         <Text>
          Explore the fusion of Western and African music, fostering
          cross-cultural connections
        </Text>
       </Reveal>
      </VStack>
      <Flex justify="flex-end" position="absolute" bottom="-65%"  >
        <ImageCarousel content={content} />
      </Flex>
    </Box>
  );
};

export default MobileHero;
