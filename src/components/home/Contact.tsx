"use client";

import CustomButton from "@/components/shared/CustomButton";
import ContactSkeleton from "@/components/home/skeletons/ContactSkeleton";
import { useHome } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";

const Contact = () => {
  const homeQuery = useHome();

  if (isCmsLoading(homeQuery)) {
    return <ContactSkeleton />;
  }

  return (
    <Box
      as="section"
      aria-labelledby="home-contact-heading"
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
            textAlign={{ base: "center", lg: "left" }}
            maxW={{ lg: "40rem" }}
          >
            <HStack spacing={3} color="secondary.700">
              <Box w={8} h="2px" bg="secondary.700" />
              <Text
                fontSize={{ base: "2xs", sm: "xs" }}
                fontWeight="bold"
                letterSpacing="0.2em"
                textTransform="uppercase"
              >
                Get in Touch
              </Text>
            </HStack>

            <Heading
              as="h2"
              id="home-contact-heading"
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "4.5xl" }}
              fontWeight="bold"
              color="secondary.700"
              lineHeight={1.15}
              letterSpacing="-0.02em"
              sx={{ textWrap: "balance" }}
            >
              Have a question, or interested in joining us?
            </Heading>

            <Text
              fontSize={{ base: "sm", sm: "md" }}
              color="text"
              lineHeight={1.7}
              maxW="42ch"
            >
              Whether you&apos;re curious about auditions, bookings, or simply want to
              say hello — we&apos;d love to hear from you.
            </Text>
          </VStack>

          <Box
            w={{ base: "full", lg: "auto" }}
            flexShrink={0}
            alignSelf={{ base: "stretch", lg: "flex-end" }}
          >
            <CustomButton
              title="Contact us"
              href="/contact-us"
              width={{ base: "100%", lg: "14rem" }}
              height={{ base: "3.25rem", md: "3.5rem" }}
              fontSize={{ base: "sm", md: "md" }}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Contact;
