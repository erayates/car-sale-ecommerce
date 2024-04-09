import React, { useState } from "react";

interface PaginationProps {
  totalItems: number;
  rowsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  rowsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={`cursor-pointer inline-block px-3 py-2 mx-1 border rounded ${
            currentPage === i
              ? "bg-blue-500 text-white font-semibold"
              : "hover:bg-gray-400 hover:text-white text-semibold"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <ul className="flex justify-center space-x-2 mt-4">
      {renderPageNumbers()}
    </ul>
  );
};

export default Pagination;
