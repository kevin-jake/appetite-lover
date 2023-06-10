"use client";
import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

const SearchArea = ({
  areas,
  areaSelected,
  onSearch,
  handleMouseHover,
  handleMouseLeave,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (areaSelected) setSelected(areaSelected);
    else setSelected("");
  }, [areaSelected]);

  return (
    <div className={`w-full font-medium ${!open ? "h-20" : "h-80"}`}>
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          !selected ? "text-gray-400" : "text-gray-700"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Select Area"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter area name"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {areas?.map((area) => (
          <li
            onMouseEnter={(event) => handleMouseHover(event)}
            onMouseLeave={(event) => handleMouseLeave(event)}
            key={area?.areaName}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
              ${
                area?.areaName?.toLowerCase() === selected?.toLowerCase() &&
                "bg-sky-600 text-white"
              }
              ${
                area?.areaName?.toLowerCase().startsWith(inputValue)
                  ? "block"
                  : "hidden"
              }`}
            onClick={() => {
              if (area?.areaName?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(area?.areaName);
                setOpen(false);
                onSearch(area?.areaName);
                setInputValue("");
              }
            }}
          >
            {area?.areaName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchArea;
