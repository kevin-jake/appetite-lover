import React from "react";
import { MdNoFood } from "react-icons/md";

const NoResults = () => {
  return (
    <div className="flex flex-col justify-center items-center h-40 w-full">
      <MdNoFood size="1.7rem" color="gray" />
      <h5 className="p-5 text-gray-400">No results found.</h5>
    </div>
  );
};

export default NoResults;
