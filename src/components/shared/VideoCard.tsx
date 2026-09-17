"use client";

import VideoModal from "@/components/shared/VideoModal";
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { BsArrowRight, BsPlayFill } from "react-icons/bs";
import { httpsUrl } from "@/lib/httpsUrl";
import {
  buildYouTubeThumbnailUrl,
  extractYouTubeId,
  isYouTubeThumbnailPlaceholder,
  YOUTUBE_THUMBNAIL_PLACEHOLDER_MAX_WIDTH,
  youtubeThumbnailFallback,
} from "@/lib/youtube";

interface VideoCardProps {
  title: string;
  image: string;
  url: string;
}

const VideoCard = ({ title, image, url }: VideoCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const safeUrl = httpsUrl(url) || url;
  const videoId = safeUrl ? extractYouTubeId(safeUrl) : null;
  const isPlayable = Boolean(videoId);
  const [thumbSrc, setThumbSrc] = useState(image);

  useEffect(() => {
    setThumbSrc(image);
  }, [image]);

  const handlePlay = () => {
    if (isPlayable) onOpen();
  };

  const advanceThumbnail = useCallback(() => {
    setThumbSrc((current) => {
      const fallback = youtubeThumbnailFallback(current);
      return fallback && fallback !== current ? fallback : current;
    });
  }, []);

  const handleThumbLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (isYouTubeThumbnailPlaceholder(event.currentTarget)) {
      advanceThumbnail();
    }
  };

  useEffect(() => {
    if (!videoId) return;

    const maxUrl = buildYouTubeThumbnailUrl(videoId, "max");
    const probe = new window.Image();

    const handleProbeLoad = () => {
      if (probe.naturalWidth > YOUTUBE_THUMBNAIL_PLACEHOLDER_MAX_WIDTH) {
        setThumbSrc(maxUrl);
      }
    };

    probe.addEventListener("load", handleProbeLoad);
    probe.addEventListener("error", () => {});
    probe.src = maxUrl;

    return () => {
      probe.removeEventListener("load", handleProbeLoad);
      probe.src = "";
    };
  }, [videoId]);

  return (
    <>
      <Box
        as="article"
        role="group"
        position="relative"
        w="full"
        h={{ base: "22rem", sm: "24rem", md: "26rem", lg: "28rem" }}
        borderRadius={{ base: "xl", md: "2xl" }}
        overflow="hidden"
        bg="primary"
        boxShadow="0 20px 50px -12px rgba(4, 35, 92, 0.22), 0 8px 20px -6px rgba(4, 35, 92, 0.1)"
        border="1px solid"
        borderColor="rgba(255, 255, 255, 0.14)"
        cursor={isPlayable ? "pointer" : "default"}
        onClick={handlePlay}
        transition="transform 300ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 300ms cubic-bezier(0.23, 1, 0.32, 1), border-color 300ms ease"
        _hover={
          isPlayable
            ? {
                transform: "translateY(-6px)",
                boxShadow: "0 30px 70px -16px rgba(4, 35, 92, 0.35), 0 12px 28px -6px rgba(4, 35, 92, 0.15)",
                borderColor: "rgba(255, 255, 255, 0.3)",
              }
            : undefined
        }
        _active={isPlayable ? { transform: "scale(0.985)" } : undefined}
        tabIndex={isPlayable ? 0 : -1}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (!isPlayable) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        aria-label={isPlayable ? `Watch performance: ${title}` : `${title} — video unavailable`}
        aria-disabled={!isPlayable}
      >
        {/* Background image — 16:9 thumbnails (maxres/mq) fill edge-to-edge */}
        <Image
          src={thumbSrc}
          alt={title}
          position="absolute"
          inset={0}
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center top"
          transition="transform 600ms cubic-bezier(0.23, 1, 0.32, 1)"
          _groupHover={{
            transform: "scale(1.06)",
          }}
          onError={advanceThumbnail}
          onLoad={handleThumbLoad}
        />

        {/* Deep Bottom Cinematic Scrim */}
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(to top, rgba(3, 16, 44, 0.96) 0%, rgba(3, 16, 44, 0.75) 38%, rgba(4, 25, 68, 0.2) 68%, transparent 100%)"
          pointerEvents="none"
        />

        {/* Floating Category Pill */}
        <Box position="absolute" top={{ base: 4, md: 5 }} left={{ base: 4, md: 5 }} zIndex={2}>
          <HStack
            spacing={2}
            px={3}
            py={1}
            borderRadius="full"
            bg="rgba(4, 25, 68, 0.65)"
            backdropFilter="blur(12px)"
            border="1px solid"
            borderColor="whiteAlpha.300"
            boxShadow="0 4px 16px rgba(0, 0, 0, 0.2)"
          >
            <Box w={1.5} h={1.5} borderRadius="full" bg="secondary.500" />
            <Text
              fontSize="2xs"
              fontWeight="bold"
              letterSpacing="0.16em"
              textTransform="uppercase"
              color="whiteAlpha.900"
            >
              Performance
            </Text>
          </HStack>
        </Box>

        {/* Center Hover-Activated Glass Play Trigger */}
        <Flex
          position="absolute"
          top="42%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={2}
          align="center"
          justify="center"
          pointerEvents="none"
        >
          <Flex
            w={{ base: 14, sm: 16 }}
            h={{ base: 14, sm: 16 }}
            borderRadius="full"
            align="center"
            justify="center"
            bg="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(16px)"
            border="1.5px solid"
            borderColor="whiteAlpha.600"
            color="white"
            boxShadow="0 12px 36px rgba(0, 0, 0, 0.35)"
            transition="all 300ms cubic-bezier(0.23, 1, 0.32, 1)"
            _groupHover={{
              transform: "scale(1.15)",
              bg: "white",
              color: "primary",
              borderColor: "white",
              boxShadow: "0 16px 40px rgba(0, 0, 0, 0.45)",
            }}
          >
            <Icon as={BsPlayFill} boxSize={{ base: 8, sm: 9 }} ml={0.5} />
          </Flex>
        </Flex>

        {/* Docked Editorial Content Footer */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          p={{ base: 5, sm: 6 }}
          zIndex={2}
        >
          <VStack align="flex-start" spacing={2.5}>
            <Heading
              as="h3"
              fontSize={{ base: "lg", sm: "xl", md: "1.35rem" }}
              fontWeight="bold"
              color="white"
              lineHeight={1.25}
              letterSpacing="-0.015em"
              textShadow="0 2px 12px rgba(0, 0, 0, 0.5)"
              noOfLines={2}
            >
              {title}
            </Heading>

            <HStack
              spacing={2}
              color="secondary.500"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="0.1em"
              textTransform="uppercase"
              transition="color 200ms ease"
            >
              <Text>Watch performance</Text>
              <Icon
                as={BsArrowRight}
                boxSize={4}
                transition="transform 240ms ease"
                _groupHover={{ transform: "translateX(4px)" }}
              />
            </HStack>
          </VStack>
        </Box>
      </Box>

      {isPlayable && safeUrl ? (
        <VideoModal
          isOpen={isOpen}
          onClose={onClose}
          title={title}
          url={safeUrl}
        />
      ) : null}
    </>
  );
};

export default VideoCard;
