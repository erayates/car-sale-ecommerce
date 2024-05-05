"use client";

import { useUserStore } from "@/providers/userProvider";
import { UserType } from "@/types/user";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function AccountContainer({
  adverts,
}: {
  adverts: AdvertInterface[];
}) {
  const currentUser = useUserStore((state) => state.currentUser as UserType);
  const loading = useUserStore((state) => state.isLoading as boolean);
  if (loading) {
    return <CircularProgress />;
  }

  const userActiveAds = adverts?.filter(
    (ad) => ad.uid === currentUser.uid && ad.status === "approved"
  ).length;

  const userPassiveAds = adverts?.filter(
    (ad) =>
      ad.uid === currentUser.uid &&
      (ad.status === "denied" || ad.status === "pending")
  ).length;

  return (
    <>
      <div className="flex flex-col gap-4 col-span-2 w-full">
        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-semibold">Account:</h3>
          <div className="flex gap-4 lg:gap-10 w-full">
            <div className="max-w-max relative">
              <Image
                src={currentUser.avatar}
                className="rounded-lg relative"
                width={128}
                height={128}
                alt="User Avatar"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                <p className="text-slate-500 font-semibold">Name:</p>
                <p className="font-semibold">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
              </div>

              <div className="flex gap-2">
                <p className="text-slate-500 font-semibold">E-mail:</p>
                <p className="font-semibold">{currentUser?.email}</p>
              </div>

              <div className="flex gap-2">
                <p className="text-slate-500 font-semibold">Phone:</p>
                <p className="font-semibold">{currentUser.phone}</p>
              </div>

              <div className="flex gap-2">
                <p className="text-slate-500 font-semibold">Country:</p>
                <p className="font-semibold">{currentUser.address.country}</p>
              </div>

              <div className="flex gap-2">
                <p className="text-slate-500 font-semibold">Province:</p>
                <p className="font-semibold">{currentUser.address.province}</p>
              </div>

              <div className="flex gap-2">
                <p className="text-slate-500 font-semibold">Address:</p>
                <p className="font-semibold">
                  {currentUser.address.addressLine}
                </p>
              </div>

              <Link
                href="/account/update-account"
                className="uppercase text-red-700 font-bold flex gap-2 items-center"
              >
                Change Account Information{" "}
                <MdOutlineArrowRightAlt className="text-2xl" />
              </Link>
            </div>
          </div>
          <hr className="mt-8" />
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-semibold">Advert History:</h3>
          <div className="flex gap-10 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <p className="text-slate-500 font-semibold">
                  Your Active Adverts:
                </p>
                <p className="font-semibold bg-blue-500 px-4 rounded-md py-1 text-white font-semibold">
                  {userActiveAds}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <p className="text-slate-500 font-semibold">
                  Your Passive Adverts:
                </p>
                <p className="font-semibold bg-red-500 px-4 rounded-md py-1 text-white font-semibold">
                  {userPassiveAds}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
