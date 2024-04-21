"use client";

import { convertNumberToCurrency } from "@/lib/utils";
import Image from "next/image";
import { FaCar } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useRef, useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

import dayjs from "dayjs";
import { auth } from "@/lib/firebase/auth";
import { toast } from "react-toastify";
import Link from "next/link";

interface AdvertSingleItemProps {
  item: any;
  index: number;
  type: string;
}

const AdvertSingleItem: React.FC<AdvertSingleItemProps> = ({
  item,
  index,
  type,
}) => {
  const [openActions, setOpenActions] = useState(false);
  const actionsDiv = useRef<HTMLDivElement>(null);
  const unfavoriteButton = useRef<HTMLButtonElement>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionsDiv.current) {
        setOpenActions(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (openActions) {
      unfavoriteButton.current.addEventListener("click", handleUnfavorite);
    }
  }, [openActions]);

  const onActionsButtonClick = () => {
    setOpenActions((prev) => !prev);
  };

  const handleUnfavorite = async () => {
    console.log("test");
    const response = await fetch(`/api/v1/adverts/${item.id}`, {
      method: "POST",
      body: JSON.stringify({
        favorite: {
          isFavorite: false,
          uid: auth.currentUser.uid,
        },
      }),
    });

    const resData = await response.json();

    if (response.ok && response.status === 200) {
      toast.success(resData.message);
      return;
    }

    toast.error("Something went wrong! Please try again.");
  };

  return (
    <div className="shadow-md w-full p-4 rounded-lg grid grid-cols-3 gap-6 relative">
      <div className="">
        <Image
          src={item.images[0]}
          alt={item.title}
          width={192}
          height={192}
          className="rounded-lg"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <div className="flex justify-between gap-4">
          <h3 className="font-semibold">
            {item.title} {index}
          </h3>
          <div className="relative" ref={actionsDiv}>
            <button className="text-slate-500" onClick={onActionsButtonClick}>
              <HiOutlineDotsVertical />
            </button>
            {openActions && (
              <div className="shadow-md absolute text-sm p-4 bg-white z-30 left-[-100px] md:left-0 rounded-lg min-w-[140px] transition-all">
                <ul className="flex flex-col gap-2">
                  <li className="cursor-pointer">
                    <Link href={`/advert`}>Show Ad Page</Link>
                  </li>
                  {type === "favorites" ? (
                    <button
                      className="text-red-500 cursor-pointer flex gap-2 items-center"
                      ref={unfavoriteButton}
                    >
                      <FaHeart />
                      Unfavorite
                    </button>
                  ) : (
                    <>
                      <li className="text-blue-500 cursor-pointer">
                        Update Advert
                      </li>
                      <li className="text-red-700 cursor-pointer">
                        Delete Advert
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <FaCar />
          <p className="text-slate-500 text-sm"> Renault, Clio</p>
        </div>

        <div className="flex gap-2 items-center">
          <IoSpeedometerOutline />
          <p className="text-slate-500 text-sm">
            {convertNumberToCurrency(item.mileage)} km
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <FaCalendarAlt />
          <p className="text-slate-500 text-sm">
            {dayjs.unix(item.createdAt.seconds).format("DD MMM YYYY")}
          </p>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 rounded-lg flex items-center">
        <p className="bg-orange-600 text-white font-semibold  px-4 py-2 rounded-br-lg rounded-tl-lg">
          $ {convertNumberToCurrency(item.price)}
        </p>
      </div>
    </div>
  );
};

export default AdvertSingleItem;
