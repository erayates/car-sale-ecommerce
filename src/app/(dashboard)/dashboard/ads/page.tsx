import AdvertsContainer from "@/containers/dashboard/adverts-container";

async function getAdverts() {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/adverts`);
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
