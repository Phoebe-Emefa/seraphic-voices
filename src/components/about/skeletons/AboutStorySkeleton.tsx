import { Box, Container, Grid, GridItem, Skeleton, VStack } from "@chakra-ui/react";

const AboutStorySkeleton = () => {
  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading story section"
      bg="secondary.100"
      py={{ base: 10, sm: 14, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 4, sm: 6, md: 8, xl: 12 }}
      >
        <VStack align="stretch" spacing={{ base: 8, md: 16 }}>
          <Box>
            <Skeleton h={{ base: "2.75rem", md: "3.25rem" }} w={{ base: "50%", md: "35%" }} borderRadius="md" />
            <Skeleton mt={5} h="3px" w="4rem" borderRadius="sm" />
          </Box>

          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 6, lg: 12 }} w="full">
            <GridItem order={{ base: 2, lg: 1 }}>
              <VStack align="stretch" spacing={5}>
                <Skeleton h="6rem" w="full" borderRadius="md" />
                <Skeleton h="4rem" w="full" borderRadius="md" />
                <Skeleton h="4rem" w="full" borderRadius="md" />
              </VStack>
            </GridItem>
            <GridItem order={{ base: 1, lg: 2 }}>
              <Skeleton h={{ base: "14rem", lg: "28rem" }} w="full" borderRadius="xl" />
            </GridItem>
          </Grid>

          <Box w="full" py={6} borderTop="1px solid" borderBottom="1px solid" borderColor="blackAlpha.100">
            <VStack align="stretch" spacing={5} w="full">
              <Skeleton h="4rem" w="full" borderRadius="md" />
              <Skeleton h="4rem" w="full" borderRadius="md" />
            </VStack>
          </Box>

          <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap={{ base: 6, lg: 12 }} w="full">
            <GridItem order={{ base: 1, lg: 1 }}>
              <Skeleton h={{ base: "14rem", lg: "24rem" }} w="full" borderRadius="xl" />
            </GridItem>
            <GridItem order={{ base: 2, lg: 2 }}>
              <VStack align="stretch" spacing={5}>
                <Skeleton h="4rem" w="full" borderRadius="md" />
                <Skeleton h="2px" w="3rem" borderRadius="sm" />
                <Skeleton h="1.25rem" w="75%" borderRadius="md" />
                <Skeleton h="1.25rem" w="65%" borderRadius="md" />
                <Skeleton h="1.25rem" w="70%" borderRadius="md" />
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutStorySkeleton;
