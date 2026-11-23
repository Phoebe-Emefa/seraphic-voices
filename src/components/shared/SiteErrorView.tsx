"use client";

import CustomButton from "@/components/shared/CustomButton";
import { Box, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";

type SiteErrorViewProps = {
  onRetry: () => void;
};

export default function SiteErrorView({ onRetry }: SiteErrorViewProps) {
  return (
    <Box
      position="relative"
      mt={-20}
      minH="100dvh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="primary"
      color="white"
      px={{ base: 5, md: 8 }}
      py={{ base: 24, md: 28 }}
      overflow="hidden"
    >
      <Box
        aria-hidden
        position="absolute"
        inset={0}
        opacity={0.18}
        pointerEvents="none"
        sx={{
          backgroundImage:
            "repeating-linear-gradient(180deg, transparent, transparent 27px, rgba(255,224,153,0.35) 27px, rgba(255,224,153,0.35) 28px)",
          backgroundPosition: "center 18%",
          backgroundSize: "100% 140px",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 18%, black 72%, transparent 100%)",
          "@media (prefers-reduced-motion: no-preference)": {
            animation: "staffDrift 28s linear infinite",
          },
          "@keyframes staffDrift": {
            from: { backgroundPosition: "center 18%" },
            to: { backgroundPosition: "center 32%" },
          },
        }}
      />

      <VStack
        role="alert"
        spacing={{ base: 6, md: 8 }}
        maxW="36rem"
        textAlign="center"
        position="relative"
        zIndex={1}
      >
        <Image
          src="/images/seraphic-voices.png"
          alt="Seraphic Voices of Toronto"
          h={{ base: "3.25rem", md: "3.75rem" }}
          w="auto"
          maxW="12rem"
          objectFit="contain"
          filter="brightness(0) invert(1)"
          opacity={0.95}
        />

        <Box w={{ base: "3.5rem", md: "4.5rem" }} h="1px" bg="secondary.500" />

        <VStack spacing={4}>
          <Heading
            as="h1"
            color="white"
            fontWeight={700}
            letterSpacing="-0.02em"
            lineHeight={1.1}
            fontSize={{ base: "1.875rem", md: "2.75rem" }}
          >
            This page could not be loaded
          </Heading>
          <Text
            color="whiteAlpha.800"
            fontSize={{ base: "md", md: "lg" }}
            lineHeight={1.6}
            maxW="32ch"
          >
            Something went wrong. Try again in a moment, or return home.
          </Text>
        </VStack>

        <Flex
          gap={3}
          direction={{ base: "column", sm: "row" }}
          w={{ base: "full", sm: "auto" }}
          justify="center"
        >
          <CustomButton
            title="Try again"
            onClick={onRetry}
            bg="secondary.500"
            hoverBg="white"
            textColor="primary"
            width={{ base: "100%", sm: "11rem" }}
          />
          <CustomButton
            title="Home"
            href="/"
            variant="outline"
            textColor="white"
            hoverBg="whiteAlpha.200"
            width={{ base: "100%", sm: "11rem" }}
          />
        </Flex>
      </VStack>
    </Box>
  );
}
