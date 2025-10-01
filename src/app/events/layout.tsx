import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events - Seraphic Voices of Toronto",
  description: "Discover our upcoming events, from mesmerizing concerts to community engagements, and let our choir inspire your soul.",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
