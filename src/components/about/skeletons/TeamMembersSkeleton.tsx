import { Box, Container, Flex, Grid, Skeleton, VStack } from "@chakra-ui/react";

const CARD_COUNT = 8;
const PILL_COUNT = 7;

const TeamMembersSkeleton = () => {
  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading team members"
      bg="secondary.100"
      py={{ base: 10, sm: 16, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 4, sm: 6, md: 8, xl: 12 }}
      >
        <VStack spacing={{ base: 8, md: 10 }} align="stretch">
          <VStack align="flex-start" spacing={4} maxW="40rem">
            <Skeleton h="0.75rem" w="7rem" borderRadius="sm" />
            <Skeleton h="1rem" w="100%" borderRadius="sm" />
            <Skeleton h="1rem" w="88%" borderRadius="sm" />
            <Skeleton h="1rem" w="72%" borderRadius="sm" display={{ base: "none", sm: "block" }} />
          </VStack>

          <Flex
            gap={2}
            overflowX="auto"
            pb={1}
            mx={{ base: -4, sm: 0 }}
            px={{ base: 4, sm: 0 }}
            sx={{
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {Array.from({ length: PILL_COUNT }).map((_, index) => (
              <Skeleton
                key={index}
                h="2.5rem"
                w={{ base: "5.5rem", md: "6.5rem" }}
                borderRadius="full"
                flexShrink={0}
              />
            ))}
          </Flex>

          <Grid
            templateColumns={{
              base: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: 4, md: 6 }}
          >
            {Array.from({ length: CARD_COUNT }).map((_, index) => (
              <Skeleton
                key={index}
                w="full"
                aspectRatio="3/4"
                borderRadius="2xl"
                startColor="secondary.700"
                endColor="secondary.600"
              />
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default TeamMembersSkeleton;
