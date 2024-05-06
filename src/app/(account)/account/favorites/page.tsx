import FavoritesContainer from "@/containers/app/account-container/favorites-container";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";

async function getUserFavorites(uid: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_DOMAIN}/api/v1/adverts?favorites=${uid}`,
      { cache: "no-store" }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch data.");
  }
}

export default async function Favorites() {
  const currentUser = await getCurrentUser();
  const adverts = await getUserFavorites(currentUser?.uid ?? "");
  return <FavoritesContainer adverts={adverts} />;
}
