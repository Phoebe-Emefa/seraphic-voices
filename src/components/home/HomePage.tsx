"use client";

import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Repettoire from "@/components/home/Repettoire";
import UpcomingEvents from "@/components/home/UpcomingEvents";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <Repettoire />
      <UpcomingEvents />
      <Contact />
    </div>
  );
}
