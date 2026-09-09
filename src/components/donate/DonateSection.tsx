"use client";

import SectionEyebrow from "@/components/about/SectionEyebrow";
import DonateInstructions from "@/components/donate/DonateInstructions";
import DonateSectionSkeleton from "@/components/donate/skeletons/DonateSectionSkeleton";
import CustomButton from "@/components/shared/CustomButton";
import { DONATE_FALLBACK } from "@/data/donateContent";
import { useDonation } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { resolveDonation } from "@/lib/resolveDonation";
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
  const donationQuery = useDonation();
  const { data } = donationQuery;
  const donation = resolveDonation(data);

  if (isCmsLoading(donationQuery)) {
    return <DonateSectionSkeleton />;
  }

  return (
    <Box
      as="section"
      aria-labelledby="donate-section-heading"
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
          <VStack align="flex-start" spacing={4} maxW="40rem">
            <SectionEyebrow label={DONATE_FALLBACK.section.eyebrow} />
            <Text
              id="donate-section-heading"
              fontSize={{ base: "md", md: "lg" }}
              color="secondary.700"
              opacity={0.9}
              lineHeight={1.75}
              sx={{ textWrap: "pretty" }}
            >
              {DONATE_FALLBACK.section.intro}
            </Text>
          </VStack>

          <Grid
            templateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(0, 1fr) minmax(0, 1.1fr)" }}
            gap={{ base: 8, lg: 12 }}
            alignItems="stretch"
            w="full"
            minW={0}
          >
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

                  <Heading
                    as="h2"
                    fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
                    fontWeight="bold"
                    lineHeight={1.2}
                    letterSpacing="-0.02em"
                    mb={4}
                    sx={{ textWrap: "balance" }}
                  >
                    {DONATE_FALLBACK.section.impactTitle}
                  </Heading>

                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    color="whiteAlpha.800"
                    lineHeight={1.8}
                    maxW="36rem"
                    sx={{ textWrap: "pretty" }}
                  >
                    {DONATE_FALLBACK.section.impactBody}
                  </Text>
                </Box>

                <Box position="relative" zIndex={1} pt={{ base: 8, lg: 0 }}>
                  <CustomButton
                    title="Contact us"
                    href="/contact-us"
                    width={{ base: "100%", sm: "auto" }}
                    bg="secondary.500"
                    hoverBg="secondary.500"
                    textColor="secondary.700"
                  />
                </Box>
              </Flex>
            </motion.div>

            <DonateInstructions
              title={donation.title}
              instructions={donation.instructions}
            />
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default DonateSection;
