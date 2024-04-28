"use client";
import PageHero from "@/components/page-hero";
import AdvertMultistepForm from "./advert-multi-step-form";

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
