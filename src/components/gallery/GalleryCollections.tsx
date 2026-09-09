"use client";

import SectionEyebrow from "@/components/about/SectionEyebrow";
import GalleryAlbumPicker from "@/components/gallery/GalleryAlbumPicker";
import GalleryFeatured from "@/components/gallery/GalleryFeatured";
import GalleryGridSkeleton from "@/components/gallery/skeletons/GalleryGridSkeleton";
import GalleryCollectionsSkeleton from "@/components/gallery/skeletons/GalleryCollectionsSkeleton";
import GalleryImageTile from "@/components/gallery/GalleryImageTile";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import CustomButton from "@/components/shared/CustomButton";
import { GALLERY_FALLBACK } from "@/data/galleryContent";
import { useGallery } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import type { GalleryAlbum } from "@/lib/galleryDisplay";
import { formatAlbumDate } from "@/lib/galleryDisplay";
import { resolveGalleryAlbums } from "@/lib/resolveGallery";
import {
  Box,
  Container,
  Flex,
  Grid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";

const GRID_BATCH = 12;

const GalleryCollections = () => {
  const galleryQuery = useGallery();
  const { data } = galleryQuery;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [gridLimit, setGridLimit] = useState(GRID_BATCH);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const albums = useMemo(
    () => resolveGalleryAlbums(data),
    [data],
  );

  useEffect(() => {
    if (activeIndex < albums.length) return;
    setActiveIndex(0);
  }, [activeIndex, albums.length]);

  const handleAlbumChange = (index: number) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setGridLimit(GRID_BATCH);
    setIsSwitching(true);
  };

  useEffect(() => {
    if (!isSwitching) return;
    const timer = window.setTimeout(() => setIsSwitching(false), 420);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isSwitching]);

  if (isCmsLoading(galleryQuery)) {
    return <GalleryCollectionsSkeleton />;
  }

  const activeAlbum: GalleryAlbum | undefined = albums[activeIndex];
  const activeImages = activeAlbum?.images ?? [];
  const featuredImage = activeImages[0];
  const gridImages = activeImages.slice(1);
  const visibleGridImages = gridImages.slice(0, gridLimit);
  const hasMore = gridImages.length > gridLimit;
  const remainingCount = gridImages.length - gridLimit;
  const albumDateLabel = formatAlbumDate(activeAlbum?.date);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setLightboxIndex(null);
  };

  return (
    <Box
      as="section"
      aria-labelledby="gallery-collections-heading"
      bg="secondary.100"
      py={{ base: 10, sm: 16, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 4, sm: 6, md: 8, xl: 12 }}
        w="full"
        minW={0}
      >
        <VStack spacing={{ base: 8, md: 12 }} align="stretch" w="full" minW={0}>
          <VStack align="flex-start" spacing={4} maxW="40rem">
            <SectionEyebrow label={GALLERY_FALLBACK.section.eyebrow} />
            <Text
              id="gallery-collections-heading"
              fontSize={{ base: "md", md: "lg" }}
              color="secondary.700"
              opacity={0.9}
              lineHeight={1.75}
              sx={{ textWrap: "pretty" }}
            >
              {GALLERY_FALLBACK.section.intro}
            </Text>
          </VStack>

          <Box
            position={{ base: "sticky", md: "static" }}
            top={{ base: "4.5rem", md: "auto" }}
            zIndex={2}
            bg="secondary.100"
            py={{ base: 2, md: 0 }}
          >
            <GalleryAlbumPicker
              albums={albums}
              activeIndex={activeIndex}
              onSelect={handleAlbumChange}
            />
          </Box>

          {isSwitching ? (
            <GalleryGridSkeleton />
          ) : (
            <VStack spacing={{ base: 6, md: 8 }} align="stretch" w="full" minW={0}>
              {featuredImage && activeAlbum ? (
                <GalleryFeatured
                  image={featuredImage}
                  collectionLabel={activeAlbum.label}
                  dateLabel={albumDateLabel}
                  description={activeAlbum.description}
                  onOpen={() => openLightbox(0)}
                />
              ) : null}

              {visibleGridImages.length > 0 ? (
                <Grid
                  templateColumns={{
                    base: "repeat(2, minmax(0, 1fr))",
                    md: "repeat(3, minmax(0, 1fr))",
                    lg: "repeat(4, minmax(0, 1fr))",
                  }}
                  gap={{ base: 3, md: 5 }}
                  w="full"
                  minW={0}
                >
                  {visibleGridImages.map((image, index) => {
                    const lightboxIndex = index + 1;

                    return (
                      <GalleryImageTile
                        key={image._id || `${image.url}-${lightboxIndex}`}
                        image={image}
                        index={index}
                        onOpen={() => openLightbox(lightboxIndex)}
                      />
                    );
                  })}
                </Grid>
              ) : null}

              {activeImages.length === 1 ? null : (
                <Flex justify="center" pt={{ base: 2, md: 4 }}>
                  {hasMore ? (
                    <CustomButton
                      title={`Show ${Math.min(remainingCount, GRID_BATCH)} more`}
                      onClick={() => setGridLimit((prev) => prev + GRID_BATCH)}
                      width="auto"
                    />
                  ) : gridImages.length > GRID_BATCH ? (
                    <Text fontSize="sm" color="secondary.700" opacity={0.6}>
                      All {activeImages.length} photos shown
                    </Text>
                  ) : null}
                </Flex>
              )}
            </VStack>
          )}
        </VStack>
      </Container>

      <GalleryLightbox
        isOpen={lightboxOpen}
        images={activeImages}
        selectedIndex={lightboxIndex}
        collectionLabel={activeAlbum?.label}
        onClose={closeLightbox}
        onSelect={setLightboxIndex}
      />
    </Box>
  );
};

export default GalleryCollections;
