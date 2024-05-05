"use client";

import { useEffect, useState } from "react";
import Pagination from "@/components/ui/pagination";
import SearchSingleItem from "./search-single-item";

export default function SearchList({ adverts }: { adverts: any }) {
  const [items, setItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setItems(adverts.slice(startIndex, endIndex));
  }, [adverts, currentPage, rowsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-6 mt-8 w-full">
      {items.map((item: any, idx: number) => (
        <SearchSingleItem item={item} key={idx} index={idx} />
      ))}

      <Pagination
        totalItems={adverts?.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
