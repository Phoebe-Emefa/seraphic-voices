"use client";

import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";
import { useContactPage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { hasContactPageContent, normalizeContactPageData } from "@/lib/contactPageContent";

export default function ContactUsPage() {
  const pageQuery = useContactPage();

  if (isCmsLoading(pageQuery)) {
    return (
      <>
        <ContactHero />
        <ContactSection />
      </>
    );
  }

  const { page } = normalizeContactPageData(pageQuery.data?.page);

  if (!hasContactPageContent(page)) {
    return null;
  }

  return (
    <>
      <ContactHero />
      <ContactSection />
    </>
  );
}
