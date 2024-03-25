import Image from "next/image";
import { MdLocationPin } from "react-icons/md";
import { BsSpeedometer2 } from "react-icons/bs";
import { FaGasPump } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";
import { convertNumberToCurrency } from "@/libs/utils";

const items = [
  {
    id: 1,
    brand: "Renault",
    series: "Clio",
    model: "1.5 dCi Touch",
    location: "Adana, Turkey",
    price: 1000000,
    dom: 2014,
    thumbnail: "/assets/images/featured-cars/clio.jpg",
    mileage: 100000,
    fuel_type: "Diesel",
  },
  {
    id: 2,
    brand: "Ford",
    series: "Kuga",
    model: "1.5 EcoBoost Titanium ",
    location: "Istanbul, Turkey",
    price: 2500000,
    dom: 2022,
    thumbnail: "/assets/images/featured-cars/ford-kuga.jpg",
    mileage: 123456,
    fuel_type: "Diesel",
  },
  {
    id: 3,
    brand: "Mercedes-Benz",
    series: "CLA",
    model: "180 CDI AMG",
    location: "Eskişehir, Turkey",
    price: 2800000,
    dom: 2019,
    thumbnail: "/assets/images/featured-cars/cla-180.jpg",
    mileage: 46897,
    fuel_type: "Diesel",
  },
  {
    id: 4,
    brand: "Volkswagen",
    series: "Golf",
    model: "1.0 TSI Impression",
    location: "Istanbul, Turkey",
    price: 1083900,
    dom: 2023,
    thumbnail: "/assets/images/featured-cars/golf-8.webp",
    mileage: 56874,
    fuel_type: "Diesel",
  },
  {
    id: 5,
    brand: "Chery",
    series: "Tiggo 8 Pro",
    model: "1.6 TGDI Luxury",
    location: "Istanbul, Turkey",
    price: 1479000,
    dom: 2023,
    thumbnail: "/assets/images/featured-cars/tiggo-8.jpg",
    mileage: 63546,
    fuel_type: "Diesel",
  },
  {
    id: 6,
    brand: "BMW",
    series: "3 Series",
    model: "320d M Sport",
    location: "Diyarbakır, Turkey",
    price: 1029000,
    dom: 2014,
    thumbnail: "/assets/images/featured-cars/bmw-320.jpg",
    mileage: 156896,
    fuel_type: "Diesel",
  },
];

export default function FeaturedVehicles() {
  const firstItem = items[0];
  const cars = items.slice(1, items.length);
  return (
    <div className="relative container mt-24">
      <h3 className="text-3xl text-center font-bold uppercase">
        Featured Vehicles
      </h3>
      <p className="text-center text-md">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima,
        quidem!
      </p>

      <div className="grid grid-cols-3 gap-8 mt-12">
        <div className="row-auto lg:row-span-2 lg:col-span-2 shadow-lg rounded-md relative bg-gradient-to-t from-blue-800 to-black overflow-hidden">
          <Image
            src={firstItem.thumbnail}
            fill
            alt="Renault Clio"
            className="object-cover object-left opacity-40 hover:scale-105 transition-all"
          />
          <div className="absolute bottom-0 p-6 text-white flex flex-col gap-1">
            <h4 className="text-3xl font-semibold">
              {firstItem.brand} {firstItem.series} {firstItem.model}
            </h4>
            <p className="flex gap-1 text-md items-center">
              <MdLocationPin /> {firstItem.location}
            </p>
            <p className="flex gap-1 text-md items-center">
              <BsSpeedometer2 /> {firstItem.mileage} km
            </p>
            <p className="flex gap-1 text-md items-center">
              <FaGasPump /> {firstItem.fuel_type}
            </p>
          </div>
          <div className="bg-white px-4 py-4 absolute right-2 bottom-2 rounded-full font-semibold text-xl">
            ${convertNumberToCurrency(firstItem.price)}
          </div>
        </div>
        {cars.map((car, idx) => (
          <div
            className="h-64 shadow-lg rounded-md relative bg-gradient-to-t from-blue-800 to-black overflow-hidden"
            key={idx}
          >
            <Image
              src={car.thumbnail}
              fill
              alt="BMW 3.20"
              className="object-cover object-center opacity-40 hover:scale-105 transition-all"
            />
            <div className="absolute bottom-0 p-6 text-white flex flex-col ">
              <h4 className="text-lg font-semibold">
                {car.brand} {car.series} {car.model}
              </h4>
              <p className="flex gap-1 text-sm items-center">
                <MdLocationPin /> {car.location}
              </p>
              <p className="flex gap-1 text-sm items-center">
                <BsSpeedometer2 /> {car.mileage} km
              </p>
              <p className="flex gap-1 text-sm items-center">
                <FaGasPump /> {car.fuel_type}
              </p>
            </div>
            <div className="bg-white px-3 py-3 absolute right-2 bottom-2 rounded-full font-semibold text-sm">
              ${convertNumberToCurrency(car.price)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
