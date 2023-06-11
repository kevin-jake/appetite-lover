"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Pagination = ({ currentPage, totalPages, area }) => {
  const router = useRouter();
  const [displayRange, setDisplayRange] = useState(2);
  const isFirstPage = currentPage === 1 || currentPage === 0;
  const isLastPage = currentPage === totalPages;

  useEffect(() => {
    const adjustPages = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 500) {
        setDisplayRange(0);
      } else {
        setDisplayRange(2);
      }
    };

    adjustPages();
    window.addEventListener("resize", adjustPages);
    return () => {
      window.removeEventListener("resize", adjustPages);
    };
  }, []);

  const handlePrevPage = () => {
    if (!isFirstPage) {
      router.push(`/${area}?page=${currentPage - 1}`);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      router.push(`/${area}?page=${currentPage - 1}`);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    let startRange = Math.max(1, currentPage - displayRange);
    let endRange = Math.min(totalPages, currentPage + displayRange);

    // Add ellipsis if there are more pages before or after the range
    if (startRange > 1) {
      pageNumbers.push(1);
      if (startRange > 2) {
        pageNumbers.push("...");
      }
    }

    for (let i = startRange; i <= endRange; i++) {
      pageNumbers.push(i);
    }

    if (endRange < totalPages) {
      if (endRange < totalPages - 1) {
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const handlePageClick = (pageNumber) => {
    if (pageNumber !== "..." && pageNumber !== currentPage) {
      router.push(`/${area}?page=${pageNumber}`);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-1">
      <button
        onClick={handlePrevPage}
        disabled={isFirstPage}
        className={`py-2 px-4 rounded-md text-sm ${
          isFirstPage
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-emerald-700 text-white hover:bg-emerald-600 cursor-pointer"
        }`}
      >
        {"<"}
      </button>
      <div className="flex space-x-1">
        {getPageNumbers().map((pageNumber, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(pageNumber)}
            disabled={pageNumber === "..." || pageNumber === currentPage}
            className={`py-2 px-4 rounded-md text-sm ${
              pageNumber === currentPage
                ? "bg-emerald-700 text-white"
                : pageNumber === "..."
                ? "cursor-default"
                : "bg-gray-200 hover:bg-emerald-600 hover:text-white cursor-pointer"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        onClick={handleNextPage}
        disabled={isLastPage}
        className={`py-2 px-4 rounded-md text-sm ${
          isLastPage
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-emerald-700 text-white hover:bg-emerald-600 cursor-pointer"
        }`}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
