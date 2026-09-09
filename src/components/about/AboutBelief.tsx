"use client";

import AboutBeliefSkeleton from "@/components/about/skeletons/AboutBeliefSkeleton";
import { useWhoWeAre } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { resolveAboutBelief } from "@/lib/aboutUsContent";
import { splitMissionLines } from "@/lib/missionText";
import { Box, Container, Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";

const easeOut = [0.23, 1, 0.32, 1];

function splitBeliefCopy(text: string): { lead: string | null; lines: string[] } {
  const colonIndex = text.indexOf(":");

  if (colonIndex > 0 && colonIndex < 90) {
    const lead = text.slice(0, colonIndex + 1).trim();
    const remainder = text.slice(colonIndex + 1).trim();
    const lines = splitMissionLines(remainder);
    return { lead, lines };
  }

  const lines = splitMissionLines(text);
  return { lead: null, lines };
}

const AboutBelief = () => {
  const whoWeAreQuery = useWhoWeAre();
  const { data } = whoWeAreQuery;
  const content = data?.[0];
  const reduceMotion = useReducedMotion();

  if (isCmsLoading(whoWeAreQuery)) {
    return <AboutBeliefSkeleton />;
  }

  const belief = resolveAboutBelief(content);
  const { lead, lines } = splitBeliefCopy(belief);

  return (
    <Box
      as="section"
      aria-label="Closing belief"
      bg="secondary.100"
      py={{ base: 10, sm: 14, md: 20 }}
    >
      <Container
        maxW={{ base: "full", md: "2xl", lg: "5xl", xl: "7xl" }}
        px={{ base: 4, sm: 6, md: 8, xl: 12 }}
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <Box
            bg="white"
            borderRadius={{ base: "xl", md: "2xl" }}
            border="1px solid"
            borderColor="blackAlpha.100"
            boxShadow="0 24px 48px -28px rgba(4, 35, 92, 0.14)"
            overflow="hidden"
            position="relative"
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              w={{ base: "3rem", md: "4.5rem" }}
              h="3px"
              bg="secondary.500"
            />

            <Grid
              templateColumns={{ base: "1fr", md: "auto 1fr" }}
              gap={{ base: 6, md: 8, lg: 10 }}
              p={{ base: 5, sm: 7, md: 10, lg: 12 }}
              alignItems="start"
            >
              <GridItem display={{ base: "none", md: "block" }}>
                <Text
                  fontSize={{ md: "5xl", lg: "6xl" }}
                  lineHeight={1}
                  color="secondary.500"
                  opacity={0.28}
                  fontWeight="bold"
                  aria-hidden
                  pt={1}
                >
                  &ldquo;
                </Text>
              </GridItem>

              <GridItem>
                <VStack align="stretch" spacing={{ base: 3, md: 5 }} w="full" maxW="52rem">
                  {lead ? (
                    <Text
                      fontSize={{ base: "md", sm: "lg", md: "xl" }}
                      color="secondary.700"
                      fontWeight="semibold"
                      lineHeight={1.5}
                      letterSpacing="-0.01em"
                      sx={{ textWrap: "balance" }}
                    >
                      {lead}
                    </Text>
                  ) : null}

                  {lines.map((line) => (
                    <Text
                      key={line}
                      fontSize={{ base: "md", sm: "lg", md: "xl" }}
                      color="text"
                      lineHeight={1.75}
                      fontStyle="italic"
                      sx={{ textWrap: "pretty" }}
                    >
                      {line}
                    </Text>
                  ))}
                </VStack>
              </GridItem>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default AboutBelief;
