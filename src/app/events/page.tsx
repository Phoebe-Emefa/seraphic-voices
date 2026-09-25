import EventsPage from "@/components/events/EventsPage";
import JsonLd from "@/components/seo/JsonLd";
import { getEventsRouteData } from "@/lib/cms/fetchPages";
import {
  buildBreadcrumbJsonLd,
  buildEventsJsonLd,
  buildPageMetadataFromConfig,
} from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { page } = await getEventsRouteData();
    return buildPageMetadataFromConfig("events", {
      title: page?.hero?.title,
      description: page?.hero?.description,
    });
  } catch {
    return buildPageMetadataFromConfig("events");
  }
}

export default async function Page() {
  let eventsJsonLd = null;
  try {
    const { events } = await getEventsRouteData();
    eventsJsonLd = buildEventsJsonLd(events);
  } catch {
    eventsJsonLd = null;
  }

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
        ])}
      />
      <JsonLd data={eventsJsonLd} />
      <EventsPage />
    </>
  );
}
