"use client";

import { CircularProgress, Tooltip } from "@mui/material";

import { FaPlus } from "react-icons/fa";
import AdvertsList from "./adverts-list";
import { advertsList } from "@/mocks";
import Link from "next/link";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { useUserStore } from "@/providers/userProvider";
import { UserType } from "@/types/user";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MyAdvertsContainer() {
  const currentUser = useUserStore((state) => state.currentUser as UserType);

  const {
    data: adverts,
    error,
    isLoading,
  } = useSWR("/api/v1/adverts", fetcher);

  const userAds = adverts?.filter((ad) => ad.uid === currentUser.uid);
  if (isLoading) {
    return (
      <div className="col-span-2 flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="flex flex-col col-span-2 gap-1">
      <h3 className="text-3xl font-semibold">My Adverts:</h3>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2">
          <p className="text-slate-500">Your Total Advert: </p>
          <p className="font-semibold">12</p>
        </div>
        <Tooltip title="Create a New Advert">
          <Link
            href="/create-advert"
            target="_blank"
            className="bg-orange-600 text-white p-4 rounded-lg"
          >
            <FaPlus />
          </Link>
        </Tooltip>
      </div>

      {error ? (
        <p className="text-md text-red-500 font-semibold">
          Something went wrong when getting your ads.
        </p>
      ) : (
        <AdvertsList adverts={userAds} />
      )}
    </div>
  );
}
