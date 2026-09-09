import { Box, Container, Flex, Skeleton, VStack } from "@chakra-ui/react";
import EventsGridSkeleton from "@/components/events/skeletons/EventsGridSkeleton";

const EventsListingSkeleton = () => {
  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading events listing"
      bg="secondary.100"
      py={{ base: 10, sm: 16, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 4, sm: 6, md: 8, xl: 12 }}
      >
        <VStack spacing={{ base: 8, md: 12 }} align="stretch">
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
            sx={{
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Skeleton h="2.5rem" w="8rem" borderRadius="full" flexShrink={0} />
            <Skeleton h="2.5rem" w="6rem" borderRadius="full" flexShrink={0} />
          </Flex>

          <EventsGridSkeleton count={2} />
        </VStack>
      </Container>
    </Box>
  );
};

export default EventsListingSkeleton;
