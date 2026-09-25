import OurTeamPage from "@/components/about/OurTeamPage";
import JsonLd from "@/components/seo/JsonLd";
import { getTeamRouteData } from "@/lib/cms/fetchPages";
import { buildBreadcrumbJsonLd, buildPageMetadataFromConfig } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { page } = await getTeamRouteData();
    return buildPageMetadataFromConfig("ourTeam", {
      title: page?.hero?.title,
      description: page?.hero?.description,
    });
  } catch {
    return buildPageMetadataFromConfig("ourTeam");
  }
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Who We Are", path: "/about-us" },
          { name: "Our Team", path: "/about-us/our-team" },
        ])}
      />
      <OurTeamPage />
    </>
  );
}
