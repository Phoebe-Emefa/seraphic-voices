"use client";

import SectionEyebrow from "@/components/about/SectionEyebrow";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactSectionSkeleton from "@/components/contact/skeletons/ContactSectionSkeleton";
import { useContactPage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import {
  hasContactSectionContent,
  normalizeContactPageData,
  resolveContactDetails,
  resolveContactForm,
  resolveContactSection,
} from "@/lib/contactPageContent";
import { Box, Container, Grid, Text, VStack } from "@chakra-ui/react";

const ContactSection = () => {
  const pageQuery = useContactPage();

  if (isCmsLoading(pageQuery)) {
    return <ContactSectionSkeleton />;
  }

  const { page } = normalizeContactPageData(pageQuery.data?.page);

  if (!hasContactSectionContent(page)) {
    return null;
  }

  const section = resolveContactSection(page);
  const details = resolveContactDetails(page);
  const form = resolveContactForm(page);

  if (!section && !details && !form) {
    return null;
  }

  const showGrid = Boolean(details || form);

  return (
    <Box
      as="section"
      aria-labelledby={section?.intro ? "contact-section-heading" : undefined}
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
                  id="contact-section-heading"
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
              alignItems="start"
              w="full"
              minW={0}
            >
              {details ? <ContactInfo details={details} /> : null}
              {form ? <ContactForm form={form} /> : null}
            </Grid>
          ) : null}
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactSection;
