"use client";

import CustomButton from "@/components/shared/CustomButton";
import EventDetailsModal from "@/components/shared/EventDetailsModal";
import HeroCinematicPhoto from "@/components/home/Hero/HeroCinematicPhoto";
import { useHeroNav } from "@/components/home/Hero/HeroNavContext";
import { EventDetail } from "@/lib/eventDisplay";
import { Box, Flex, Heading, HStack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { buildHeroSlides } from "./buildHeroSlides";

const AUTOPLAY_MS = 6000;
const SWIPE_THRESHOLD = 48;

function EditorialCounter({
  count,
  active,
  onSelect,
}: {
  count: number;
  active: number;
  onSelect: (index: number) => void;
}) {
  return (
    <HStack
      spacing={{ base: 1.5, sm: 2, md: 3 }}
      align="center"
      px={{ base: 2.5, sm: 3, md: 4 }}
      py={{ base: 1, sm: 1.5, md: 2 }}
      borderRadius="full"
      bg="rgba(4, 25, 68, 0.6)"
      backdropFilter="blur(16px)"
      border="1px solid"
      borderColor="whiteAlpha.300"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
    >
      <Text
        fontSize={{ base: "xs", md: "sm" }}
        color="white"
        fontWeight="700"
        letterSpacing="0.08em"
      >
        {String(active + 1).padStart(2, "0")}
      </Text>
      <HStack spacing={{ base: 1, md: 1.5 }}>
        {Array.from({ length: count }).map((_, index) => {
          const isActive = index === active;
          return (
            <Box
              key={index}
              as="button"
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => onSelect(index)}
              h={{ base: "3.5px", md: "5px" }}
              w={isActive ? { base: "16px", md: "28px" } : { base: "5px", md: "8px" }}
              borderRadius="full"
              bg={isActive ? "white" : "whiteAlpha.400"}
              boxShadow={isActive ? "0 0 10px rgba(255, 255, 255, 0.7)" : "none"}
              transition="all 300ms cubic-bezier(0.4, 0, 0.2, 1)"
              cursor="pointer"
              _hover={{ bg: "whiteAlpha.900", transform: "scaleY(1.3)" }}
            />
          );
        })}
      </HStack>
      <Text
        fontSize={{ base: "xs", md: "sm" }}
        color="whiteAlpha.600"
        fontWeight="600"
      >
        {String(count).padStart(2, "0")}
      </Text>
    </HStack>
  );
}

const GallerySpotlight = ({
  content,
  featuredEvent,
}: {
  content: any;
  featuredEvent?: any;
}) => {
  const heroNav = useHeroNav();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalEvent, setModalEvent] = useState<EventDetail | null>(null);
  const slides = buildHeroSlides(content, featuredEvent);
  const [active, setActive] = useState(0);
  const [isHoveringControls, setIsHoveringControls] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const safeActive = slides.length ? Math.min(active, slides.length - 1) : 0;

  useEffect(() => {
    if (!heroNav) return;
    heroNav.setTheme("immersive");
  }, [heroNav]);

  const goTo = useCallback(
    (index: number) => {
      if (!slides.length) return;
      setActive(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length],
  );

  const goNext = useCallback(() => {
    if (!slides.length) return;
    setActive((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goPrev = useCallback(() => {
    if (!slides.length) return;
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (active >= slides.length && slides.length > 0) {
      setActive(0);
    }
  }, [active, slides.length]);

  useEffect(() => {
    if (slides.length <= 1 || isHoveringControls) return;
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [slides.length, isHoveringControls]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      if (delta < 0) goNext();
      else goPrev();
    }
    touchStartX.current = null;
  };

  if (!slides.length) {
    return (
      <VStack justify="center" px={6} py={16} pt={24} textAlign="center" spacing={4} minH="50vh">
        <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} color="secondary.700">
          {content?.title || "Seraphic Voices of Toronto"}
        </Heading>
        <Text fontSize={{ base: "md", md: "xl" }} maxW="40ch" color="text">
          {content?.description}
        </Text>
        <CustomButton title="Who we are" href="/about-us" />
      </VStack>
    );
  }

  return (
    <Box
      w="full"
      h="full"
      position="relative"
      bg="primary"
      overflow="hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-live="polite"
    >
      {/* Slides Container */}
      <Box position="absolute" inset={0} overflow="hidden">
        {slides.map((slide, index) => {
          const isActive = index === safeActive;
          return (
            <Box
              key={slide.id}
              position="absolute"
              inset={0}
              opacity={isActive ? 1 : 0}
              visibility={isActive ? "visible" : "hidden"}
              pointerEvents={isActive ? "auto" : "none"}
              transition="opacity 700ms cubic-bezier(0.4, 0, 0.2, 1), visibility 700ms ease"
              zIndex={isActive ? 1 : 0}
            >
              <HeroCinematicPhoto
                imageUrl={slide.imageUrl}
                imageAlt={slide.imageAlt}
                objectPosition={slide.objectPosition}
                title={slide.title}
                description={slide.description}
                ctaTitle={slide.ctaTitle}
                ctaHref={slide.event ? undefined : slide.ctaHref}
                ctaOnClick={
                  slide.event
                    ? () => {
                        setModalEvent(slide.event as EventDetail);
                        onOpen();
                      }
                    : undefined
                }
              />
            </Box>
          );
        })}
      </Box>

      {/* Slide track — bottom right on mobile, upper right on md+ */}
      {slides.length > 1 ? (
        <Flex
          position="absolute"
          top={{ base: "auto", md: "6rem" }}
          bottom={{ base: 5, md: "auto" }}
          right={{ base: 4, sm: 6, md: 8, xl: 12 }}
          zIndex={10}
          onMouseEnter={() => setIsHoveringControls(true)}
          onMouseLeave={() => setIsHoveringControls(false)}
        >
          <EditorialCounter
            count={slides.length}
            active={safeActive}
            onSelect={goTo}
          />
        </Flex>
      ) : null}

      <EventDetailsModal isOpen={isOpen} onClose={onClose} event={modalEvent} />
    </Box>
  );
};

export default GallerySpotlight;
