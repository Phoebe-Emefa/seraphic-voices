import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const Hero = ({heading,description }: {heading: string; description: string}) => {
  return (
    <Box width="full" height={{base: "100%", xl: "26rem"}} position="relative">
      <Image
        src="/images/choir-2.jpg"
        alt="The seraphic voices"
        width="100%"
        height="100%"
        objectFit="cover"
        objectPosition="top"
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        textAlign="center"
        background="rgba(0, 0, 0, 0.7)" 
        rounded="sm"
        color="white" 
        padding="20px" 
        width={{base: "100%", md: "inherit"}}
      >
        <Heading
          as="h4"
          fontSize={{ base: "3xl", xl: "4xl" }}
          color="secondary.700"
          fontWeight="bold" 
        >
         {heading}
        </Heading>
        <Text fontWeight="semibold" fontSize="lg" mt={3}> 
        {description}
        </Text>
      </Box>
    </Box>
  );
};

export default Hero;
