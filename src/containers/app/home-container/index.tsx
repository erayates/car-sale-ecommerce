import React from "react";
import Hero from "./hero";
import HeroSearch from "./hero-search";
import FeaturedVehicles from "./featured-vehicles";
export default function HomeContainer() {
  return (
    <main className="w-full h-full items-center justify-between relative mt-[-112px]">
      <Hero />
      <HeroSearch />
      <FeaturedVehicles />
    </main>
  );
}
