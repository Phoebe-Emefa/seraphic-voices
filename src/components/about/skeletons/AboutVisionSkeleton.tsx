import { Box, Container, Grid, Skeleton, VStack } from "@chakra-ui/react";

const AboutVisionSkeleton = () => {
  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading vision section"
      bg="bg.100"
      py={{ base: 16, sm: 20, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 5, sm: 6, md: 8, xl: 12 }}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "0.9fr 1.1fr" }}
          gap={{ base: 10, lg: 16 }}
          alignItems="center"
        >
          <Skeleton
            h={{ base: "20rem", md: "26rem", lg: "28rem" }}
            borderRadius={{ base: "xl", md: "2xl" }}
            order={{ base: 1, lg: 2 }}
          />
          <VStack align="flex-start" spacing={5} order={{ base: 2, lg: 1 }} w="full">
            <Skeleton h="0.75rem" w="12rem" borderRadius="sm" />
            <Skeleton h={{ base: "1.75rem", md: "2.25rem" }} w="70%" borderRadius="md" />
            <Skeleton h="0.875rem" w="40%" borderRadius="sm" />
            <Skeleton h="1rem" w="100%" borderRadius="sm" />
            <Skeleton h="1rem" w="98%" borderRadius="sm" />
            <Skeleton h="1rem" w="92%" borderRadius="sm" />
            <Skeleton h="1rem" w="88%" borderRadius="sm" />
          </VStack>
        </Grid>

        <Box mt={{ base: 10, md: 14 }} w="full" pt={{ base: 8, md: 10 }}>
          <Skeleton h="2px" w="3rem" mb={6} borderRadius="sm" />
          <Skeleton h="4rem" w="full" borderRadius="md" />
        </Box>
      </Container>
    </Box>
  );
};

export default AboutVisionSkeleton;
