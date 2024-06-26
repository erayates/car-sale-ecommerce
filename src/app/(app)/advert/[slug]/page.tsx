import AdvertDetailContainer from "@/containers/app/advert-detail-container";
import AdvertDenied from "@/containers/app/advert-detail-container/advert-denied";
import AdvertPending from "@/containers/app/advert-detail-container/advert-pending";
import { notFound } from "next/navigation";

async function getAdvert(slug: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/v1/adverts/${slug}?isSlug=true`,
    { cache: "no-store" }
  );

  return response;
}

export default async function AdvertDetail({
  params,
}: {
  params: { slug: string };
}) {
  const response = await getAdvert(params.slug);

  if (!response.ok) {
    notFound();
  }

  const advert = await response.json();

  if (advert.status === "denied") {
    return <AdvertDenied />;
  }

  if (advert.status === "pending") {
    return <AdvertPending />;
  }

  return <AdvertDetailContainer advert={advert} />;
}
