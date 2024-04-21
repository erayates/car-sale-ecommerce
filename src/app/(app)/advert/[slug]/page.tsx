import AdvertDetailContainer from "@/containers/app/advert-detail-container";
import { notFound } from "next/navigation";

async function getAdvert(slug: string) {
  const response = await fetch(
    `http://localhost:3000/api/v1/adverts/${slug}?isSlug=true`
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
  return <AdvertDetailContainer advert={advert}/>;
}
