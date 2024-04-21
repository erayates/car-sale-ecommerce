import { convertNumberToCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import { FaLocationDot } from "react-icons/fa6";

export default function AdvertFeatures({ advert }: { advert: any }) {
  return (
    <div className="flex flex-col col-span-2 gap-4 relative">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">{advert.title}</h3>
        <div className="flex gap-2">
          <FaLocationDot />
          <p className="text-gray-400">{advert.city}, Turkey</p>
        </div>
        <hr className="mt-2" />
      </div>

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Ad Date:</p>
        <span className="text-gray-400 text-right min-w-max">
          {dayjs(advert.createdAt.miliseconds).format("DD MMM YYYY")}
        </span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Brand:</p>
        <span className="text-gray-400 text-right min-w-max">
          {advert.brand}
        </span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Model: </p>
        <span className="text-gray-400 text-right min-w-max">
          {advert.model}
        </span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Mileage: </p>
        <span className="text-gray-400 text-right min-w-max">
          {convertNumberToCurrency(parseInt(advert.mileage))} km
        </span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Fuel Type:</p>
        <span className="text-gray-400 text-right min-w-max">
          {advert.fuelType}
        </span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Gearbox:</p>
        <span className="text-gray-400 text-right min-w-max">
          {advert.gearbox}
        </span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Year of Model:</p>
        <span className="text-gray-400 text-right min-w-max">
          {advert.yearOfModel}
        </span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Car Status:</p>
        <span className="text-gray-400 text-right min-w-max">
          {advert.carStatus}
        </span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Engine Power:</p>
        <span className="text-gray-400 text-right min-w-max">
          {parseInt(advert.enginePower)} hp
        </span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Engine Size:</p>
        <span className="text-gray-400 text-right min-w-max">
          {parseInt(advert.engineSize)} cc
        </span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Color:</p>
        <span className="text-gray-400 text-right min-w-max">
          {advert.color}
        </span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Seller:</p>
        <span className="text-gray-400 text-right min-w-max">
          {advert.seller}
        </span>
      </div>
      <hr />
    </div>
  );
}
