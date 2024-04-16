"use client";

import Link from "next/link";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { useUserStore } from "@/lib/userStore";

export default function AccountContainer() {
  const { currentUser } = useUserStore();

  console.log(useUserStore());
  return (
    <>
      <div className="flex flex-col gap-4 col-span-2 w-full">
        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-semibold">Account:</h3>
          <div className="flex gap-10 w-full">
            <div className="max-w-max">
              <img
                src="https://ui-avatars.com/api/?name=John+Doe"
                className="rounded-lg w-32 h-32 relative"
                alt="User Avatar"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                <p className="text-slate-500 font-semibold">Name:</p>
                <p className="font-semibold">John Doe</p>
              </div>
              <div className="flex gap-2">
                <p className="text-slate-500 font-semibold">E-mail:</p>
                <p className="font-semibold">eray.ates@outlook.com</p>
              </div>
              <div className="flex gap-2">
                <p className="text-slate-500 font-semibold">Phone:</p>
                <p className="font-semibold">+90 538 645 11 09</p>
              </div>

              <div className="flex gap-2">
                <p className="text-slate-500 font-semibold">Country:</p>
                <p className="font-semibold">Turkey</p>
              </div>

              <div className="flex gap-2">
                <p className="text-slate-500 font-semibold">Address:</p>
                <p className="font-semibold">
                  60 Stonybrook Lane Atlanta, GA 30303
                </p>
              </div>

              <Link
                href="/"
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
            <div className="flex flex-col gap-6">
              <div className="flex gap-2">
                <p className="text-slate-500 font-semibold">
                  Your Active Adverts:
                </p>
                <p className="font-semibold">12</p>
              </div>

              <div className="flex gap-2">
                <p className="text-slate-500 font-semibold">
                  Your Passive Adverts:
                </p>
                <p className="font-semibold">2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
