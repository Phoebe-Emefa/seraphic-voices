import { Box, Container, Skeleton, VStack } from "@chakra-ui/react";

const AboutBeliefSkeleton = () => {
  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading belief section"
      bg="secondary.100"
      py={{ base: 14, sm: 16, md: 20 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 5, sm: 6, md: 8, xl: 12 }}
      >
        <Box
          bg="white"
          borderRadius={{ base: "xl", md: "2xl" }}
          p={{ base: 7, md: 10, lg: 12 }}
        >
          <VStack align="stretch" spacing={5} maxW="52rem">
            <Skeleton h="1.5rem" w="75%" borderRadius="md" />
            <Skeleton h="1.25rem" w="full" borderRadius="md" />
            <Skeleton h="1.25rem" w="92%" borderRadius="md" />
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutBeliefSkeleton;
