"use client";

import AboutHeroSkeleton from "@/components/about/skeletons/AboutHeroSkeleton";
import PageHero from "@/components/shared/PageHero";
import { EVENTS_FALLBACK } from "@/data/eventsContent";
import { useEventHero } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { imageSrc } from "../../../sanity/sanity-client";

const EventsHero = () => {
  const heroQuery = useEventHero();
  const { data } = heroQuery;
  const hero = data?.[0];

  if (isCmsLoading(heroQuery)) {
    return <AboutHeroSkeleton />;
  }

  return (
    <PageHero
      heading={hero?.title || EVENTS_FALLBACK.hero.title}
      description={hero?.description || EVENTS_FALLBACK.hero.description}
      image={imageSrc(hero?.image?.asset?._ref)}
      alt={hero?.image?.alt}
    />
  );
};

export default EventsHero;
