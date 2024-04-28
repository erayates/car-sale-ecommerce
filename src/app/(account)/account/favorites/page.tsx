import FavoritesContainer from "@/containers/app/account-container/favorites-container";
import { getCurrentUser } from "@/lib/firebase/firebase-admin";

async function getUserFavorites(uid: string) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/adverts?favorites=${uid}`
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch data.");
  }
}

export default async function Favorites() {
  const { uid } = await getCurrentUser();
  if (uid) {
    const adverts = await getUserFavorites(uid);
    return <FavoritesContainer adverts={adverts} />;
  }
}
