import AboutUsPage from "@/components/about/AboutUsPage";
import JsonLd from "@/components/seo/JsonLd";
import { getWhoWeAreRouteData } from "@/lib/cms/fetchPages";
import { buildBreadcrumbJsonLd, buildPageMetadataFromConfig } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { page } = await getWhoWeAreRouteData();
    return buildPageMetadataFromConfig("aboutUs", {
      title: page?.hero?.title,
      description: page?.hero?.description,
    });
  } catch {
    return buildPageMetadataFromConfig("aboutUs");
  }
}

export default function AboutUs() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Who We Are", path: "/about-us" },
        ])}
      />
      <AboutUsPage />
    </>
  );
}
