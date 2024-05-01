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
import { deleteAdvert } from "@/lib/actions";
import { Divider, Popover } from "@mui/material";

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
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDeleteAdvert = async () => {
    const response = await deleteAdvert(item.id);
    if (response.ok && response.status === 200) {
      toast.success("You successfully delete an advert.");
      return;
    }
    toast.error("Something went wrong!");
  };

  const handleUnfavorite = async () => {
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
          <div className="relative">
            <button
              className="text-slate-500"
              aria-describedby={id}
              onClick={handleClick}
            >
              <HiOutlineDotsVertical />
            </button>

            <Popover
              id={id}
              open={open}
              onClose={handleClose}
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              sx={{
                fontSize: 14,
                padding: 2,
              }}
            >
              <div className="flex flex-col text-[14px] ">
                <Link
                  href={`/advert/${item.slug}`}
                  target="_blank"
                  className="p-3"
                >
                  Show Ad Page
                </Link>
                <Divider />
                {type === "favorites" ? (
                  <button
                    className="text-red-500 cursor-pointer flex gap-2 items-center"
                    onClick={handleUnfavorite}
                  >
                    <FaHeart />
                    Unfavorite
                  </button>
                ) : (
                  <>
                    <Link
                      className="text-blue-500 cursor-pointer p-3"
                      href={`/update-advert/${item.id}`}
                    >
                      Update Advert
                    </Link>
                    <Divider />
                    <button
                      className="text-red-700 cursor-pointer p-3"
                      onClick={handleDeleteAdvert}
                    >
                      Delete Advert
                    </button>
                  </>
                )}
              </div>
            </Popover>
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
