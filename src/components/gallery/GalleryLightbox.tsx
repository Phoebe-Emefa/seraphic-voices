"use client";

import type { GalleryImage } from "@/lib/galleryDisplay";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, type ReactElement } from "react";
import { HiChevronLeft, HiChevronRight, HiXMark } from "react-icons/hi2";

const easeOut = [0.23, 1, 0.32, 1];

type GalleryLightboxProps = {
  isOpen: boolean;
  images: GalleryImage[];
  selectedIndex: number | null;
  collectionLabel?: string;
  onClose: () => void;
  onSelect: (index: number) => void;
};

function NavButton({
  label,
  onClick,
  disabled,
  icon,
  side,
}: {
  label: string;
  onClick: () => void;
  disabled: boolean;
  icon: ReactElement;
  side: "left" | "right";
}) {
  return (
    <IconButton
      aria-label={label}
      icon={icon}
      onClick={onClick}
      isDisabled={disabled}
      position="absolute"
      top="50%"
      transform="translateY(-50%)"
      left={side === "left" ? { base: 2, md: 3 } : undefined}
      right={side === "right" ? { base: 2, md: 3 } : undefined}
      zIndex={3}
      size="lg"
      borderRadius="full"
      bg="rgba(255, 255, 255, 0.92)"
      color="secondary.700"
      border="1px solid"
      borderColor="whiteAlpha.800"
      boxShadow="0 12px 32px -8px rgba(4, 25, 68, 0.35)"
      _hover={{ bg: "white", transform: "translateY(-50%) scale(1.04)" }}
      _active={{ transform: "translateY(-50%) scale(0.97)" }}
      _disabled={{
        opacity: 0.25,
        cursor: "not-allowed",
        transform: "translateY(-50%)",
        _hover: { bg: "rgba(255, 255, 255, 0.92)", transform: "translateY(-50%)" },
      }}
      transition="transform 0.2s ease, background 0.2s ease"
    />
  );
}

const GalleryLightbox = ({
  isOpen,
  images,
  selectedIndex,
  collectionLabel,
  onClose,
  onSelect,
}: GalleryLightboxProps) => {
  const reduceMotion = useReducedMotion();
  const thumbStripRef = useRef<HTMLDivElement>(null);
  const active = selectedIndex ?? 0;
  const current = images[active];
  const hasPrev = active > 0;
  const hasNext = active < images.length - 1;
  const hasThumbs = images.length > 1;

  const goPrev = useCallback(() => {
    if (hasPrev) onSelect(active - 1);
  }, [active, hasPrev, onSelect]);

  const goNext = useCallback(() => {
    if (hasNext) onSelect(active + 1);
  }, [active, hasNext, onSelect]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, goPrev, goNext, onClose]);

  useEffect(() => {
    if (!isOpen || !thumbStripRef.current) return;
    const activeThumb = thumbStripRef.current.querySelector(`[data-index="${active}"]`);
    activeThumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active, isOpen]);

  if (!current) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      isCentered
      motionPreset="none"
      blockScrollOnMount
    >
      <ModalOverlay
        bg="rgba(4, 18, 48, 0.94)"
        backdropFilter="blur(14px)"
        onClick={onClose}
      />
      <ModalContent
        bg="transparent"
        boxShadow="none"
        m={0}
        maxW="100vw"
        w="100vw"
        h="100dvh"
        maxH="100dvh"
        borderRadius={0}
        onClick={(event) => event.stopPropagation()}
      >
        <ModalBody
          p={0}
          h="100dvh"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          {/* Slim header */}
          <Flex
            align="center"
            justify="space-between"
            px={{ base: 3, md: 6 }}
            py={{ base: 3, md: 4 }}
            flexShrink={0}
            zIndex={4}
          >
            {hasThumbs ? (
              <HStack
                spacing={2}
                px={3}
                py={1.5}
                borderRadius="full"
                bg="rgba(255, 255, 255, 0.08)"
                border="1px solid"
                borderColor="whiteAlpha.200"
              >
                <Text fontSize="sm" fontWeight="bold" color="white" letterSpacing="0.06em">
                  {String(active + 1).padStart(2, "0")}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.500" fontWeight="medium">/</Text>
                <Text fontSize="sm" fontWeight="semibold" color="whiteAlpha.600" letterSpacing="0.06em">
                  {String(images.length).padStart(2, "0")}
                </Text>
              </HStack>
            ) : (
              <Box />
            )}

            <IconButton
              aria-label="Close gallery"
              icon={<HiXMark />}
              onClick={onClose}
              size="lg"
              borderRadius="full"
              bg="rgba(255, 255, 255, 0.1)"
              color="white"
              border="1px solid"
              borderColor="whiteAlpha.250"
              _hover={{ bg: "rgba(255, 255, 255, 0.18)" }}
              _active={{ transform: "scale(0.97)" }}
            />
          </Flex>

          {/* Image stage — fills all remaining viewport height */}
          <Box flex={1} position="relative" minH={0} minW={0} w="full">
            <Box
              position="absolute"
              inset={0}
              display="flex"
              alignItems="center"
              justifyContent="center"
              px={{ base: 11, md: 14 }}
              pb={hasThumbs ? { base: "7.5rem", md: "8.5rem" } : { base: "5rem", md: "6rem" }}
              pt={1}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current._id || current.url}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.99 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.28, ease: easeOut }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Image
                    src={current.url}
                    alt={current.alt}
                    maxH="100%"
                    maxW="100%"
                    w="auto"
                    h="auto"
                    objectFit="contain"
                    borderRadius={{ base: "sm", md: "md" }}
                    boxShadow="0 40px 80px -24px rgba(0, 0, 0, 0.55)"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </Box>

            {/* Caption — overlaid, does not steal layout height */}
            <Box
              position="absolute"
              left={{ base: 3, md: 6 }}
              right={{ base: 3, md: 6 }}
              bottom={hasThumbs ? { base: "4.5rem", md: "5rem" } : { base: 3, md: 4 }}
              zIndex={2}
              px={{ base: 4, md: 5 }}
              py={{ base: 3, md: 4 }}
              borderRadius={{ base: "lg", md: "xl" }}
              bg="rgba(4, 25, 68, 0.72)"
              border="1px solid"
              borderColor="whiteAlpha.150"
              backdropFilter="blur(16px)"
              maxW="56rem"
              mx="auto"
            >
              {collectionLabel ? (
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color="secondary.500"
                  mb={1.5}
                >
                  {collectionLabel}
                </Text>
              ) : null}
              <Box w="1.75rem" h="2px" bg="secondary.500" mb={2} />
              <Text
                color="white"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="semibold"
                lineHeight={1.45}
                noOfLines={2}
                sx={{ textWrap: "pretty" }}
              >
                {current.caption || current.alt}
              </Text>
            </Box>

            {/* Thumbnail strip — overlaid at bottom */}
            {hasThumbs ? (
              <Flex
                ref={thumbStripRef}
                position="absolute"
                left={0}
                right={0}
                bottom={{ base: 2, md: 3 }}
                zIndex={2}
                gap={2}
                px={{ base: 3, md: 6 }}
                overflowX="auto"
                justify="center"
                sx={{
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                  scrollSnapType: "x proximity",
                }}
              >
                {images.map((image, index) => {
                  const isActive = index === active;

                  return (
                    <Box
                      key={image._id || `${image.url}-${index}`}
                      as="button"
                      type="button"
                      data-index={index}
                      onClick={() => onSelect(index)}
                      aria-label={`View image ${index + 1}`}
                      aria-current={isActive}
                      flexShrink={0}
                      w={{ base: "2.75rem", md: "3.25rem" }}
                      h={{ base: "2.75rem", md: "3.25rem" }}
                      borderRadius="md"
                      overflow="hidden"
                      scrollSnapAlign="center"
                      border="2px solid"
                      borderColor={isActive ? "secondary.500" : "whiteAlpha.300"}
                      opacity={isActive ? 1 : 0.5}
                      transform={isActive ? "scale(1.08)" : "scale(1)"}
                      transition="opacity 0.2s ease, transform 0.2s ease, border-color 0.2s ease"
                      _hover={{ opacity: 1 }}
                    >
                      <Image
                        src={image.url}
                        alt=""
                        w="full"
                        h="full"
                        objectFit="cover"
                        objectPosition="center"
                        draggable={false}
                      />
                    </Box>
                  );
                })}
              </Flex>
            ) : null}

            {hasThumbs ? (
              <>
                <NavButton
                  label="Previous image"
                  icon={<HiChevronLeft />}
                  onClick={goPrev}
                  disabled={!hasPrev}
                  side="left"
                />
                <NavButton
                  label="Next image"
                  icon={<HiChevronRight />}
                  onClick={goNext}
                  disabled={!hasNext}
                  side="right"
                />
              </>
            ) : null}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GalleryLightbox;
