"use client";

import type { GalleryAlbum } from "@/lib/galleryDisplay";
import { Box, Button, Flex, Text } from "@chakra-ui/react";

type GalleryAlbumPickerProps = {
  albums: GalleryAlbum[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

const GalleryAlbumPicker = ({ albums, activeIndex, onSelect }: GalleryAlbumPickerProps) => {
  return (
    <Box w="full" minW={0}>
      <Box position="relative" mx={{ base: -4, sm: 0 }} px={{ base: 4, sm: 0 }}>
        <Box
          position="absolute"
          left={0}
          top={0}
          bottom={0}
          w={{ base: 6, sm: 0 }}
          bg="linear-gradient(90deg, var(--chakra-colors-secondary-100) 0%, transparent 100%)"
          zIndex={1}
          pointerEvents="none"
          display={{ base: "block", sm: "none" }}
        />
        <Box
          position="absolute"
          right={0}
          top={0}
          bottom={0}
          w={{ base: 6, sm: 0 }}
          bg="linear-gradient(270deg, var(--chakra-colors-secondary-100) 0%, transparent 100%)"
          zIndex={1}
          pointerEvents="none"
          display={{ base: "block", sm: "none" }}
        />

        <Flex
          gap={2}
          overflowX="auto"
          pb={1}
          align="center"
          sx={{
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
            scrollSnapType: "x proximity",
          }}
        >
          {albums.map((album, index) => {
            const isActive = index === activeIndex;

            return (
              <Button
                key={album.key}
                onClick={() => onSelect(index)}
                flexShrink={0}
                h="2.5rem"
                maxW={{ base: "14rem", md: "18rem" }}
                px={{ base: 4, md: 5 }}
                borderRadius="full"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="semibold"
                scrollSnapAlign="start"
                bg={isActive ? "secondary.700" : "white"}
                color={isActive ? "white" : "secondary.700"}
                border="1px solid"
                borderColor={isActive ? "secondary.700" : "blackAlpha.100"}
                boxShadow={
                  isActive
                    ? "0 12px 24px -12px rgba(4, 35, 92, 0.45)"
                    : "0 8px 20px -16px rgba(4, 35, 92, 0.12)"
                }
                _hover={{
                  bg: isActive ? "secondary.700" : "white",
                  borderColor: isActive ? "secondary.700" : "secondary.500",
                }}
                _active={{ transform: "scale(0.98)" }}
                aria-pressed={isActive}
                title={album.label}
              >
                <Text as="span" noOfLines={1}>
                  {album.label}
                </Text>
              </Button>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
};

export default GalleryAlbumPicker;
