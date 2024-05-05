import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import { BsSpeedometer2 } from "react-icons/bs";
import { FaGasPump } from "react-icons/fa6";
import { convertNumberToCurrency } from "@/lib/utils";
import Link from "next/link";

const items = [
  {
    id: 1,
    brand: "Renault",
    model: "Clio 1.5 dCi Touch",
    city: "Adana",
    price: 1000000,
    dom: 2014,
    images: ["/assets/images/featured-cars/clio.jpg"],
    mileage: 100000,
    fuelType: "Diesel",
  },
  {
    id: 2,
    brand: "Ford",
    model: "Kuga 1.5 EcoBoost Titanium ",
    city: "IstanbulTurkey",
    price: 2500000,
    dom: 2022,
    images: ["/assets/images/featured-cars/ford-kuga.jpg"],
    mileage: 123456,
    fuelType: "Diesel",
  },
  {
    id: 3,
    brand: "Mercedes-Benz",
    model: "CLA 180 CDI AMG",
    city: "Eskişehir",
    price: 2800000,
    dom: 2019,
    images: ["/assets/images/featured-cars/cla-180.jpg"],
    mileage: 46897,
    fuelType: "Diesel",
  },
  {
    id: 4,
    brand: "Volkswagen",
    model: "Golf 1.0 TSI Impression",
    city: "Istanbul",
    price: 1083900,
    dom: 2023,
    images: ["/assets/images/featured-cars/golf-8.webp"],
    mileage: 56874,
    fuelType: "Diesel",
  },
  {
    id: 5,
    brand: "Chery",
    series: "Tiggo 8 Pro",
    model: "1.6 TGDI Luxury",
    city: "Istanbul",
    price: 1479000,
    dom: 2023,
    images: ["/assets/images/featured-cars/tiggo-8.jpg"],
    mileage: 63546,
    fuelType: "Diesel",
  },
  {
    id: 6,
    brand: "BMW",
    model: "320d M Sport",
    city: "Diyarbakır",
    price: 1029000,
    dom: 2014,
    images: ["/assets/images/featured-cars/bmw-320.jpg"],
    mileage: 156896,
    fuelType: "Diesel",
  },
];

export default function FeaturedVehicles({
  featuredAds,
}: {
  featuredAds: AdvertInterface[];
}) {
  const firstItem = featuredAds[0] ?? items[0];
  const cars =
    featuredAds.length < 6
      ? items.slice(1, items.length)
      : featuredAds.slice(1, featuredAds.length);
  return (
    <div className="relative container my-48">
      <div className="flex gap-2 items-center justify-center">
        <div className="w-8 h-3 bg-orange-600"></div>
        <h3 className="text-3xl text-center font-bold uppercase">
          Featured Vehicles
        </h3>
        <div className="w-8 h-3 bg-orange-600"></div>
      </div>
      <p className="text-center text-md text-gray-400">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima,
        quidem!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <div className="group row-span-1 col-span-1 lg:row-span-2 lg:col-span-2 shadow-lg h-64 lg:h-auto rounded-md relative bg-gradient-to-t from-blue-800 to-black overflow-hidden">
          <Image
            src={firstItem.images[0]}
            fill
            alt="Renault Clio"
            className="object-cover object-left opacity-40 group-hover:scale-105 transition-all"
          />
          <div className="absolute bottom-0 p-6 text-white flex flex-col gap-1">
            <h4 className="text-lg lg:text-3xl font-semibold">
              {firstItem.brand} {firstItem.model}
            </h4>
            <p className="flex gap-1 text-md items-center">
              <MdLocationPin /> {firstItem.city + ", Turkey"}
            </p>
            <p className="flex gap-1 text-md items-center">
              <BsSpeedometer2 /> {firstItem.mileage} km
            </p>
            <p className="flex gap-1 text-md items-center">
              <FaGasPump /> {firstItem.fuelType}
            </p>
          </div>
          <div className="bg-orange-600 text-white p-3 lg:px-4 lg:py-4 absolute right-2 bottom-2 rounded-md font-semibold text-sm lg:text-xl">
            ₺ {convertNumberToCurrency(firstItem.price)}
          </div>
        </div>
        {cars.map((car, idx) => (
          <div
            className="h-64 shadow-lg rounded-md relative bg-gradient-to-t from-blue-800 to-black overflow-hidden group"
            key={idx}
          >
            <Image
              src={car.images[0]}
              fill
              alt="BMW 3.20"
              className="object-cover object-center opacity-40 group-hover:scale-105 transition-all"
            />
            <div className="absolute bottom-0 p-6 text-white flex flex-col ">
              <h4 className="text-lg font-semibold">
                {car.brand} {car.model}
              </h4>
              <p className="flex gap-1 text-sm items-center">
                <MdLocationPin /> {car.city + ", Turkey"}
              </p>
              <p className="flex gap-1 text-sm items-center">
                <BsSpeedometer2 /> {car.mileage} km
              </p>
              <p className="flex gap-1 text-sm items-center">
                <FaGasPump /> {car.fuelType}
              </p>
            </div>
            <div className="bg-orange-600 px-3 py-3 absolute right-2 bottom-2 text-white rounded-md font-semibold text-sm">
              ${convertNumberToCurrency(car.price)}
            </div>
          </div>
        ))}
      </div>

      <div className="flex  mt-5">
        <Link
          className="px-8 py-4 bg-orange-600 text-white font-semibold text-md rounded-md mx-auto hover:scale-105 transition-all hover:bg-orange-700 "
          href="/search"
        >
          Show All Cars
        </Link>
      </div>
    </div>
  );
}
