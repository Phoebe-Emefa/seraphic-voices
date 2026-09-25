"use client";

import SectionEyebrow from "@/components/about/SectionEyebrow";
import AboutMissionSkeleton from "@/components/about/skeletons/AboutMissionSkeleton";
import { useWhoWeArePage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { resolveAboutMission } from "@/lib/aboutUsContent";
import { splitPillarBody } from "@/lib/missionText";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineHeart, HiOutlineMusicalNote, HiOutlineSparkles } from "react-icons/hi2";

const easeOut = [0.23, 1, 0.32, 1];
const pillarIcons = [HiOutlineHeart, HiOutlineMusicalNote, HiOutlineSparkles];

function MissionLine({ children, index }: { children: string; index: number }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: easeOut }}
    >
      <Text
        as="p"
        fontSize={{ base: "md", sm: "lg", md: "2xl", lg: "2.25xl" }}
        color="white"
        fontWeight="medium"
        lineHeight={{ base: 1.45, md: 1.35 }}
        letterSpacing="-0.02em"
        sx={{ textWrap: "balance" }}
      >
        {children}
      </Text>
    </motion.div>
  );
}

function PillarCard({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const lines = splitPillarBody(body);
  const IconComponent = pillarIcons[index];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: easeOut }}
      style={{ height: "100%" }}
    >
      <VStack
        align="stretch"
        spacing={{ base: 4, md: 5 }}
        h="full"
        p={{ base: 4, sm: 5, md: 6, lg: 7 }}
        borderRadius="xl"
        bg="whiteAlpha.100"
        border="1px solid"
        borderColor="whiteAlpha.200"
        sx={{
          "@supports (backdrop-filter: blur(12px))": {
            backdropFilter: "blur(12px)",
          },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap={4}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="2.75rem"
            h="2.75rem"
            borderRadius="full"
            bg="whiteAlpha.150"
            color="secondary.500"
            flexShrink={0}
          >
            <Icon as={IconComponent} boxSize={5} />
          </Box>
          <Text
            fontSize="xs"
            fontWeight="bold"
            letterSpacing="0.22em"
            color="secondary.500"
          >
            0{index + 1}
          </Text>
        </Box>

        <Text
          as="h3"
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="bold"
          color="white"
          letterSpacing="-0.01em"
        >
          {title}
        </Text>

        <VStack align="stretch" spacing={3} flex={1}>
          {lines.map((line) => (
            <Text
              key={line}
              fontSize={{ base: "sm", md: "md" }}
              color="whiteAlpha.800"
              lineHeight={1.75}
              sx={{ textWrap: "pretty" }}
            >
              {line}
            </Text>
          ))}
        </VStack>
      </VStack>
    </motion.div>
  );
}

const AboutMission = () => {
  const pageQuery = useWhoWeArePage();

  if (isCmsLoading(pageQuery)) {
    return <AboutMissionSkeleton />;
  }

  const mission = resolveAboutMission(pageQuery.data);

  if (!mission) {
    return null;
  }

  return (
    <Box
      as="section"
      aria-labelledby="about-mission-heading"
      bg="secondary.100"
      py={{ base: 10, sm: 16, md: 24 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 4, sm: 6, md: 8, xl: 12 }}
      >
        <VStack spacing={{ base: 6, md: 10 }} align="stretch">
          <SectionEyebrow label={mission.eyebrow} />

          <Box
            borderRadius={{ base: "xl", md: "2xl" }}
            overflow="hidden"
            bg="linear-gradient(145deg, #041a42 0%, #052155 48%, #031433 100%)"
            border="1px solid"
            borderColor="whiteAlpha.200"
            boxShadow="0 32px 72px -28px rgba(4, 35, 92, 0.45)"
            p={{ base: 5, sm: 7, md: 10, lg: 12 }}
            position="relative"
          >
            <Box
              position="absolute"
              top="-4rem"
              right="-4rem"
              w="16rem"
              h="16rem"
              borderRadius="full"
              bg="secondary.500"
              opacity={0.07}
              pointerEvents="none"
              aria-hidden
            />

            <Grid
              templateColumns={{ base: "1fr", lg: "1.15fr 0.85fr" }}
              gap={{ base: 6, lg: 12 }}
              alignItems="start"
              mb={{ base: 6, md: 12 }}
            >
              <GridItem>
                <Text
                  id="about-mission-heading"
                  as="h2"
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  color="secondary.500"
                  mb={{ base: 4, md: 6 }}
                >
                  Our purpose
                </Text>
                <VStack align="stretch" spacing={{ base: 3, md: 5 }}>
                  {mission.statementLines.map((line, index) => (
                    <MissionLine key={line} index={index}>
                      {line}
                    </MissionLine>
                  ))}
                </VStack>
              </GridItem>

              <GridItem
                display={{ base: "none", lg: "flex" }}
                alignItems="center"
                justifyContent="center"
                borderLeft="1px solid"
                borderColor="whiteAlpha.150"
                pl={10}
                minH="12rem"
              >
                <VStack spacing={6} align="center" textAlign="center">
                  <Text
                    fontSize="7xl"
                    lineHeight={1}
                    color="secondary.500"
                    opacity={0.35}
                    fontWeight="bold"
                    aria-hidden
                  >
                    &ldquo;
                  </Text>
                  <VStack spacing={2}>
                    {mission.pillars.map((pillar) => (
                      <Text
                        key={pillar.title}
                        fontSize="sm"
                        fontWeight="semibold"
                        letterSpacing="0.14em"
                        textTransform="uppercase"
                        color="whiteAlpha.700"
                      >
                        {pillar.title}
                      </Text>
                    ))}
                  </VStack>
                </VStack>
              </GridItem>
            </Grid>

            <Box
              h="1px"
              bg="linear-gradient(90deg, transparent, rgba(212, 168, 83, 0.45), transparent)"
              mb={{ base: 6, md: 10 }}
            />

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
              gap={{ base: 4, md: 6 }}
            >
              {mission.pillars.map((pillar, index) => (
                <PillarCard
                  key={pillar.title}
                  title={pillar.title}
                  body={pillar.body}
                  index={index}
                />
              ))}
            </Grid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutMission;
