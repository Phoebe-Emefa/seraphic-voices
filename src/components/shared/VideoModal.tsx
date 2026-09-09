"use client";

import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import CustomButton from "@/components/shared/CustomButton";
import {
  buildYouTubeEmbedUrl,
  buildYouTubeWatchUrl,
  extractYouTubeId,
} from "@/lib/youtube";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

const LOAD_TIMEOUT_MS = 15000;

const VideoModal = ({ isOpen, onClose, title, url }: VideoModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [origin, setOrigin] = useState("");

  const cleanUrl = typeof url === "string" ? url.trim() : "";
  const videoId = useMemo(() => extractYouTubeId(cleanUrl), [cleanUrl]);
  const watchUrl = videoId ? buildYouTubeWatchUrl(videoId) : cleanUrl;

  const embedUrl = useMemo(() => {
    if (!videoId || !origin) return null;
    return buildYouTubeEmbedUrl(videoId, origin);
  }, [videoId, origin]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    if (!videoId) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    const timer = window.setTimeout(() => {
      setIsLoading((loading) => {
        if (loading) {
          setHasError(true);
          return false;
        }
        return loading;
      });
    }, LOAD_TIMEOUT_MS);

    return () => window.clearTimeout(timer);
  }, [isOpen, videoId]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const showPlayer = isOpen && videoId && embedUrl && !hasError;
  const isCentered = useBreakpointValue({ base: false, lg: true }) ?? false;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={isCentered}
      size={{ base: "full", lg: "6xl" }}
      motionPreset="scale"
    >
      <ModalOverlay bg="rgba(3, 15, 38, 0.88)" backdropFilter="blur(16px)" />
      <ModalContent
        bg="#041a42"
        color="white"
        borderRadius={{ base: 0, lg: "2xl" }}
        border={{ base: "none", lg: "1px solid" }}
        borderColor="whiteAlpha.200"
        boxShadow={{ base: "none", lg: "0 32px 80px -16px rgba(0, 0, 0, 0.6)" }}
        overflow="hidden"
        m={0}
        my={{ base: 0, lg: 8 }}
        h={{ base: "100dvh", lg: "auto" }}
        maxH={{ base: "100dvh", lg: "92vh" }}
        maxW={{ base: "100vw", lg: "min(94vw, 76rem)" }}
        display="flex"
        flexDirection="column"
      >
        <ModalHeader
          px={{ base: 4, sm: 6 }}
          py={4}
          borderBottom="1px solid"
          borderColor="whiteAlpha.150"
          bg="rgba(4, 25, 68, 0.6)"
        >
          <Flex justify="space-between" align="center" gap={4}>
            <VStack align="flex-start" spacing={0.5} maxW={{ base: "80%", sm: "85%" }}>
              <HStack spacing={2}>
                <Box w={1.5} h={1.5} borderRadius="full" bg="secondary.500" />
                <Text
                  fontSize="2xs"
                  fontWeight="bold"
                  letterSpacing="0.18em"
                  textTransform="uppercase"
                  color="whiteAlpha.700"
                >
                  Live Performance
                </Text>
              </HStack>
              <Heading
                as="h3"
                fontSize={{ base: "md", sm: "lg" }}
                fontWeight="bold"
                color="white"
                noOfLines={1}
              >
                {title}
              </Heading>
            </VStack>

            <IconButton
              aria-label="Close video player"
              icon={<IoCloseOutline />}
              variant="ghost"
              fontSize="2xl"
              color="whiteAlpha.800"
              borderRadius="full"
              _hover={{ bg: "whiteAlpha.200", color: "white" }}
              _active={{ transform: "scale(0.95)" }}
              onClick={onClose}
            />
          </Flex>
        </ModalHeader>

        <ModalBody
          p={0}
          position="relative"
          bg="black"
          flex="1"
          display="flex"
          flexDirection="column"
          minH={0}
        >
          <Box
            position="relative"
            w="full"
            flex={{ base: "1", lg: "unset" }}
            aspectRatio={{ base: "unset", lg: "16 / 9" }}
            minH={{ base: 0, lg: "28rem", xl: "34rem" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {isLoading && !hasError ? (
              <Flex
                position="absolute"
                inset={0}
                zIndex={2}
                direction="column"
                align="center"
                justify="center"
                bg="radial-gradient(circle, #052155 0%, #02112d 100%)"
                gap={3}
              >
                <Spinner
                  thickness="3px"
                  speed="0.8s"
                  emptyColor="whiteAlpha.200"
                  color="secondary.500"
                  size="xl"
                />
                <Text
                  fontSize="xs"
                  color="whiteAlpha.700"
                  letterSpacing="0.08em"
                  textTransform="uppercase"
                >
                  Loading performance...
                </Text>
              </Flex>
            ) : null}

            {hasError || !videoId ? (
              <Flex
                position="absolute"
                inset={0}
                zIndex={3}
                direction="column"
                align="center"
                justify="center"
                bg="#031433"
                p={6}
                textAlign="center"
                gap={4}
              >
                <Icon as={BsExclamationCircle} boxSize={10} color="secondary.500" />
                <VStack spacing={1} maxW="26rem">
                  <Heading as="h4" fontSize="md" color="white">
                    Video unavailable in player
                  </Heading>
                  <Text fontSize="xs" color="whiteAlpha.700">
                    This recording can be viewed directly on our official YouTube channel.
                  </Text>
                </VStack>
                {watchUrl ? (
                  <CustomButton
                    title="Watch on YouTube"
                    href={watchUrl}
                    width="13rem"
                    height="3rem"
                    fontSize="sm"
                  />
                ) : null}
              </Flex>
            ) : null}

            {showPlayer ? (
              <Box
                as="iframe"
                key={embedUrl}
                src={embedUrl}
                title={title}
                position="absolute"
                inset={0}
                w="full"
                h="full"
                border="none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
                onLoad={handleIframeLoad}
              />
            ) : null}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default VideoModal;
