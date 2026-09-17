"use client";

import AboutHeroSkeleton from "@/components/about/skeletons/AboutHeroSkeleton";
import PageHero from "@/components/shared/PageHero";
import { useGalleryPage } from "@/hooks/useCms";
import { isCmsLoading } from "@/hooks/useCmsLoading";
import { normalizeGalleryPageData, resolveGalleryHero } from "@/lib/galleryPageContent";

const GalleryHero = () => {
  const pageQuery = useGalleryPage();

  if (isCmsLoading(pageQuery)) {
    return <AboutHeroSkeleton />;
  }

  const { page } = normalizeGalleryPageData(pageQuery.data?.page);
  const hero = resolveGalleryHero(page);

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

export default GalleryHero;
