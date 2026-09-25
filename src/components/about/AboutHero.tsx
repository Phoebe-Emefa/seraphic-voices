"use client";

import AboutHeroSkeleton from "@/components/about/skeletons/AboutHeroSkeleton";
import PageHero from "@/components/shared/PageHero";
import { useWhoWeArePage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { resolveAboutHero } from "@/lib/aboutUsContent";

const AboutHero = () => {
  const pageQuery = useWhoWeArePage();

  if (isCmsLoading(pageQuery)) {
    return <AboutHeroSkeleton />;
  }

  const hero = resolveAboutHero(pageQuery.data);

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

export default AboutHero;
