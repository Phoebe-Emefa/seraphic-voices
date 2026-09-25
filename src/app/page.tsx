import HomePage from "@/components/home/HomePage";
import { getHomeRouteData } from "@/lib/cms/fetchPages";
import { buildPageMetadataFromConfig } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { home } = await getHomeRouteData();
    return buildPageMetadataFromConfig("home", {
      title: home?.hero?.headline,
      description: home?.hero?.subheadline,
    });
  } catch {
    return buildPageMetadataFromConfig("home");
  }
}

export default function Page() {
  return <HomePage />;
}
