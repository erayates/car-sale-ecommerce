"use client";

import { useEffect, useState } from "react";
import AdvertSingleItem from "./advert-single-item";
import Pagination from "@/components/ui/pagination";

export default function AdvertsList({
  adverts,
  type,
}: {
  adverts: any;
  type?: string;
}) {
  const [items, setItems] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    setItems(adverts.slice(startIndex, endIndex));
  }, [adverts, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-6 mt-8">
      {items.map((item: any, idx: number) => (
        <AdvertSingleItem item={item} key={idx} index={idx} type={type} />
      ))}

      <Pagination
        totalItems={adverts?.length}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
