import { cache } from "react";
import { groqQueries } from "../../../sanity/queries";
import { sanityFetch } from "@/lib/cms/sanityFetch";
import { findEventBySlug } from "@/lib/eventPaths";
import { eventsFromPage } from "@/lib/normalizeEvents";
import type {
  EventDocument,
  EventPageDocument,
  HomePageDocument,
  ContactPageQueryResult,
  DonatePageQueryResult,
  GalleryPageQueryResult,
  TeamPageQueryResult,
  WhoWeArePageDocument,
} from "@/lib/cms/types";

export const getHomePage = cache(async () => {
  return sanityFetch<HomePageDocument | null>(groqQueries.homePage);
});

export const getEventPage = cache(async () => {
  return sanityFetch<EventPageDocument | null>(groqQueries.eventPage);
});

function resolveEvents(page: EventPageDocument | null): EventDocument[] {
  return eventsFromPage(page);
}

export const getHomeRouteData = cache(async () => {
  const [home, eventPage] = await Promise.all([getHomePage(), getEventPage()]);
  const events = resolveEvents(eventPage);
  return {
    home,
    events,
    eventPage,
  };
});

export const getEventsRouteData = cache(async () => {
  const page = await getEventPage();
  const events = resolveEvents(page);
  return { page, events };
});

export const getEventBySlug = cache(async (slug: string) => {
  const { page, events } = await getEventsRouteData();
  const event = findEventBySlug(events, slug);
  return { page, event };
});

export const getWhoWeArePage = cache(async () => {
  return sanityFetch<WhoWeArePageDocument | null>(groqQueries.whoWeArePage);
});

export const getWhoWeAreRouteData = cache(async () => {
  const page = await getWhoWeArePage();
  return { page };
});

export const getTeamPage = cache(async () => {
  return sanityFetch<TeamPageQueryResult | null>(groqQueries.teamPage);
});

export const getTeamRouteData = cache(async () => {
  const result = await getTeamPage();
  return {
    page: result?.page ?? null,
  };
});

export const getGalleryPage = cache(async () => {
  return sanityFetch<GalleryPageQueryResult | null>(groqQueries.galleryPage);
});

export const getGalleryRouteData = cache(async () => {
  const result = await getGalleryPage();
  return {
    page: result?.page ?? null,
  };
});

export const getContactPage = cache(async () => {
  return sanityFetch<ContactPageQueryResult | null>(groqQueries.contactPage);
});

export const getContactRouteData = cache(async () => {
  const result = await getContactPage();
  return {
    page: result?.page ?? null,
  };
});

export const getDonatePage = cache(async () => {
  return sanityFetch<DonatePageQueryResult | null>(groqQueries.donatePage);
});

export const getDonateRouteData = cache(async () => {
  const result = await getDonatePage();
  return {
    page: result?.page ?? null,
  };
});
