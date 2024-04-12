import * as React from "react";

import { FaShieldAlt, FaBriefcase, FaUserPlus } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoDiamond } from "react-icons/io5";

const items = [
  {
    title: "Secured Payment Guarantee",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, consectetur.",
    icon: <FaShieldAlt />,
  },
  {
    title: "Help Center & Support 24/7",
    description: "Sed aliquet accumsan orci, at dictum lectus vestibulum",
    icon: <TfiHeadphoneAlt />,
  },
  {
    title: "Buy or Sell any Class Vehicles",
    description:
      "Vestibulum at ultrices elit. Maecenas faucibus vulputate vestibulum",
    icon: <FaShieldAlt />,
  },
  {
    title: "Corporate and Business Services",
    description:
      "Vestibulum at ultrices elit. Maecenas faucibus vulputate vestibulum",
    icon: <FaBriefcase />,
  },
  {
    title: "Car Sharing Options",
    description: "Sed aliquet accumsan orci, at dictum lectus vestibulum",
    icon: <FaUserPlus />,
  },
  {
    title: "Limousine and Chauffeur Hire",
    description:
      "Vestibulum at ultrices elit. Maecenas faucibus vulputate vestibulum",
    icon: <IoDiamond />,
  },
];

export default function WhyUs({ color }: { color: string }) {
  const containerClasses =
    color === "dark"
      ? "bg-dark-linear w-full mt-10 py-12 flex flex-col items-center gap-16 pb-96 text-white"
      : "w-full mt-10 py-12 flex flex-col items-center gap-16 pb-96 text-black";
  return (
    <div className="flex flex-col items-center ">
      <div className={containerClasses}>
        <div className="flex items-center gap-6 mt-4">
          <div className="bg-orange-600 w-8 h-3"></div>
          <h3 className="text-4xl text-center uppercase font-semibold">Why Us</h3>
          <div className="bg-orange-600 w-8 h-3"></div>
        </div>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-4 text-center items-center justify-between"
              >
                <div className="text-orange-600 text-4xl">{item.icon}</div>
                <h4 className="text-bold text-2xl">{item.title}</h4>
                <p className="text-md">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-[-16rem] w-full flex justify-center">
        <iframe
          className="w-[800px] h-[500px]"
          src="https://www.youtube.com/embed/LQVIfeEehYQ?si=kvUevND1oZYSXZih"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
