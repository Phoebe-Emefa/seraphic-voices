import { Box, Container, Flex, Grid, Skeleton, VStack } from "@chakra-ui/react";

const ContactSectionSkeleton = () => {
  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading contact section"
      bg="secondary.100"
      py={{ base: 10, sm: 16, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 4, sm: 6, md: 8, xl: 12 }}
        w="full"
        minW={0}
      >
        <VStack spacing={{ base: 8, md: 12 }} align="stretch">
          <VStack align="flex-start" spacing={4} maxW="40rem">
            <Skeleton h="0.75rem" w="7rem" borderRadius="sm" />
            <Skeleton h="1rem" w="100%" borderRadius="sm" />
            <Skeleton h="1rem" w="88%" borderRadius="sm" />
            <Skeleton h="1rem" w="72%" borderRadius="sm" display={{ base: "none", sm: "block" }} />
          </VStack>

          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1.1fr" }}
            gap={{ base: 8, lg: 12 }}
            alignItems="start"
            w="full"
            minW={0}
          >
            <VStack spacing={4} align="stretch" w="full">
              <Skeleton h="1.5rem" w="40%" borderRadius="sm" />
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} h="5.5rem" w="full" borderRadius="xl" />
              ))}
              <Skeleton h="3rem" w="60%" borderRadius="full" mt={2} />
            </VStack>

            <Box
              w="full"
              p={{ base: 6, md: 8 }}
              borderRadius="2xl"
              bg="white"
              border="1px solid"
              borderColor="blackAlpha.50"
            >
              <Skeleton h="1.5rem" w="50%" mb={8} borderRadius="sm" />
              <VStack spacing={6} align="stretch">
                <Flex gap={4}>
                  <Skeleton flex={1} h="3.5rem" borderRadius="lg" />
                  <Skeleton flex={1} h="3.5rem" borderRadius="lg" />
                </Flex>
                <Skeleton h="3.5rem" w="full" borderRadius="lg" />
                <Skeleton h="8rem" w="full" borderRadius="lg" />
                <Skeleton h="3.25rem" w="full" borderRadius="full" />
              </VStack>
            </Box>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactSectionSkeleton;
