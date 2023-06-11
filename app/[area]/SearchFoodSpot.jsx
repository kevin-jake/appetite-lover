"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchFoodSpot = ({ area, searchInput }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (searchInput) setInputValue(searchInput);
    else setInputValue("");
  }, [searchInput]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/${area}?page=1&search=${inputValue}`);
      }}
      className="w-full"
    >
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <AiOutlineSearch size={18} className="text-gray-700" />{" "}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search foodspot"
          className="block w-full p-4 pl-10 text-sm focus:outline-none focus:ring-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-500 focus:border-emerald-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-emerald-500 dark:focus:border-emerald-500"
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchFoodSpot;
