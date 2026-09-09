"use client";

import type { GalleryImage } from "@/lib/galleryDisplay";
import { Box, Image, Text } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.23, 1, 0.32, 1];

type GalleryImageTileProps = {
  image: GalleryImage;
  index?: number;
  onOpen: () => void;
};

const GalleryImageTile = ({ image, index = 0, onOpen }: GalleryImageTileProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.04, ease: easeOut }}
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
        aspectRatio="4/5"
        borderRadius={{ base: "lg", md: "xl" }}
        overflow="hidden"
        bg="secondary.700"
        border="1px solid"
        borderColor="blackAlpha.50"
        cursor="pointer"
        textAlign="left"
        boxShadow="0 12px 32px -20px rgba(4, 35, 92, 0.22)"
        transition="box-shadow 0.35s ease, border-color 0.35s ease"
        _hover={{
          boxShadow: "0 20px 40px -16px rgba(4, 35, 92, 0.32)",
          borderColor: "secondary.500",
        }}
        _active={{ transform: "scale(0.98)" }}
      >
        <Image
          src={image.url}
          alt={image.alt}
          position="absolute"
          inset={0}
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center top"
          loading="lazy"
          transition="transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)"
          _groupHover={{ transform: "scale(1.03)" }}
        />

        <Box
          position="absolute"
          inset={0}
          bg="rgba(4, 25, 68, 0)"
          transition="background 0.35s ease"
          _groupHover={{ bg: "rgba(4, 25, 68, 0.35)" }}
          pointerEvents="none"
        />

        {image.caption ? (
          <Box
            position="absolute"
            left={0}
            right={0}
            bottom={0}
            px={4}
            pb={4}
            pt={10}
            bg="linear-gradient(0deg, rgba(4, 25, 68, 0.88) 0%, transparent 100%)"
            opacity={0}
            transform="translateY(6px)"
            transition="opacity 0.3s ease, transform 0.3s ease"
            _groupHover={{ opacity: 1, transform: "translateY(0)" }}
            pointerEvents="none"
          >
            <Box w="1.5rem" h="2px" bg="secondary.500" mb={2} />
            <Text
              color="white"
              fontSize="sm"
              fontWeight="medium"
              lineHeight={1.45}
              noOfLines={2}
              sx={{ textWrap: "balance" }}
            >
              {image.caption}
            </Text>
          </Box>
        ) : null}
      </Box>
    </motion.div>
  );
};

export default GalleryImageTile;
