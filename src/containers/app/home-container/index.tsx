import React from "react";
import Hero from "./hero";
import FeaturedVehicles from "./featured-vehicles";
import WhyUs from "./why-us";
import Testimonial from "./testimonial";
import { compareByFavorites } from "@/lib/utils";

async function getAdverts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/v1/adverts`,
      {
        cache: "no-store",
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch data.");
  }
}

export default async function HomeContainer() {
  const adverts = await getAdverts();
  const featuredAds = adverts.sort(compareByFavorites).reverse().slice(0, 6);

  return (
    <main className="w-full h-full items-center justify-between mt-[-112px]">
      <Hero />
      <FeaturedVehicles featuredAds={featuredAds} />
      <WhyUs color="dark" />
      <Testimonial />
    </main>
  );
}
