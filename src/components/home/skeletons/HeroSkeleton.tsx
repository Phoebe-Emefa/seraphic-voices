import { Box, Skeleton, VStack } from "@chakra-ui/react";

const HeroSkeleton = () => {
  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading hero"
      width="100%"
      mt={-20}
      h="100dvh"
      bg="primary"
      position="relative"
      overflow="hidden"
    >
      <Skeleton
        position="absolute"
        inset={0}
        startColor="rgba(255,255,255,0.04)"
        endColor="rgba(255,255,255,0.1)"
        speed={1.1}
      />

      <VStack
        position="absolute"
        bottom={{ base: "12%", md: "14%" }}
        left={{ base: 5, sm: 6, md: 8, xl: 12 }}
        right={{ base: 5, sm: 6, md: "45%" }}
        align="flex-start"
        spacing={{ base: 3, md: 4 }}
        zIndex={1}
      >
        <Skeleton
          h={{ base: "2.5rem", md: "3.5rem", lg: "4rem" }}
          w={{ base: "90%", md: "80%" }}
          borderRadius="md"
          startColor="rgba(255,255,255,0.12)"
          endColor="rgba(255,255,255,0.22)"
        />
        <Skeleton
          h={{ base: "2.5rem", md: "3.5rem" }}
          w={{ base: "70%", md: "55%" }}
          borderRadius="md"
          startColor="rgba(255,255,255,0.1)"
          endColor="rgba(255,255,255,0.18)"
        />
        <Skeleton
          h={{ base: "1rem", md: "1.125rem" }}
          w="95%"
          borderRadius="sm"
          startColor="rgba(255,255,255,0.08)"
          endColor="rgba(255,255,255,0.14)"
        />
        <Skeleton
          h={{ base: "1rem", md: "1.125rem" }}
          w="75%"
          borderRadius="sm"
          startColor="rgba(255,255,255,0.08)"
          endColor="rgba(255,255,255,0.14)"
        />
        <Skeleton
          h={{ base: "3rem", md: "3.25rem" }}
          w={{ base: "10rem", md: "11rem" }}
          borderRadius="full"
          mt={{ base: 2, md: 3 }}
          startColor="rgba(255,255,255,0.14)"
          endColor="rgba(255,255,255,0.24)"
        />
      </VStack>

      <Skeleton
        position="absolute"
        top={{ base: "5rem", md: "6rem" }}
        right={{ base: 4, sm: 6, md: 8, xl: 12 }}
        h="2rem"
        w="6.5rem"
        borderRadius="full"
        startColor="rgba(255,255,255,0.1)"
        endColor="rgba(255,255,255,0.18)"
      />
    </Box>
  );
};

export default HeroSkeleton;
