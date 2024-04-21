"use client";

import { CircularProgress } from "@mui/material";

import AdvertsList from "../../../../components/adverts-list";
import useSWR from "swr";
import { auth } from "@/lib/firebase/auth";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MyAdvertsContainer() {
  const {
    data: adverts,
    error,
    isLoading,
  } = useSWR(`/api/v1/adverts?favorites=${auth.currentUser?.uid}`, fetcher);

  if (isLoading) {
    return (
      <div className="col-span-2 flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col col-span-2 gap-1">
      <h3 className="text-3xl font-semibold">Your Favorite Ads:</h3>
      {adverts.message ? (
        <div className="col-span-2 flex justify-center items-center h-full font-semibold text-red-500">
          There is no advert to be displayed.
        </div>
      ) : error ? (
        <p className="text-md text-red-500 font-semibold">
          Something went wrong when getting your ads.
        </p>
      ) : (
        <AdvertsList adverts={adverts} type="favorites" />
      )}
    </div>
  );
}
