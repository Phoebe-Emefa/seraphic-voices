import EventsPage from "@/components/events/EventsPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Discover our upcoming events, from concerts to community engagements.",
};

export default function Page() {
  return <EventsPage />;
}
