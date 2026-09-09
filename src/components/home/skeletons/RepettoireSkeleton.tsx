import { Box, Container, Flex, Grid, Skeleton, VStack } from "@chakra-ui/react";

const RepettoireSkeleton = () => {
  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading repertoire section"
      bg="bg.100"
      py={{ base: 16, sm: 20, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 5, sm: 6, md: 8, xl: 12 }}
      >
        <VStack spacing={{ base: 8, md: 12 }} align="stretch">
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "flex-end" }}
            gap={{ base: 5, md: 8 }}
          >
            <VStack align="flex-start" spacing={3} maxW="38rem" w="full">
              <Skeleton h="0.75rem" w="8rem" borderRadius="sm" />
              <Skeleton h={{ base: "2rem", md: "2.75rem" }} w={{ base: "70%", md: "18rem" }} borderRadius="md" />
              <Skeleton h="1rem" w="100%" borderRadius="sm" />
              <Skeleton h="1rem" w="88%" borderRadius="sm" />
            </VStack>
            <Skeleton
              display={{ base: "none", md: "block" }}
              h="3.25rem"
              w="13.5rem"
              borderRadius="full"
              flexShrink={0}
            />
          </Flex>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
            gap={{ base: 6, md: 8 }}
          >
            <Skeleton h={{ base: "16rem", md: "18rem", lg: "20rem" }} borderRadius="xl" />
            <Skeleton h={{ base: "16rem", md: "18rem", lg: "20rem" }} borderRadius="xl" />
            <Skeleton
              h={{ base: "16rem", md: "18rem", lg: "20rem" }}
              borderRadius="xl"
              display={{ base: "none", lg: "block" }}
            />
          </Grid>

          <Skeleton
            display={{ base: "block", md: "none" }}
            h="3.25rem"
            w="full"
            borderRadius="full"
          />
        </VStack>
      </Container>
    </Box>
  );
};

export default RepettoireSkeleton;
