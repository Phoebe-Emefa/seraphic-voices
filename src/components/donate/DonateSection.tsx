"use client";

import SectionEyebrow from "@/components/about/SectionEyebrow";
import DonateInstructions from "@/components/donate/DonateInstructions";
import DonateSectionSkeleton from "@/components/donate/skeletons/DonateSectionSkeleton";
import CustomButton from "@/components/shared/CustomButton";
import { useDonatePage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import {
  hasDonateSectionContent,
  normalizeDonatePageData,
  resolveDonateImpact,
  resolveDonateInstructions,
  resolveDonateSectionIntro,
} from "@/lib/donatePageContent";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, useReducedMotion } from "framer-motion";
import { HiOutlineHeart } from "react-icons/hi2";

const easeOut = [0.23, 1, 0.32, 1];

const DonateSection = () => {
  const reduceMotion = useReducedMotion();
  const pageQuery = useDonatePage();

  if (isCmsLoading(pageQuery)) {
    return <DonateSectionSkeleton />;
  }

  const { page } = normalizeDonatePageData(pageQuery.data?.page);

  if (!hasDonateSectionContent(page)) {
    return null;
  }

  const section = resolveDonateSectionIntro(page);
  const impact = resolveDonateImpact(page);
  const instructions = resolveDonateInstructions(page);
  const showGrid = Boolean(impact || instructions);

  return (
    <Box
      as="section"
      aria-labelledby={section?.intro ? "donate-section-heading" : undefined}
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
          {section ? (
            <VStack align="flex-start" spacing={4} maxW="40rem">
              {section.eyebrow ? <SectionEyebrow label={section.eyebrow} /> : null}
              {section.intro ? (
                <Text
                  id="donate-section-heading"
                  fontSize={{ base: "md", md: "lg" }}
                  color="secondary.700"
                  opacity={0.9}
                  lineHeight={1.75}
                  sx={{ textWrap: "pretty" }}
                >
                  {section.intro}
                </Text>
              ) : null}
            </VStack>
          ) : null}

          {showGrid ? (
            <Grid
              templateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(0, 1fr) minmax(0, 1.1fr)" }}
              gap={{ base: 8, lg: 12 }}
              alignItems="stretch"
              w="full"
              minW={0}
            >
              {impact ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  style={{ width: "100%", minWidth: 0 }}
                >
                  <Flex
                    direction="column"
                    justify="space-between"
                    h="full"
                    minH={{ base: "auto", lg: "22rem" }}
                    p={{ base: 6, md: 8, lg: 10 }}
                    borderRadius="2xl"
                    bg="secondary.700"
                    color="white"
                    boxShadow="0 32px 64px -32px rgba(4, 35, 92, 0.45)"
                    position="relative"
                    overflow="hidden"
                  >
                    <Box
                      position="absolute"
                      top={-20}
                      right={-20}
                      w="12rem"
                      h="12rem"
                      borderRadius="full"
                      bg="secondary.500"
                      opacity={0.12}
                      pointerEvents="none"
                    />

                    <Box position="relative" zIndex={1}>
                      <Flex
                        align="center"
                        justify="center"
                        w={12}
                        h={12}
                        borderRadius="full"
                        bg="whiteAlpha.150"
                        border="1px solid"
                        borderColor="whiteAlpha.250"
                        mb={6}
                      >
                        <Icon as={HiOutlineHeart} boxSize={6} color="secondary.500" />
                      </Flex>

                      {impact.title ? (
                        <Heading
                          as="h2"
                          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                          fontWeight="bold"
                          lineHeight={1.2}
                          letterSpacing="-0.02em"
                          mb={4}
                          sx={{ textWrap: "balance" }}
                        >
                          {impact.title}
                        </Heading>
                      ) : null}

                      {impact.body ? (
                        <Text
                          fontSize={{ base: "sm", md: "md" }}
                          color="whiteAlpha.800"
                          lineHeight={1.8}
                          maxW="36rem"
                          sx={{ textWrap: "pretty" }}
                        >
                          {impact.body}
                        </Text>
                      ) : null}
                    </Box>

                    {impact.ctaLabel && impact.ctaHref ? (
                      <Box position="relative" zIndex={1} pt={{ base: 8, lg: 0 }}>
                        <CustomButton
                          title={impact.ctaLabel}
                          href={impact.ctaHref}
                          width={{ base: "100%", sm: "auto" }}
                          bg="secondary.500"
                          hoverBg="secondary.500"
                          textColor="secondary.700"
                        />
                      </Box>
                    ) : null}
                  </Flex>
                </motion.div>
              ) : null}

              {instructions ? (
                <DonateInstructions
                  title={instructions.title}
                  instructions={instructions.steps}
                />
              ) : null}
            </Grid>
          ) : null}
        </VStack>
      </Container>
    </Box>
  );
};

export default DonateSection;
