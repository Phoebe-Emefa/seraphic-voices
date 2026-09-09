import { Grid, Skeleton, VStack } from "@chakra-ui/react";

type EventsGridSkeletonProps = {
  count?: number;
};

const EventsGridSkeleton = ({ count = 2 }: EventsGridSkeletonProps) => {
  return (
    <Grid
      templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
      gap={{ base: 6, md: 8 }}
      aria-busy="true"
      aria-label="Loading events"
    >
      {Array.from({ length: count }).map((_, index) => (
        <VStack
          key={index}
          spacing={0}
          w="full"
          align="stretch"
          borderRadius="2xl"
          overflow="hidden"
        >
          <Skeleton
            w="full"
            aspectRatio="16/9"
            borderTopRadius="2xl"
            startColor="secondary.700"
            endColor="secondary.600"
          />
          <VStack
            align="stretch"
            spacing={4}
            p={{ base: 5, md: 6 }}
            w="full"
            bg="secondary.700"
          >
            <Skeleton h="0.75rem" w="35%" borderRadius="sm" />
            <Skeleton h="2.5rem" w="55%" borderRadius="md" />
            <Skeleton h="1rem" w="80%" borderRadius="sm" />
            <Skeleton h="3.25rem" w="full" borderRadius="full" mt={2} />
          </VStack>
        </VStack>
      ))}
    </Grid>
  );
};

export default EventsGridSkeleton;
