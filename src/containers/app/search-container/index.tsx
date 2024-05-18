"use client";

import PageHero from "@/components/page-hero";
import SearchFilter from "./search-filter";
import SearchItems from "./search-items";
import SearchInput from "./search-input";
import { useEffect, useState } from "react";
import SearchNoResult from "./search-no-result";

export default function SearchContainer({ items }: { items: any }) {
  const [filteredAds, setFilteredAds] = useState(items);

  useEffect(() => {
    setFilteredAds(items);
  }, [items]);

  return (
    <>
      <PageHero title="Find Your Dream Car" />
      <div className="container my-16 grid grid-cols-3 gap-12">
        <SearchFilter />

        <div className="col-span-3 md:col-span-2">
          <SearchInput setFilteredAds={setFilteredAds} adverts={items} />
          {filteredAds.length === 0 ? (
            <SearchNoResult />
          ) : (
            <SearchItems adverts={filteredAds} />
          )}
        </div>
      </div>
    </>
  );
}
