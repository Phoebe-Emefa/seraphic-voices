import { Box, Container, Grid, Skeleton, VStack } from "@chakra-ui/react";

const AboutSkeleton = () => {
  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading about section"
      w="full"
      minH={{ base: "auto", lg: "100dvh" }}
      display="flex"
      alignItems="center"
      bg="secondary.100"
      py={{ base: 16, sm: 20, lg: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 5, sm: 6, md: 8, xl: 12 }}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1.2fr" }}
          gap={{ base: 10, sm: 12, lg: 12, xl: 16 }}
          alignItems="center"
        >
          <VStack
            align="flex-start"
            spacing={{ base: 4, md: 5 }}
            order={{ base: 2, lg: 1 }}
            w="full"
          >
            <Skeleton h="0.75rem" w="9rem" borderRadius="sm" />
            <Skeleton h={{ base: "2.5rem", md: "3.25rem", lg: "3.75rem" }} w="95%" borderRadius="md" />
            <Skeleton h={{ base: "2.5rem", md: "3rem" }} w="80%" borderRadius="md" />
            <Skeleton h="1rem" w="100%" borderRadius="sm" />
            <Skeleton h="1rem" w="92%" borderRadius="sm" />
            <Skeleton h="1rem" w="78%" borderRadius="sm" />
            <Skeleton
              h={{ base: "3.25rem", md: "3.5rem" }}
              w={{ base: "full", sm: "13rem" }}
              borderRadius="full"
              mt={2}
            />
          </VStack>

          <Box order={{ base: 1, lg: 2 }} w="full">
            <Skeleton
              h={{ base: "18rem", sm: "24rem", md: "30rem", lg: "34rem" }}
              w="full"
              borderRadius={{ base: "xl", sm: "2xl" }}
            />
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutSkeleton;
