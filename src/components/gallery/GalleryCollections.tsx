"use client";

import SectionEyebrow from "@/components/about/SectionEyebrow";
import GalleryAlbumPicker from "@/components/gallery/GalleryAlbumPicker";
import GalleryFeatured from "@/components/gallery/GalleryFeatured";
import GalleryGridSkeleton from "@/components/gallery/skeletons/GalleryGridSkeleton";
import GalleryCollectionsSkeleton from "@/components/gallery/skeletons/GalleryCollectionsSkeleton";
import GalleryImageTile from "@/components/gallery/GalleryImageTile";
import GalleryLightbox from "@/components/gallery/GalleryLightbox";
import CustomButton from "@/components/shared/CustomButton";
import { useGalleryPage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import type { GalleryAlbum } from "@/lib/galleryDisplay";
import { normalizeGalleryPageData, resolveGalleryListing } from "@/lib/galleryPageContent";
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
  const pageQuery = useGalleryPage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [gridLimit, setGridLimit] = useState(GRID_BATCH);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const listing = useMemo(() => {
    const { page } = normalizeGalleryPageData(pageQuery.data?.page);
    return resolveGalleryListing(page);
  }, [pageQuery.data]);

  const albums = listing?.albums ?? [];

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

  if (isCmsLoading(pageQuery)) {
    return <GalleryCollectionsSkeleton />;
  }

  if (!listing || albums.length === 0) {
    return null;
  }

  const activeAlbum: GalleryAlbum | undefined = albums[activeIndex];
  const featuredImage = activeAlbum?.cover;
  const gridImages = activeAlbum?.images ?? [];
  const lightboxImages = featuredImage ? [featuredImage, ...gridImages] : gridImages;
  const visibleGridImages = gridImages.slice(0, gridLimit);
  const hasMore = gridImages.length > gridLimit;
  const remainingCount = gridImages.length - gridLimit;
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
          {listing.eyebrow || listing.intro ? (
            <VStack align="flex-start" spacing={4} maxW="40rem">
              {listing.eyebrow ? <SectionEyebrow label={listing.eyebrow} /> : null}
              {listing.intro ? (
                <Text
                  id="gallery-collections-heading"
                  fontSize={{ base: "md", md: "lg" }}
                  color="secondary.700"
                  opacity={0.9}
                  lineHeight={1.75}
                  sx={{ textWrap: "pretty" }}
                >
                  {listing.intro}
                </Text>
              ) : null}
            </VStack>
          ) : null}

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
                    const lightboxIndex = featuredImage ? index + 1 : index;

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

              {gridImages.length === 0 ? null : (
                <Flex justify="center" pt={{ base: 2, md: 4 }}>
                  {hasMore ? (
                    <CustomButton
                      title={`Show ${Math.min(remainingCount, GRID_BATCH)} more`}
                      onClick={() => setGridLimit((prev) => prev + GRID_BATCH)}
                      width="auto"
                    />
                  ) : gridImages.length > GRID_BATCH ? (
                    <Text fontSize="sm" color="secondary.700" opacity={0.6}>
                      All {gridImages.length} photos shown
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
        images={lightboxImages}
        selectedIndex={lightboxIndex}
        collectionLabel={activeAlbum?.label}
        onClose={closeLightbox}
        onSelect={setLightboxIndex}
      />
    </Box>
  );
};

export default GalleryCollections;
