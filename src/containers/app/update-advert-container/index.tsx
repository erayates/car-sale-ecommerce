"use client";

import PageHero from "@/components/page-hero";
import AdvertMultiStepForm from "../create-advert-container/advert-multi-step-form";

export default function UpdateAdvertContainer({
  advert,
  advertId,
}: {
  advert: AdvertInterface;
  advertId: string;
}) {
  return (
    <>
      <PageHero title="Update Advert" />
      <div className="my-16 container">
        <AdvertMultiStepForm advert={advert} advertId={advertId} />
      </div>
    </>
  );
}
