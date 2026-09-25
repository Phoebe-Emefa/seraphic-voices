"use client";

import AboutHeroSkeleton from "@/components/about/skeletons/AboutHeroSkeleton";
import PageHero from "@/components/shared/PageHero";
import { useDonatePage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { normalizeDonatePageData, resolveDonateHero } from "@/lib/donatePageContent";

const DonateHero = () => {
  const pageQuery = useDonatePage();

  if (isCmsLoading(pageQuery)) {
    return <AboutHeroSkeleton />;
  }

  const { page } = normalizeDonatePageData(pageQuery.data?.page);
  const hero = resolveDonateHero(page);

  if (!hero) {
    return null;
  }

  return (
    <PageHero
      heading={hero.title}
      description={hero.description}
      image={hero.imageUrl}
      alt={hero.imageAlt}
    />
  );
};

export default DonateHero;
