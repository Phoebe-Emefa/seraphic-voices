import EventDetailView from "@/components/events/EventDetailView";
import JsonLd from "@/components/seo/JsonLd";
import { getEventBySlug, getEventsRouteData } from "@/lib/cms/fetchPages";
import { eventPath, eventSlugs, resolveEventSlug } from "@/lib/eventPaths";
import { resolveEventImage } from "@/lib/eventDisplay";
import {
  buildBreadcrumbJsonLd,
  buildEventJsonLd,
  buildPageMetadata,
  portableTextToPlain,
} from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const { events } = await getEventsRouteData();
    return eventSlugs(events).map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { event } = await getEventBySlug(slug);
    if (!event?.title) {
      return buildPageMetadata({ title: "Event not found", path: `/events/${slug}`, noIndex: true });
    }

    const path = eventPath(event);
    const description =
      portableTextToPlain(event.description) ||
      [event.location, event.start_date ? `Concert on ${event.start_date}` : null]
        .filter(Boolean)
        .join(" · ");

    return buildPageMetadata({
      title: event.title,
      description,
      path,
      image: resolveEventImage(event) || undefined,
    });
  } catch {
    return buildPageMetadata({ title: "Event", path: `/events/${slug}` });
  }
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { event, page } = await getEventBySlug(slug);

  if (!event || !resolveEventSlug(event)) {
    notFound();
  }

  const path = eventPath(event);
  const purchaseLabel = page?.listing?.ticketButtonLabel;

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
          { name: event.title || "Concert", path },
        ])}
      />
      <JsonLd data={buildEventJsonLd(event, path)} />
      <EventDetailView event={event} purchaseLabel={purchaseLabel} />
    </>
  );
}
