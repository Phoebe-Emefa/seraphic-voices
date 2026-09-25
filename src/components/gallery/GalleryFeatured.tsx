"use client";

import type { GalleryImage } from "@/lib/galleryDisplay";
import { Box, Icon, Image, Text } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineArrowsPointingOut } from "react-icons/hi2";

const easeOut = [0.23, 1, 0.32, 1];

type GalleryFeaturedProps = {
  image: GalleryImage;
  collectionLabel: string;
  onOpen: () => void;
};

const GalleryFeatured = ({ image, collectionLabel, onOpen }: GalleryFeaturedProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easeOut }}
      style={{ width: "100%", minWidth: 0 }}
    >
      <Box
        as="button"
        type="button"
        role="group"
        onClick={onOpen}
        aria-label={image.caption || image.alt}
        position="relative"
        w="full"
        minW={0}
        borderRadius={{ base: "xl", md: "2xl" }}
        overflow="hidden"
        bg="secondary.700"
        aspectRatio={{ base: "16/10", md: "21/9" }}
        cursor="pointer"
        textAlign="left"
        boxShadow="0 32px 64px -32px rgba(4, 35, 92, 0.4)"
        transition="box-shadow 0.4s ease"
        _hover={{ boxShadow: "0 40px 72px -28px rgba(4, 35, 92, 0.48)" }}
        _active={{ transform: "scale(0.995)" }}
      >
        <Image
          src={image.url}
          alt={image.alt}
          position="absolute"
          inset={0}
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center"
          loading="eager"
          transition="transform 0.7s cubic-bezier(0.23, 1, 0.32, 1)"
          _groupHover={{ transform: "scale(1.02)" }}
        />
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(90deg, rgba(4, 25, 68, 0.72) 0%, rgba(4, 25, 68, 0.2) 55%, rgba(4, 25, 68, 0.05) 100%)"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(0deg, rgba(4, 25, 68, 0.55) 0%, transparent 50%)"
          pointerEvents="none"
        />

        <Box
          position="absolute"
          left={{ base: 5, md: 8 }}
          right={{ base: 5, md: 8 }}
          bottom={{ base: 5, md: 8 }}
          pointerEvents="none"
        >
          <Text
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="secondary.500"
            mb={2}
          >
            {collectionLabel}
          </Text>
          <Text
            color="white"
            fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
            fontWeight="semibold"
            lineHeight={1.25}
            letterSpacing="-0.02em"
            maxW="32rem"
            noOfLines={2}
            sx={{ textWrap: "balance" }}
          >
            {image.caption || image.alt}
          </Text>
        </Box>

        <Box
          position="absolute"
          top={{ base: 4, md: 6 }}
          right={{ base: 4, md: 6 }}
          w={10}
          h={10}
          borderRadius="full"
          bg="rgba(255, 255, 255, 0.12)"
          border="1px solid"
          borderColor="whiteAlpha.400"
          display="flex"
          alignItems="center"
          justifyContent="center"
          opacity={0.85}
          transition="opacity 0.25s ease, background 0.25s ease"
          _groupHover={{ opacity: 1, bg: "rgba(255, 255, 255, 0.2)" }}
        >
          <Icon as={HiOutlineArrowsPointingOut} color="white" boxSize={4} />
        </Box>
      </Box>
    </motion.div>
  );
};

export default GalleryFeatured;
