import AdvertsContainer from "@/containers/dashboard/adverts-container";

async function getAdverts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/v1/adverts`,
      {
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export default async function Adverts() {
  const adverts = await getAdverts();
  return <AdvertsContainer adverts={adverts} />;
}
