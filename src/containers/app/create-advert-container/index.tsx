"use client";

import * as React from "react";
import PageHero from "@/components/page-hero";
import { Roboto } from "next/font/google";
import AdvertMultistepForm from "./advert-multi-step-form";

const font = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});


export default function CreateAdvertContainer() {
  return (
    <>
      <PageHero title="Create Advert" />
      <div className="container my-16">
        <AdvertMultistepForm />
      </div>
    </>
  );
}
