import ImageCarousel from "@/components/home/Hero/ImageCarousel";
import Reveal from "@/components/shared/Reveal";
import { Box, VStack, Heading, Text, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import Link from "next/link";
import CustomButton from "@/components/shared/CustomButton";

const MobileHero = ({ content }: { content: any }) => {
  const [active, setActive] = useState(0);

  return (
    <Box bg="secondary.100" pt={8} pb={40} position="relative">
      <VStack spacing={4} align="left" mx={8}>
        {active === 0 && (
          <Reveal>
            <Box
              bg="blue.500"
              color="white"
              px={4}
              py={2}
              borderRadius="full"
              fontSize="xs"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="wide"
              boxShadow="md"
              alignSelf="flex-start"
            >
              Upcoming Event
            </Box>
          </Reveal>
        )}
        
        <Reveal>
          <Heading as="h1" fontSize="3xl" color="primary">
            {active === 0 ? "An African Christmas" : "Harmonizing Cultures, Elevating Hearts"}
          </Heading>
        </Reveal>

        <Reveal>
          <Text>
            {active === 0 
              ? "Radiance in Toronto - A Black Christmas Celebration." 
              : "Explore the fusion of Western and African music, fostering cross-cultural connections"
            }
          </Text>
        </Reveal>

        {active === 0 && (
          <Reveal>
            <Link href="/events/an-african-christmas">
              <CustomButton title="Read more" />
            </Link>
          </Reveal>
        )}
      </VStack>
      <Flex justify="flex-end" position="absolute" bottom="-65%">
        <ImageCarousel content={content} onSlideChange={setActive} />
      </Flex>
    </Box>
  );
};

export default MobileHero;
