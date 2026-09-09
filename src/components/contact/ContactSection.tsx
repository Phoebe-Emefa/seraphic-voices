"use client";

import SectionEyebrow from "@/components/about/SectionEyebrow";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactSectionSkeleton from "@/components/contact/skeletons/ContactSectionSkeleton";
import { CONTACT_FALLBACK } from "@/data/contactContent";
import { useContactInfo } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { Box, Container, Grid, Text, VStack } from "@chakra-ui/react";

const ContactSection = () => {
  const contactInfoQuery = useContactInfo();

  if (isCmsLoading(contactInfoQuery)) {
    return <ContactSectionSkeleton />;
  }

  return (
    <Box
      as="section"
      aria-labelledby="contact-section-heading"
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
            <SectionEyebrow label={CONTACT_FALLBACK.section.eyebrow} />
            <Text
              id="contact-section-heading"
              fontSize={{ base: "md", md: "lg" }}
              color="secondary.700"
              opacity={0.9}
              lineHeight={1.75}
              sx={{ textWrap: "pretty" }}
            >
              {CONTACT_FALLBACK.section.intro}
            </Text>
          </VStack>

          <Grid
            templateColumns={{ base: "minmax(0, 1fr)", lg: "minmax(0, 1fr) minmax(0, 1.1fr)" }}
            gap={{ base: 8, lg: 12 }}
            alignItems="start"
            w="full"
            minW={0}
          >
            <ContactInfo />
            <ContactForm />
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactSection;
