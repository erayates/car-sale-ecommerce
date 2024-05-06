import UpdateAdvertContainer from "@/containers/app/update-advert-container";
import NotFound from "../../not-found";

async function getRelatedAdvert(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/v1/adverts/${id}`,
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

export default async function UpdateAdvert({
  params,
}: {
  params: { id: string };
}) {
  const advertId = params.id;
  const advert = await getRelatedAdvert(advertId);
  if (!advert.message) {
    return <UpdateAdvertContainer advert={advert} advertId={advertId} />;
  }

  return <NotFound />;
}
