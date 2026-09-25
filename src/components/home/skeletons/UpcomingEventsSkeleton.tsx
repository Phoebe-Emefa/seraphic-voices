import EventsGridSkeleton from "@/components/events/skeletons/EventsGridSkeleton";
import { Box, Container, Flex, Skeleton, VStack } from "@chakra-ui/react";

const UpcomingEventsSkeleton = () => {
  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading upcoming events section"
      bg="secondary.100"
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
              <Skeleton h="0.75rem" w="7rem" borderRadius="sm" />
              <Skeleton h={{ base: "2rem", md: "2.75rem" }} w={{ base: "65%", md: "14rem" }} borderRadius="md" />
              <Skeleton h="1rem" w="100%" borderRadius="sm" />
              <Skeleton h="1rem" w="85%" borderRadius="sm" />
            </VStack>
            <Skeleton
              display={{ base: "none", md: "block" }}
              h="3.25rem"
              w="12.5rem"
              borderRadius="full"
              flexShrink={0}
            />
          </Flex>

          <EventsGridSkeleton count={2} />

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

export default UpcomingEventsSkeleton;
