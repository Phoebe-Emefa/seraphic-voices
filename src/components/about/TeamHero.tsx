"use client";

import AboutHeroSkeleton from "@/components/about/skeletons/AboutHeroSkeleton";
import PageHero from "@/components/shared/PageHero";
import { TEAM_FALLBACK } from "@/data/teamContent";
import { useTeamHero } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { imageSrc } from "../../../sanity/sanity-client";

const TeamHero = () => {
  const heroQuery = useTeamHero();
  const { data } = heroQuery;
  const hero = data?.[0];

  if (isCmsLoading(heroQuery)) {
    return <AboutHeroSkeleton />;
  }

  return (
    <PageHero
      heading={hero?.title || TEAM_FALLBACK.hero.title}
      description={hero?.description || TEAM_FALLBACK.hero.description}
      image={imageSrc(hero?.image?.asset?._ref)}
      alt={hero?.image?.alt}
    />
  );
};

export default TeamHero;
