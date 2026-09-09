import EventDetailsPage from "@/components/events/EventDetailsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event",
  description: "Concert details for Seraphic Voices of Toronto.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <EventDetailsPage slug={slug} />;
}
