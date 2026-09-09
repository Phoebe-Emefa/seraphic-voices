import { Grid, Skeleton, VStack } from "@chakra-ui/react";

type TeamGridSkeletonProps = {
  count?: number;
};

const TeamGridSkeleton = ({ count = 8 }: TeamGridSkeletonProps) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={{ base: 4, md: 6 }}
      aria-busy="true"
      aria-label="Loading team members"
    >
      {Array.from({ length: count }).map((_, index) => (
        <VStack key={index} spacing={0} w="full">
          <Skeleton
            w="full"
            aspectRatio="3/4"
            borderRadius="2xl"
            startColor="secondary.700"
            endColor="secondary.600"
          />
        </VStack>
      ))}
    </Grid>
  );
};

export default TeamGridSkeleton;
