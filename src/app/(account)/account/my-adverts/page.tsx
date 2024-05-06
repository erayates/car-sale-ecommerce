import MyAdvertsContainer from "@/containers/app/account-container/my-adverts-container";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";

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

export default async function MyAdverts() {
  const currentUser = await getCurrentUser();
  const adverts = await getAdverts();
  const userAds =
    adverts?.filter((ad: any) => ad.uid === currentUser?.uid) ?? [];
  return <MyAdvertsContainer userAds={userAds} />;
}
