"use client";

import { Dispatch, SetStateAction } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchInput({
  setFilteredAds,
  adverts,
}: {
  setFilteredAds: Dispatch<SetStateAction<[]>>;
  adverts: any;
}) {
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value.toLowerCase();

    const filteredAds = searchText
      ? adverts.filter((ad: AdvertInterface) =>
          ad.title.toLowerCase().includes(searchText)
        )
      : adverts;

    setFilteredAds(filteredAds);
  };

  return (
    <div className="relative">
      <BsSearch
        style={{
          fontSize: 18,
          position: "absolute",
          top: "18px",
          left: "12px",
          color: "gray",
        }}
      />
      <input
        className="border border-gray p-4 pl-10 rounded-md w-full bg-transparent outline-none text-gray-500"
        placeholder="Start searching a car..."
        type="text"
        onChange={handleSearchInputChange}
      />
    </div>
  );
}
