"use client";

import { GALLERY_FALLBACK } from "@/data/galleryContent";
import type { GalleryAlbum } from "@/lib/galleryDisplay";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

type GalleryAlbumPickerProps = {
  albums: GalleryAlbum[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

const GalleryAlbumPicker = ({ albums, activeIndex, onSelect }: GalleryAlbumPickerProps) => {
  const [query, setQuery] = useState("");
  const showSearch = albums.length > 6;

  const filteredAlbums = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return albums;

    return albums.filter((album) => {
      const haystack = [album.label, album.description, album.year?.toString()]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(trimmed);
    });
  }, [albums, query]);

  const resolveOriginalIndex = (album: GalleryAlbum) =>
    albums.findIndex((item) => item.key === album.key);

  return (
    <Box w="full" minW={0}>
      {showSearch ? (
        <InputGroup mb={3} maxW={{ base: "full", md: "20rem" }}>
          <InputLeftElement pointerEvents="none" h="full">
            <HiOutlineMagnifyingGlass color="var(--chakra-colors-secondary-700)" opacity={0.45} />
          </InputLeftElement>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={GALLERY_FALLBACK.search.placeholder}
            h="2.75rem"
            pl={10}
            borderRadius="full"
            bg="white"
            border="1px solid"
            borderColor="blackAlpha.100"
            fontSize="sm"
            color="secondary.700"
            _placeholder={{ color: "secondary.700", opacity: 0.45 }}
            _focus={{
              borderColor: "secondary.500",
              boxShadow: "0 0 0 1px var(--chakra-colors-secondary-500)",
            }}
          />
        </InputGroup>
      ) : null}

      {filteredAlbums.length === 0 ? (
        <Text fontSize="sm" color="secondary.700" opacity={0.7}>
          {GALLERY_FALLBACK.search.empty}
        </Text>
      ) : (
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
            {filteredAlbums.map((album) => {
              const originalIndex = resolveOriginalIndex(album);
              const isActive = originalIndex === activeIndex;

              return (
                <Button
                  key={album.key}
                  onClick={() => onSelect(originalIndex)}
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
                  <Text
                    as="span"
                    ml={2}
                    fontSize="xs"
                    opacity={isActive ? 0.85 : 0.55}
                    fontWeight="medium"
                    flexShrink={0}
                  >
                    {album.images.length}
                  </Text>
                </Button>
              );
            })}
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default GalleryAlbumPicker;
