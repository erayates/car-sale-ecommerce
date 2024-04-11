import { FaLocationDot } from "react-icons/fa6";

export default function AdvertFeatures() {
  return (
    <div className="flex flex-col col-span-2 gap-4 relative">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">
          Sahibinden Temiz Renault Clio 1.5 dCi
        </h3>
        <div className="flex gap-2">
          <FaLocationDot />
          <p className="text-gray-400">Ankara, Turkey</p>
        </div>
        <hr className="mt-2" />
      </div>

      <div className="flex items-center gap-1 w-full justify-between">
        <p>Ad No:</p>
        <span className="text-gray-400 text-right  min-w-max">123456789</span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Ad Date:</p>
        <span className="text-gray-400 text-right min-w-max">
          11 April 2024
        </span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Brand:</p>
        <span className="text-gray-400 text-right min-w-max">Renault</span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Series:</p>
        <span className="text-gray-400 text-right min-w-max">Clio</span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Model: </p>
        <span className="text-gray-400 text-right min-w-max">1.5 dCi</span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Mileage: </p>
        <span className="text-gray-400 text-right min-w-max">150.000 km</span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Fuel Type:</p>
        <span className="text-gray-400 text-right min-w-max">Diesel</span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Gearbox:</p>
        <span className="text-gray-400 text-right min-w-max">Manuel</span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Year of Model:</p>
        <span className="text-gray-400 text-right min-w-max">2015</span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Car Status:</p>
        <span className="text-gray-400 text-right min-w-max">Second Hand</span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Engine Power:</p>
        <span className="text-gray-400 text-right min-w-max">75 hp</span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Engine Size:</p>
        <span className="text-gray-400 text-right min-w-max">1995 cc</span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Color:</p>
        <span className="text-gray-400 text-right min-w-max">White</span>
      </div>
      <hr />

      <div className="flex items-center gap-1 w-full justify-between">
        <p className="w-full">Seller:</p>
        <span className="text-gray-400 text-right min-w-max">From Owner</span>
      </div>
      <hr />
    </div>
  );
}
