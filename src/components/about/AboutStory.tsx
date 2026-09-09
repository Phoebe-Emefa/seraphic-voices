"use client";

import AboutStorySkeleton from "@/components/about/skeletons/AboutStorySkeleton";
import { useWhoWeAre } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { resolveAboutStory, type StoryImage } from "@/lib/aboutUsContent";
import {
  normalizeStoryCopy,
  promoteStoryIntro,
  splitClosingLines,
  splitStoryLayout,
} from "@/lib/storyText";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.23, 1, 0.32, 1];
const motionFill = { width: "100%", minWidth: 0, maxWidth: "100%" } as const;

type StoryImagePanelProps = {
  image: StoryImage;
  priority?: boolean;
  delay?: number;
};

function StoryImagePanel({ image, priority, delay = 0 }: StoryImagePanelProps) {
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
          src={image.url}
          alt={image.alt}
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

function StoryParagraph({
  children,
  variant = "body",
  delay = 0,
}: {
  children: string;
  variant?: "lead" | "intro" | "body";
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  const fontSize =
    variant === "lead"
      ? { base: "md", sm: "lg", md: "2xl" }
      : variant === "intro"
        ? { base: "md", sm: "lg", md: "xl" }
        : { base: "md", sm: "md", lg: "md" };

  const color = "secondary.700";
  const fontWeight = variant === "body" ? "normal" : "medium";
  const opacity = variant === "body" ? 0.9 : 1;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay, ease: easeOut }}
      style={motionFill}
    >
      <Text
        as="p"
        fontSize={fontSize}
        color={color}
        opacity={opacity}
        fontWeight={fontWeight}
        lineHeight={variant === "body" ? { base: 1.75, md: 1.82 } : { base: 1.55, md: 1.42 }}
        letterSpacing={variant === "body" ? "normal" : "-0.015em"}
        w="full"
        maxW="100%"
        overflowWrap="break-word"
        sx={{ textWrap: "pretty" }}
      >
        {children}
      </Text>
    </motion.div>
  );
}

function StoryTextColumn({
  paragraphs,
  lead,
  intro,
  closing,
  startDelay = 0,
}: {
  paragraphs: string[];
  lead?: string;
  intro?: string | null;
  closing?: string | null;
  startDelay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const closingLines = closing ? splitClosingLines(closing) : [];

  return (
    <VStack align="stretch" spacing={{ base: 4, md: 6 }} w="full" minW={0} maxW="100%">
      {lead ? <StoryParagraph variant="lead">{lead}</StoryParagraph> : null}
      {intro ? <StoryParagraph variant="intro">{intro}</StoryParagraph> : null}
      {paragraphs.map((paragraph, index) => (
        <StoryParagraph key={`${index}-${paragraph.slice(0, 20)}`} delay={startDelay + index * 0.03}>
          {paragraph}
        </StoryParagraph>
      ))}
      {closingLines.length > 0 ? (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: startDelay + 0.1, ease: easeOut }}
          style={motionFill}
        >
          <VStack align="flex-start" spacing={{ base: 3, md: 4 }} w="full" minW={0} maxW="100%" pt={{ base: 2, md: 4 }}>
            <Box w={{ base: "2.5rem", md: "3rem" }} h="2px" bg="secondary.500" />
            {closingLines.map((line) => (
              <Text
                key={line}
                fontSize={{ base: "md", sm: "lg", md: "xl" }}
                color="secondary.700"
                fontWeight="semibold"
                lineHeight={1.45}
                fontStyle="italic"
                letterSpacing="-0.015em"
                maxW="100%"
                overflowWrap="break-word"
                sx={{ textWrap: "balance" }}
              >
                {line}
              </Text>
            ))}
          </VStack>
        </motion.div>
      ) : null}
    </VStack>
  );
}

const AboutStory = () => {
  const whoWeAreQuery = useWhoWeAre();
  const { data } = whoWeAreQuery;
  const content = data?.[0];
  if (isCmsLoading(whoWeAreQuery)) {
    return <AboutStorySkeleton />;
  }

  const story = resolveAboutStory(content);
  const { lead, body, closing } = normalizeStoryCopy(story.paragraphs);
  const { intro, rest } = promoteStoryIntro(body);
  const { besideFirst, fullWidth, besideSecond } = splitStoryLayout(rest);
  const [imageA, imageB] = story.images;

  const showSecondSection = Boolean(imageB || besideSecond.length > 0 || closing);

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

          {/* Section 1: opening copy + hero image */}
          <Grid
            templateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(0, 1fr) minmax(0, 1fr)" }}
            gap={{ base: 6, md: 10, lg: 12 }}
            alignItems={{ lg: "stretch" }}
            w="full"
            minW={0}
          >
            <GridItem display="flex" alignItems="center" order={{ base: 2, lg: 1 }} minW={0} w="full">
              <StoryTextColumn lead={lead} intro={intro} paragraphs={besideFirst} />
            </GridItem>
            {imageA ? (
              <GridItem order={{ base: 1, lg: 2 }} minH={{ lg: "28rem" }} minW={0} w="full">
                <StoryImagePanel image={imageA} priority />
              </GridItem>
            ) : null}
          </Grid>

          {/* Full-width break */}
          {fullWidth.length > 0 ? (
            <Box
              w="full"
              minW={0}
              py={{ base: 4, md: 8 }}
              borderTop="1px solid"
              borderBottom="1px solid"
              borderColor="blackAlpha.100"
            >
              <VStack align="stretch" spacing={{ base: 4, md: 6 }} w="full" minW={0}>
                {fullWidth.map((paragraph, index) => (
                  <StoryParagraph key={`full-${index}`} variant="body" delay={index * 0.04}>
                    {paragraph}
                  </StoryParagraph>
                ))}
              </VStack>
            </Box>
          ) : null}

          {/* Section 2: image + closing copy */}
          {showSecondSection ? (
            <Grid
              templateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(0, 1fr) minmax(0, 1fr)" }}
              gap={{ base: 6, md: 10, lg: 12 }}
              alignItems={{ lg: "stretch" }}
              w="full"
              minW={0}
            >
              {imageB ? (
                <GridItem order={{ base: 1, lg: 1 }} minH={{ lg: "24rem" }} minW={0} w="full">
                  <StoryImagePanel image={imageB} delay={0.05} />
                </GridItem>
              ) : null}
              <GridItem
                order={{ base: 2, lg: 2 }}
                display="flex"
                alignItems="center"
                minW={0}
                w="full"
                gridColumn={!imageB ? { lg: "1 / -1" } : undefined}
              >
                <StoryTextColumn
                  paragraphs={besideSecond}
                  closing={closing}
                  startDelay={0.05}
                />
              </GridItem>
            </Grid>
          ) : null}
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutStory;
