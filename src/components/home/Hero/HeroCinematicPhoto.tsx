"use client";

import CustomButton from "@/components/shared/CustomButton";
import { Box, Container, Flex, Heading, HStack, Icon, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";

type HeroCinematicPhotoProps = {
  imageUrl: string;
  imageAlt: string;
  objectPosition?: string;
  title?: string;
  briefTitle?: string;
  metaDate?: string;
  metaLocation?: string;
  ctaTitle?: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
  primaryHeading?: boolean;
};

export default function HeroCinematicPhoto({
  imageUrl,
  imageAlt,
  objectPosition = "center top",
  title,
  briefTitle,
  metaDate,
  metaLocation,
  ctaTitle,
  ctaHref,
  ctaOnClick,
  primaryHeading,
}: HeroCinematicPhotoProps) {
  const showText = Boolean(title || briefTitle || metaDate || metaLocation);
  const showCta = Boolean(ctaTitle && (ctaHref || ctaOnClick));
  const headingAs = primaryHeading ? "h1" : "h2";

  return (
    <Box
      position="relative"
      w="full"
      h="full"
      flex="1"
      minH={0}
      overflow="hidden"
      bg="primary"
    >
      <Image
        src={imageUrl}
        alt={imageAlt}
        position="absolute"
        inset={0}
        w="full"
        h="full"
        objectFit="cover"
        objectPosition={objectPosition}
      />

      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h={{ base: "6rem", md: "10rem" }}
        bg="linear-gradient(to bottom, rgba(4, 25, 68, 0.85) 0%, rgba(4, 25, 68, 0.35) 60%, transparent 100%)"
        pointerEvents="none"
      />
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h={{ base: "28rem", md: "24rem", lg: "22rem" }}
        bg="linear-gradient(to top, rgba(3, 18, 48, 0.98) 0%, rgba(3, 18, 48, 0.85) 45%, rgba(4, 25, 68, 0.4) 75%, transparent 100%)"
        pointerEvents="none"
      />

      {showText || showCta ? (
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          pb={{ base: 14, sm: 14, md: 10, lg: 12 }}
          pt={6}
          px={{ base: 5, sm: 6, md: 10, xl: 16 }}
        >
          <Container maxW="7xl" p={0}>
            <Flex
              direction={{ base: "column", md: "row" }}
              align={{ base: "flex-start", md: "flex-end" }}
              justify="space-between"
              gap={{ base: 5, md: 10 }}
            >
              {showText ? (
                <VStack
                  align="flex-start"
                  spacing={{ base: 2.5, md: 3 }}
                  maxW={{ base: "100%", md: "46rem", lg: "54rem" }}
                >
                  {title ? (
                    <Heading
                      as={headingAs}
                      fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl", xl: "5.5xl" }}
                      fontWeight="bold"
                      color="white"
                      lineHeight={{ base: 1.15, md: 1.12 }}
                      letterSpacing="-0.02em"
                      textShadow="0 4px 20px rgba(0, 0, 0, 0.5)"
                    >
                      {title}
                    </Heading>
                  ) : null}

                  {briefTitle ? (
                    <Text
                      fontSize={{ base: "sm", sm: "md", md: "lg" }}
                      color="whiteAlpha.900"
                      maxW="36rem"
                      lineHeight={{ base: 1.4, md: 1.5 }}
                      textShadow="0 2px 10px rgba(0, 0, 0, 0.45)"
                      noOfLines={2}
                    >
                      {briefTitle}
                    </Text>
                  ) : null}

                  {metaDate || metaLocation ? (
                    <HStack
                      spacing={{ base: 3, md: 5 }}
                      color="whiteAlpha.850"
                      flexWrap="wrap"
                      rowGap={2}
                    >
                      {metaDate ? (
                        <HStack spacing={2}>
                          <Icon as={FaClock} boxSize={3.5} />
                          <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="semibold">
                            {metaDate}
                          </Text>
                        </HStack>
                      ) : null}
                      {metaLocation ? (
                        <HStack spacing={2}>
                          <Icon as={FaMapMarkerAlt} boxSize={3.5} />
                          <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="semibold">
                            {metaLocation}
                          </Text>
                        </HStack>
                      ) : null}
                    </HStack>
                  ) : null}
                </VStack>
              ) : (
                <Box />
              )}

              {showCta && ctaTitle ? (
                <Box flexShrink={0} pt={{ base: 1, md: 0 }} pb={{ base: 0, md: 1 }}>
                  <CustomButton
                    title={ctaTitle}
                    href={ctaOnClick ? undefined : ctaHref}
                    onClick={ctaOnClick}
                    width={{ base: "10.5rem", sm: "11rem", md: "12.5rem" }}
                    height={{ base: "3rem", md: 14 }}
                    fontSize={{ base: "sm", md: "md" }}
                  />
                </Box>
              ) : null}
            </Flex>
          </Container>
        </Box>
      ) : null}
    </Box>
  );
}
