import GalleryPage from "@/components/gallery/GalleryPage";
import JsonLd from "@/components/seo/JsonLd";
import { getGalleryRouteData } from "@/lib/cms/fetchPages";
import { buildBreadcrumbJsonLd, buildPageMetadataFromConfig } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { page } = await getGalleryRouteData();
    return buildPageMetadataFromConfig("gallery", {
      title: page?.hero?.title,
      description: page?.hero?.description,
    });
  } catch {
    return buildPageMetadataFromConfig("gallery");
  }
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Gallery", path: "/gallery" },
        ])}
      />
      <GalleryPage />
    </>
  );
}
