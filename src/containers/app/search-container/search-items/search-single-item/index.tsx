"use client";

import { convertNumberToCurrency } from "@/lib/utils";
import Image from "next/image";
import { FaCar } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { TbManualGearbox } from "react-icons/tb";
import { BsFillFuelPumpFill } from "react-icons/bs";

import dayjs from "dayjs";
import Link from "next/link";

interface SearchSingleItemProps {
  item: any;
  index: number;
}

const SearchSingleItem: React.FC<SearchSingleItemProps> = ({ item, index }) => {
  return (
    <Link href={`/advert/${item.slug}`}>
      <div className="shadow-md w-full p-4 rounded-lg grid grid-cols-3 gap-6 relative">
        <div className="relative w-full h-[200px]">
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <div className="flex justify-between gap-4">
            <h3 className="font-semibold">
              {item.title} {index}
            </h3>
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
            <MdLocationPin />
            <p className="text-slate-500 text-sm">{item.city}, Turkey</p>
          </div>

          <div className="flex gap-2 items-center">
            <FaCalendarAlt />
            <p className="text-slate-500 text-sm">
              {dayjs.unix(item.createdAt.seconds).format("DD MMM YYYY")}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <TbManualGearbox />
            <p className="text-slate-500 text-sm">{item.gearbox}</p>
          </div>

          <div className="flex gap-2 items-center">
            <BsFillFuelPumpFill />
            <p className="text-slate-500 text-sm">{item.fuelType}</p>
          </div>
        </div>

        <div className="absolute right-0 bottom-0 rounded-lg flex items-center">
          <p className="bg-orange-600 text-white font-semibold  px-4 py-2 rounded-br-lg rounded-tl-lg">
            $ {convertNumberToCurrency(item.price)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchSingleItem;
