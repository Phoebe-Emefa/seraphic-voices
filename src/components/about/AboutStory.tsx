"use client";

import AboutStorySkeleton from "@/components/about/skeletons/AboutStorySkeleton";
import { StoryPortableText, StoryTaglines } from "@/components/about/StoryPortableText";
import { useWhoWeArePage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { resolveAboutStory, type AboutStoryBlock } from "@/lib/aboutUsContent";
import { hasPortableText } from "@/lib/portableText";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.23, 1, 0.32, 1];
const motionFill = { width: "100%", minWidth: 0, maxWidth: "100%" } as const;

function StoryImagePanel({
  imageUrl,
  imageAlt,
  priority,
  delay = 0,
}: {
  imageUrl: string;
  imageAlt?: string;
  priority?: boolean;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      style={{ ...motionFill, height: "100%" }}
    >
      <Box
        position="relative"
        w="full"
        h="full"
        minH={{ base: "16rem", sm: "20rem", lg: "28rem" }}
        aspectRatio={{ base: "4/3", sm: "16/10", lg: "auto" }}
        borderRadius={{ base: "lg", md: "xl" }}
        overflow="hidden"
        bg="primary"
        boxShadow="0 24px 48px -20px rgba(4, 35, 92, 0.3)"
      >
        <Image
          src={imageUrl}
          alt={imageAlt || "Seraphic Voices of Toronto"}
          position="absolute"
          inset={0}
          w="full"
          h="full"
          objectFit="cover"
          objectPosition="center"
          loading={priority ? "eager" : "lazy"}
        />
        <Box
          position="absolute"
          inset={0}
          bg="linear-gradient(145deg, rgba(4, 25, 68, 0.06) 0%, rgba(4, 25, 68, 0.28) 100%)"
          pointerEvents="none"
        />
      </Box>
    </motion.div>
  );
}

function StorySplitBlock({
  block,
  imagePosition,
  priority,
  startDelay = 0,
}: {
  block: AboutStoryBlock;
  imagePosition: "left" | "right";
  priority?: boolean;
  startDelay?: number;
}) {
  const imageFirst = imagePosition === "left";
  const hasImage = Boolean(block.imageUrl);
  const hasContent = hasPortableText(block.content) || hasPortableText(block.taglines);

  if (!hasImage && !hasContent) {
    return null;
  }

  return (
    <Grid
      templateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(0, 1fr) minmax(0, 1fr)" }}
      gap={{ base: 6, md: 10, lg: 12 }}
      alignItems={{ lg: "stretch" }}
      w="full"
      minW={0}
    >
      {hasImage ? (
        <GridItem
          order={{ base: 1, lg: imageFirst ? 1 : 2 }}
          minH={{ lg: imageFirst ? "24rem" : "28rem" }}
          minW={0}
          w="full"
        >
          <StoryImagePanel
            imageUrl={block.imageUrl!}
            imageAlt={block.imageAlt}
            priority={priority}
            delay={startDelay}
          />
        </GridItem>
      ) : null}

      {hasContent ? (
        <GridItem
          order={{ base: 2, lg: imageFirst ? 2 : 1 }}
          display="flex"
          alignItems="center"
          minW={0}
          w="full"
          gridColumn={!hasImage ? { lg: "1 / -1" } : undefined}
        >
          <VStack align="stretch" spacing={{ base: 4, md: 6 }} w="full" minW={0} maxW="100%">
            <StoryPortableText value={block.content} startDelay={startDelay} />
            <StoryTaglines value={block.taglines} startDelay={startDelay + 0.1} />
          </VStack>
        </GridItem>
      ) : null}
    </Grid>
  );
}

function StoryFullWidthBlock({ block, startDelay = 0 }: { block: AboutStoryBlock; startDelay?: number }) {
  if (!hasPortableText(block.content)) {
    return null;
  }

  return (
    <Box
      w="full"
      minW={0}
      py={{ base: 4, md: 8 }}
      borderTop="1px solid"
      borderBottom="1px solid"
      borderColor="blackAlpha.100"
    >
      <VStack align="stretch" spacing={{ base: 4, md: 6 }} w="full" minW={0}>
        <StoryPortableText value={block.content} startDelay={startDelay} />
      </VStack>
    </Box>
  );
}

function StoryBlockRenderer({
  block,
  index,
}: {
  block: AboutStoryBlock;
  index: number;
}) {
  const startDelay = index * 0.05;

  switch (block.layout) {
    case "textImage":
      return (
        <StorySplitBlock
          block={block}
          imagePosition="right"
          priority={index === 0}
          startDelay={startDelay}
        />
      );
    case "imageText":
      return (
        <StorySplitBlock
          block={block}
          imagePosition="left"
          startDelay={startDelay}
        />
      );
    case "fullWidth":
      return <StoryFullWidthBlock block={block} startDelay={startDelay} />;
    default:
      return null;
  }
}

const AboutStory = () => {
  const pageQuery = useWhoWeArePage();

  if (isCmsLoading(pageQuery)) {
    return <AboutStorySkeleton />;
  }

  const story = resolveAboutStory(pageQuery.data);

  if (!story) {
    return null;
  }

  return (
    <Box
      as="section"
      aria-labelledby="about-story-heading"
      bg="secondary.100"
      py={{ base: 10, sm: 14, md: 24 }}
      position="relative"
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 4, sm: 6, md: 8, xl: 12 }}
        position="relative"
        w="full"
        minW={0}
      >
        <VStack align="stretch" spacing={{ base: 8, md: 16, lg: 20 }} w="full" minW={0}>
          {story.title ? (
            <Box w="full">
              <Heading
                as="h2"
                id="about-story-heading"
                fontSize={{ base: "2xl", sm: "3xl", md: "5xl" }}
                fontWeight="bold"
                color="secondary.700"
                lineHeight={1}
                letterSpacing="-0.03em"
              >
                {story.title}
              </Heading>
              <Box mt={5} w={{ base: "3.5rem", md: "4.5rem" }} h="3px" bg="secondary.500" />
            </Box>
          ) : null}

          {story.blocks.map((block, index) => (
            <StoryBlockRenderer key={`${block.layout}-${index}`} block={block} index={index} />
          ))}
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutStory;
