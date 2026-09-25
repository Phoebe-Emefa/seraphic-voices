import ContactUsPage from "@/components/contact/ContactUsPage";
import JsonLd from "@/components/seo/JsonLd";
import { getContactRouteData } from "@/lib/cms/fetchPages";
import { buildBreadcrumbJsonLd, buildPageMetadataFromConfig } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { page } = await getContactRouteData();
    return buildPageMetadataFromConfig("contactUs", {
      title: page?.hero?.title,
      description: page?.hero?.description,
    });
  } catch {
    return buildPageMetadataFromConfig("contactUs");
  }
}

export default function Page() {
  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact-us" },
        ])}
      />
      <ContactUsPage />
    </>
  );
}
