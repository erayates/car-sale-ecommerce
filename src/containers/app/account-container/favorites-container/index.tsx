"use client";

import { CircularProgress } from "@mui/material";

import AdvertsList from "../../../../components/adverts-list";

export default function FavoritesContainer({ adverts }: { adverts: any[] }) {
  return (
    <div className="flex flex-col col-span-2 gap-1">
      <h3 className="text-3xl font-semibold">Your Favorite Ads:</h3>
      {adverts.length === 0 ? (
        <div className="col-span-2 flex justify-center items-center h-full font-semibold text-red-500">
          There is no advert to be displayed.
        </div>
      ) : (
        <AdvertsList adverts={adverts} type="favorites" />
      )}
    </div>
  );
}
