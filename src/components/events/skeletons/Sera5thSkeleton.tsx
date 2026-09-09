import AboutHeroSkeleton from "@/components/about/skeletons/AboutHeroSkeleton";
import GalleryGridSkeleton from "@/components/gallery/skeletons/GalleryGridSkeleton";
import { Box, Container, Skeleton, VStack } from "@chakra-ui/react";

const Sera5thSkeleton = () => {
  return (
    <>
      <AboutHeroSkeleton />
      <Box
        as="section"
        aria-busy="true"
        aria-label="Loading anniversary gallery"
        bg="white"
        py={{ base: 10, md: 16 }}
      >
        <Container maxW={{ md: "2xl", lg: "4xl", xl: "6xl", "3xl": "7xl" }}>
          <VStack spacing={8} align="stretch">
            <Skeleton h="3.25rem" w="12rem" borderRadius="full" mx="auto" />
            <GalleryGridSkeleton />
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default Sera5thSkeleton;
