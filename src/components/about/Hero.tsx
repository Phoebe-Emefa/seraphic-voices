import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const Hero = () => {
  return (
    <Box width="full" height="26rem" position="relative">
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
        background="rgba(0, 0, 0, 0.7)" /* Adjust the alpha value to control transparency */
        rounded="sm"
        color="white" /* Text color */
        padding="20px" /* Add padding */
      >
        <Heading
          as="h4"
          fontSize={{ base: "3xl", xl: "4xl" }}
          color="secondary.700"
          mt={{ base: 20, md: "inherit" }}
          fontWeight="bold" /* Increase font weight */
        >
          Meet the Team
        </Heading>
        <Text fontWeight="semibold" fontSize="lg" mt={3}> {/* Increase font weight */}
          Meet the extraordinary voices behind Seraphic Voices of Toronto! This
          remarkable choir is a powerhouse of passionate musicians dedicated to
          crafting soul-stirring music that transcends boundaries
        </Text>
      </Box>
    </Box>
  );
};

export default Hero;
