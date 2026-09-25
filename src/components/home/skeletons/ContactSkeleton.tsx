import { Box, Container, Flex, Skeleton, VStack } from "@chakra-ui/react";

const ContactSkeleton = () => {
  return (
    <Box
      as="section"
      aria-busy="true"
      aria-label="Loading contact section"
      bg="bg.100"
      py={{ base: 16, sm: 20, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 5, sm: 6, md: 8, xl: 12 }}
      >
        <Flex
          direction={{ base: "column", lg: "row" }}
          align={{ base: "stretch", lg: "flex-end" }}
          justify="space-between"
          gap={{ base: 7, md: 8, lg: 12 }}
        >
          <VStack
            align={{ base: "center", lg: "flex-start" }}
            spacing={{ base: 4, md: 5 }}
            flex="1"
            w="full"
            maxW={{ lg: "40rem" }}
          >
            <Skeleton h="0.75rem" w="7rem" borderRadius="sm" />
            <Skeleton
              h={{ base: "2rem", sm: "2.5rem", md: "3rem", lg: "3.25rem" }}
              w={{ base: "95%", lg: "90%" }}
              borderRadius="md"
            />
            <Skeleton
              h={{ base: "2rem", sm: "2.25rem", md: "2.5rem" }}
              w={{ base: "80%", lg: "70%" }}
              borderRadius="md"
              display={{ base: "none", sm: "block" }}
            />
            <Skeleton h="1rem" w="100%" borderRadius="sm" />
            <Skeleton h="1rem" w="88%" borderRadius="sm" />
          </VStack>

          <Skeleton
            h={{ base: "3.25rem", md: "3.5rem" }}
            w={{ base: "full", lg: "14rem" }}
            borderRadius="full"
            flexShrink={0}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default ContactSkeleton;
