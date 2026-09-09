import { Box, Container, Grid, Skeleton, VStack } from "@chakra-ui/react";

const EventDetailsSkeleton = () => {
  return (
    <>
      <Box
        as="section"
        aria-busy="true"
        aria-label="Loading event details"
        position="relative"
        minH={{ base: "20rem", md: "100dvh" }}
        bg="primary"
        mt={-20}
        overflow="hidden"
      >
        <Skeleton
          position="absolute"
          inset={0}
          borderRadius={0}
          startColor="rgba(255,255,255,0.06)"
          endColor="rgba(255,255,255,0.12)"
        />
        <Container
          maxW="7xl"
          position="relative"
          zIndex={1}
          minH={{ md: "100dvh" }}
          py={{ base: 16, md: 24 }}
        >
          <VStack align="flex-start" spacing={4} w="full" maxW="3xl">
            <Skeleton h="2rem" w="6rem" borderRadius="full" />
            <Skeleton h="0.875rem" w="5rem" />
            <Skeleton h={{ base: "2.5rem", md: "3.5rem" }} w={{ base: "90%", md: "75%" }} />
            <Skeleton h="1rem" w="55%" />
            <Skeleton h="1rem" w="48%" />
            <Skeleton h="1rem" w="52%" />
            <Skeleton
              h="3rem"
              w="10rem"
              borderRadius="full"
              display={{ base: "none", md: "block" }}
            />
          </VStack>
        </Container>
      </Box>

      <Box bg="secondary.100" py={16}>
        <Container maxW="7xl">
          <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={12}>
            <VStack align="stretch" spacing={4}>
              <Skeleton h="2rem" w={{ base: "70%", md: "40%" }} />
              <Skeleton h="1rem" w="100%" />
              <Skeleton h="1rem" w="95%" />
              <Skeleton h="1rem" w="88%" />
              <Skeleton h="1rem" w="72%" display={{ base: "none", sm: "block" }} />
            </VStack>
            <Skeleton h={{ base: "10rem", md: "12rem" }} w="full" borderRadius="md" />
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default EventDetailsSkeleton;
