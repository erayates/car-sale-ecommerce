import SearchContainer from "@/containers/app/search-container";
import { getQueryString } from "@/lib/utils";

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

async function getSearchResults(q: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/v1/search?${q}`,
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

export default async function Search({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  if (Object.entries(searchParams).length > 0) {
    const q = getQueryString(searchParams);
    const searchResults = await getSearchResults(q);
    return <SearchContainer items={searchResults} />;
  }

  const adverts = await getAdverts();
  const activeAds = adverts?.filter(
    (ad: AdvertInterface) => ad.status === "active"
  );
  return <SearchContainer items={activeAds} />;
}
