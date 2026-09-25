import { Box, Container, Grid, Skeleton, VStack } from "@chakra-ui/react";

const AboutMissionSkeleton = () => {
  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading mission section"
      bg="secondary.100"
      py={{ base: 16, sm: 20, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 5, sm: 6, md: 8, xl: 12 }}
      >
        <VStack spacing={{ base: 8, md: 10 }} align="stretch">
          <Skeleton h="0.75rem" w="7rem" borderRadius="sm" />

          <Box
            borderRadius={{ base: "xl", md: "2xl" }}
            bg="secondary.700"
            p={{ base: 7, md: 10, lg: 12 }}
          >
            <Grid
              templateColumns={{ base: "1fr", lg: "1.15fr 0.85fr" }}
              gap={{ base: 10, lg: 12 }}
              mb={{ base: 10, md: 12 }}
            >
              <VStack align="stretch" spacing={5}>
                <Skeleton h="0.75rem" w="6rem" borderRadius="sm" />
                <Skeleton h="2rem" w="95%" borderRadius="md" />
                <Skeleton h="2rem" w="88%" borderRadius="md" />
                <Skeleton h="2rem" w="72%" borderRadius="md" />
              </VStack>
              <Box display={{ base: "none", lg: "block" }} pl={10} borderLeft="1px solid" borderColor="whiteAlpha.200">
                <Skeleton h="8rem" w="full" borderRadius="md" />
              </Box>
            </Grid>

            <Skeleton h="1px" w="full" mb={10} />

            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
              <Skeleton h="12rem" borderRadius="xl" />
              <Skeleton h="12rem" borderRadius="xl" />
              <Skeleton h="12rem" borderRadius="xl" />
            </Grid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutMissionSkeleton;
