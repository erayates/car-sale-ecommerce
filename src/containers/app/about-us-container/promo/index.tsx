import Image from "next/image";
import Link from "next/link";

import { MdOutlineArrowRightAlt } from "react-icons/md";

export default function AboutUsPromo() {
  return (
    <>
      <div className="grid grid-cols-2 w-full relative mt-[16rem]">
        <div className="h-[500px] bg-promo-dark-linear relative mt-[-3rem] shadow-lg">
          <Image
            src="/assets/images/featured-cars/bmw-320.jpg"
            fill
            alt="Photo 1"
            className="object-cover opacity-40"
          />
        </div>
        <div className="h-[500px] bg-promo-light-linear relative shadow-lg">
          <Image
            src="/assets/images/featured-cars/cla-180.jpg"
            fill
            alt="Photo 1"
            className="object-cover opacity-40"
          />
        </div>
        <div className="h-[500px] bg-promo-dark-linear relative mt-[-3rem] shadow-lg">
          <Image
            src="/assets/images/featured-cars/ford-kuga.jpg"
            fill
            alt="Photo 1"
            className="object-cover opacity-40"
          />
          <div className="absolute left-8 bottom-8 flex flex-col gap-4">
            <h3 className="text-2xl text-white font-semibold">
              Phasellus porta pulvinar metus
            </h3>
            <span className="text-md text-slate-300 lg:w-[75%]">
              Phasellus porta pulvinar metus, sit amet bibendum lectus hendrerit
              vel. Duis ullamcorper, justo quis hendrerit venenatis, purus mi
              volutpat dui, vel commodo urna eros eget sapien
            </span>

            <Link
              href="/"
              className="uppercase text-orange-600 font-bold flex items-center gap-2"
            >
              Find Car <MdOutlineArrowRightAlt className="text-2xl" />
            </Link>
          </div>
        </div>
        <div className="h-[500px] bg-promo-light-linear relative shadow-lg">
          <Image
            src="/assets/images/featured-cars/golf-8.webp"
            fill
            alt="Photo 1"
            className="object-cover opacity-40"
          />
        </div>
      </div>

      <div className="bg-dark-linear py-36 mt-[-3rem] relative">
        <div className="container flex justify-evenly">
          <div className="text-center flex flex-col items-center text-white gap-2">
            <h3 className="font-bold text-5xl">12500+</h3>
            <div className="w-8 h-2 bg-orange-600"></div>
            <p className="text-sm">Sold out cars via carify.</p>
          </div>

          <div className="text-center flex flex-col items-center text-white gap-2">
            <h3 className="font-bold text-5xl">7500+</h3>
            <div className="w-8 h-2 bg-orange-600"></div>
            <p className="text-sm">Customers</p>
          </div>

          <div className="text-center flex flex-col items-center text-white gap-2">
            <h3 className="font-bold text-5xl">8000+</h3>
            <div className="w-8 h-2 bg-orange-600"></div>
            <p className="text-sm">Active ad in carify.</p>
          </div>
        </div>
      </div>
    </>
  );
}
