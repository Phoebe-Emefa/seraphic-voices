"use client";

import { groqQueries, queryKeys } from "../../sanity/queries";
import { isUpcomingEvent } from "@/lib/eventDates";
import { useSanityQuery } from "./useSanityQuery";

export function useHome() {
  return useSanityQuery<any[]>(queryKeys.home, groqQueries.home);
}

export function useEvents() {
  return useSanityQuery<any[]>(queryKeys.events, groqQueries.events);
}

export function useEvent(slug: string) {
  return useSanityQuery<any>(queryKeys.event(slug), groqQueries.eventBySlug, { slug });
}

export function useEventHero() {
  return useSanityQuery<any[]>(queryKeys.eventHero, groqQueries.eventHero);
}

export function useGallery() {
  return useSanityQuery<any[]>(queryKeys.gallery, groqQueries.gallery);
}

export function useGalleryHero() {
  return useSanityQuery<any[]>(queryKeys.galleryHero, groqQueries.galleryHero);
}

export function useWhoWeAre() {
  return useSanityQuery<any[]>(queryKeys.whoWeAre, groqQueries.whoWeAre);
}

export function useWhoWeAreHero() {
  return useSanityQuery<any[]>(queryKeys.whoWeAreHero, groqQueries.whoWeAreHero);
}

export function useTeam() {
  return useSanityQuery<any[]>(queryKeys.team, groqQueries.team);
}

export function useTeamHero() {
  return useSanityQuery<any[]>(queryKeys.teamHero, groqQueries.teamHero);
}

export function useContactHero() {
  return useSanityQuery<any[]>(queryKeys.contactHero, groqQueries.contactHero);
}

export function useContactInfo() {
  return useSanityQuery<any[]>(queryKeys.contactInfo, groqQueries.contactInfo);
}

export function useDonateHero() {
  return useSanityQuery<any[]>(queryKeys.donateHero, groqQueries.donateHero);
}

export function useDonation() {
  return useSanityQuery<any[]>(queryKeys.donation, groqQueries.donation);
}

export function useRepertoire() {
  return useSanityQuery<any[]>(queryKeys.repertoire, groqQueries.repertoire);
}

export function useSera5th() {
  return useSanityQuery<any[]>(queryKeys.sera5th, groqQueries.sera5th);
}

export function useSera5thHero() {
  return useSanityQuery<any[]>(queryKeys.sera5thHero, groqQueries.sera5thHero);
}

export function nextUpcomingEvent(events?: any[]) {
  return events?.filter(isUpcomingEvent)[0] ?? null;
}
