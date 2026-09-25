"use client";

import CustomButton from "@/components/shared/CustomButton";
import ContactSkeleton from "@/components/home/skeletons/ContactSkeleton";
import { useHomePage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { cmsHref } from "@/lib/cmsHref";
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
  const homeQuery = useHomePage();
  const home = homeQuery.data;
  const section = home?.contact;

  if (isCmsLoading(homeQuery)) {
    return <ContactSkeleton />;
  }
  const ctaHref = cmsHref(section?.ctaHref);

  if (!section?.eyebrow && !section?.heading && !section?.body && !(section?.ctaTitle && ctaHref)) {
    return null;
  }

  return (
    <Box
      as="section"
      aria-labelledby={section?.heading ? "home-contact-heading" : undefined}
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
            {section?.eyebrow ? (
              <HStack spacing={3} color="secondary.700">
                <Box w={8} h="2px" bg="secondary.700" />
                <Text
                  fontSize={{ base: "2xs", sm: "xs" }}
                  fontWeight="bold"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                >
                  {section.eyebrow}
                </Text>
              </HStack>
            ) : null}

            {section?.heading ? (
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
                {section.heading}
              </Heading>
            ) : null}

            {section?.body ? (
              <Text
                fontSize={{ base: "sm", sm: "md" }}
                color="text"
                lineHeight={1.7}
                maxW="42ch"
              >
                {section.body}
              </Text>
            ) : null}
          </VStack>

          {section?.ctaTitle && ctaHref ? (
            <Box
              w={{ base: "full", lg: "auto" }}
              flexShrink={0}
              alignSelf={{ base: "stretch", lg: "flex-end" }}
            >
              <CustomButton
                title={section.ctaTitle}
                href={ctaHref}
                width={{ base: "100%", lg: "14rem" }}
                height={{ base: "3.25rem", md: "3.5rem" }}
                fontSize={{ base: "sm", md: "md" }}
              />
            </Box>
          ) : null}
        </Flex>
      </Container>
    </Box>
  );
};

export default Contact;
