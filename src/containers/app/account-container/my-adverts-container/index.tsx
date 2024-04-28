"use client";

import { CircularProgress, Tooltip } from "@mui/material";

import { FaPlus } from "react-icons/fa";
import AdvertsList from "../../../../components/adverts-list";
import Link from "next/link";

export default function MyAdvertsContainer({ userAds }: { userAds: any }) {
  return (
    <div className="flex flex-col col-span-2 gap-1">
      <h3 className="text-3xl font-semibold">My Adverts:</h3>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2">
          <p className="text-slate-500">Your Total Advert: </p>
          <p className="font-semibold">{userAds.length}</p>
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

      {userAds.length === 0 ? (
        <div className="col-span-2 flex justify-center items-center">
          There is no advert to be displayed.
        </div>
      ) : (
        <AdvertsList adverts={userAds} />
      )}
    </div>
  );
}
