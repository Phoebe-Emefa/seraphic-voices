import DonatePage from "@/components/donate/DonatePage";
import JsonLd from "@/components/seo/JsonLd";
import { getDonateRouteData } from "@/lib/cms/fetchPages";
import { buildBreadcrumbJsonLd, buildPageMetadataFromConfig } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { page } = await getDonateRouteData();
    return buildPageMetadataFromConfig("donate", {
      title: page?.hero?.title,
      description: page?.hero?.description,
    });
  } catch {
    return buildPageMetadataFromConfig("donate");
  }
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Support Us", path: "/donate" },
        ])}
      />
      <DonatePage />
    </>
  );
}
