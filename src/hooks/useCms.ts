"use client";

import { groqQueries, queryKeys } from "../../sanity/queries";
import { isUpcomingEvent } from "@/lib/eventDates";
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
import { eventsFromPage } from "@/lib/normalizeEvents";
import { useMemo } from "react";
import { useSanityQuery } from "./useSanityQuery";

export function useHomePage() {
  return useSanityQuery<HomePageDocument | null>(queryKeys.homePage, groqQueries.homePage);
}

export function useEventPage() {
  return useSanityQuery<EventPageDocument | null>(queryKeys.eventPage, groqQueries.eventPage);
}

export function useResolvedEvents() {
  const pageQuery = useEventPage();

  const events = useMemo(
    () => eventsFromPage(pageQuery.data ?? null),
    [pageQuery.data],
  );

  return {
    events,
    eventPage: pageQuery.data ?? null,
    pageQuery,
  };
}

export function useFeaturedUpcomingEvents(events: EventDocument[]) {
  return useMemo(
    () =>
      events
        .filter((event) => event.featured === true && isUpcomingEvent(event))
        .sort((a, b) => {
          const aTime = a.start_date ? Date.parse(a.start_date) : Number.POSITIVE_INFINITY;
          const bTime = b.start_date ? Date.parse(b.start_date) : Number.POSITIVE_INFINITY;
          return aTime - bTime;
        }),
    [events],
  );
}

export function useGalleryPage() {
  return useSanityQuery<GalleryPageQueryResult | null>(
    queryKeys.galleryPage,
    groqQueries.galleryPage,
  );
}

export function useWhoWeArePage() {
  return useSanityQuery<WhoWeArePageDocument | null>(
    queryKeys.whoWeArePage,
    groqQueries.whoWeArePage,
  );
}

export function useTeamPage() {
  return useSanityQuery<TeamPageQueryResult | null>(
    queryKeys.teamPage,
    groqQueries.teamPage,
  );
}

export function useContactPage() {
  return useSanityQuery<ContactPageQueryResult | null>(
    queryKeys.contactPage,
    groqQueries.contactPage,
  );
}

export function useDonatePage() {
  return useSanityQuery<DonatePageQueryResult | null>(
    queryKeys.donatePage,
    groqQueries.donatePage,
  );
}
