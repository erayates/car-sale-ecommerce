"use client";

import { useUserStore } from "@/providers/userProvider";
import { UserType } from "@/types/user";
import { useRouter } from "next/navigation";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";

export default function AdvertFavorite({ advert }: { advert: any }) {
  const currentUser = useUserStore((state) => state.currentUser as UserType);
  const router = useRouter();

  const handleUnfavorite = async () => {
    const response = await fetch(`/api/v1/adverts/${advert.id}`, {
      method: "POST",
      body: JSON.stringify({
        favorite: {
          isFavorite: false,
          uid: currentUser.uid,
        },
      }),
    });

    const resData = await response.json();

    if (response.ok && response.status === 200) {
      toast.success(resData.message);
      router.refresh();
      return;
    }

    toast.error("Something went wrong! Please try again.");
  };

  const handleFavorite = async () => {
    const response = await fetch(`/api/v1/adverts/${advert.id}`, {
      method: "POST",
      body: JSON.stringify({
        favorite: {
          isFavorite: true,
          uid: currentUser.uid,
        },
      }),
    });

    const resData = await response.json();

    if (response.ok && response.status === 200) {
      toast.success(resData.message);
      router.refresh();
      return;
    }

    toast.error("Something went wrong! Please try again.");
  };

  if (currentUser) {
    return advert.favorites.includes(currentUser.uid) ? (
      <button
        className="text-white bg-red-600 rounded flex items-center gap-2 px-4 py-2"
        onClick={handleUnfavorite}
      >
        <FaRegHeart />
        Remove From Favorites
      </button>
    ) : (
      <button
        className="text-green-600 flex items-center gap-2 border-green-600 border-2 px-4 py-2 rounded"
        onClick={handleFavorite}
      >
        <FaHeart /> Add To Favorites
      </button>
    );
  }
}
