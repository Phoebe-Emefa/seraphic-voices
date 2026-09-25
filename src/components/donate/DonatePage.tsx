"use client";

import DonateHero from "@/components/donate/DonateHero";
import DonateSection from "@/components/donate/DonateSection";
import { useDonatePage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { hasDonatePageContent, normalizeDonatePageData } from "@/lib/donatePageContent";

export default function DonatePage() {
  const pageQuery = useDonatePage();

  if (isCmsLoading(pageQuery)) {
    return (
      <>
        <DonateHero />
        <DonateSection />
      </>
    );
  }

  const { page } = normalizeDonatePageData(pageQuery.data?.page);

  if (!hasDonatePageContent(page)) {
    return null;
  }

  return (
    <>
      <DonateHero />
      <DonateSection />
    </>
  );
}
