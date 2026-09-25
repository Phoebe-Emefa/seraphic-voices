"use client";

import AboutHeroSkeleton from "@/components/about/skeletons/AboutHeroSkeleton";
import PageHero from "@/components/shared/PageHero";
import { useTeamPage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { normalizeTeamPageData, resolveTeamHero } from "@/lib/teamPageContent";

const TeamHero = () => {
  const pageQuery = useTeamPage();

  if (isCmsLoading(pageQuery)) {
    return <AboutHeroSkeleton />;
  }

  const { page } = normalizeTeamPageData(pageQuery.data?.page);
  const hero = resolveTeamHero(page);

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

export default TeamHero;
