"use client";

import AboutHeroSkeleton from "@/components/about/skeletons/AboutHeroSkeleton";
import PageHero from "@/components/shared/PageHero";
import { useContactPage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { normalizeContactPageData, resolveContactHero } from "@/lib/contactPageContent";

const ContactHero = () => {
  const pageQuery = useContactPage();

  if (isCmsLoading(pageQuery)) {
    return <AboutHeroSkeleton />;
  }

  const { page } = normalizeContactPageData(pageQuery.data?.page);
  const hero = resolveContactHero(page);

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

export default ContactHero;
