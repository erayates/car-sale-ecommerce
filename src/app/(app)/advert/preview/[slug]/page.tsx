import AdvertDetailContainer from "@/containers/app/advert-detail-container";

async function getAdvert(slug: string) {
  const response = await fetch(
    `http://localhost:3000/api/v1/adverts/${slug}?isSlug=true`,
    { cache: "no-store" }
  );

  return await response.json();
}

export default async function Preview({
  params,
}: {
  params: { slug: string };
}) {
  const advert = await getAdvert(params.slug);
  return <AdvertDetailContainer advert={advert} />;
}
