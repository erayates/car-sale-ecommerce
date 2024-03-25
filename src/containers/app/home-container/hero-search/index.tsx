"use client";

import * as React from "react";

import { Slider } from "@mui/material";
import { CgArrowLongRight } from "react-icons/cg";

export default function HeroSearch() {
  const [value, setValue] = React.useState([500000, 5000000]);

  const handleChange = (
    event: Event,
    newValue: React.SetStateAction<number[]>
  ) => {
    setValue(newValue);
  };

  return (
    <div className="relative container bg-slate-900 p-12 flex items-center gap-8 mt-[-6rem]">
      <div className="flex flex-col gap-2 w-64">
        <label htmlFor="brand" className=" text-white font-semibold">
          Brand:
        </label>
        <select
          className="p-4 outline-none rounded-md text-slate-900"
          name="brand"
        >
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
          <option value="bmw">BMW</option>
          <option value="mercedes">Mercedes</option>
        </select>
      </div>

      <div className="flex flex-col gap-2 w-64">
        <label htmlFor="search_input" className=" text-white font-semibold">
          Model:
        </label>
        <select className="p-4 outline-none rounded-md text-slate-900">
          <option value="2000" className="px-4">
            2000
          </option>
          <option value="2001">2001</option>
          <option value="2002">2002</option>
          <option value="2003">2003</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="search_input" className=" text-white font-semibold">
          Price:
        </label>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          className="w-64"
          max={5000000}
          min={500000}
        />
      </div>

      <div className="flex items-center relative">
        <button className="text-white bg-amber-500 py-4 px-8 w-fit rounded-md text-sm font-semibold flex items-center gap-4 hover:scale-105 transition-all">
          Find Car <CgArrowLongRight className="text-2xl" />
        </button>
      </div>
      <h3 className="uppercase text-5xl absolute right-0 top-0 font-bold text-white mt-[-46px] shadow-lg">
        Find Your Dream Car
      </h3>
    </div>
  );
}
