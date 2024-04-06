import React from "react";
import Hero from "./hero";
import HeroSearch from "./hero-search";
import FeaturedVehicles from "./featured-vehicles";
import WhyUs from "./why-us";
import Testimonial from "./testimonial";

export default function HomeContainer() {
  return (
    <main className="w-full h-full items-center justify-between relative mt-[-112px]">
      <Hero />
      <HeroSearch />
      <FeaturedVehicles />
      <WhyUs />
      <Testimonial />
    </main>
  );
}
