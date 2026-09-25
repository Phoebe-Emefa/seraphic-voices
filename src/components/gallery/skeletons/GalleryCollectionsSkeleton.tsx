import GalleryGridSkeleton from "@/components/gallery/skeletons/GalleryGridSkeleton";
import { Box, Container, Flex, Skeleton, VStack } from "@chakra-ui/react";

const GalleryCollectionsSkeleton = () => {
  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading gallery collections"
      bg="secondary.100"
      py={{ base: 10, sm: 16, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 4, sm: 6, md: 8, xl: 12 }}
        w="full"
        minW={0}
      >
        <VStack spacing={{ base: 8, md: 12 }} align="stretch" w="full" minW={0}>
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
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                h="2.5rem"
                w={{ base: "7rem", md: "8rem" }}
                borderRadius="full"
                flexShrink={0}
              />
            ))}
          </Flex>

          <GalleryGridSkeleton />
        </VStack>
      </Container>
    </Box>
  );
};

export default GalleryCollectionsSkeleton;
