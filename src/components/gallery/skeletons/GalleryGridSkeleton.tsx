import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react";

const TILE_COUNT = 8;

const GalleryGridSkeleton = () => {
  return (
    <VStack spacing={{ base: 6, md: 8 }} align="stretch" w="full" minW={0}>
      <Skeleton
        w="full"
        aspectRatio={{ base: "16/10", md: "21/9" }}
        borderRadius={{ base: "xl", md: "2xl" }}
      />

      <Grid
        templateColumns={{
          base: "repeat(2, minmax(0, 1fr))",
          md: "repeat(3, minmax(0, 1fr))",
          lg: "repeat(4, minmax(0, 1fr))",
        }}
        gap={{ base: 3, md: 5 }}
        w="full"
        minW={0}
      >
        {Array.from({ length: TILE_COUNT }).map((_, index) => (
          <Box key={index} aspectRatio="4/5" minW={0}>
            <Skeleton w="full" h="full" borderRadius={{ base: "lg", md: "xl" }} />
          </Box>
        ))}
      </Grid>
    </VStack>
  );
};

export default GalleryGridSkeleton;
