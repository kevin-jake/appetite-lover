"use client";
import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import AddFoodMenuModal from "./AddFoodMenuModal";
// TODO: Add edit and delete function?
const AddFoodMenuCard = ({ foodSpotId, foodSpotName }) => {
  const [isAddFoodMenuOpen, setIsAddFoodMenuOpen] = useState(false);
  return (
    <>
      {isAddFoodMenuOpen && (
        <AddFoodMenuModal
          closeModal={() => setIsAddFoodMenuOpen(false)}
          foodSpotId={foodSpotId}
          foodSpotName={foodSpotName}
        />
      )}
      <div
        onClick={() => {
          window.scrollTo(0, 0);
          setIsAddFoodMenuOpen(true);
        }}
        className="flex flex-col items-center justify-center align-middle max-w-xs mx-4 mb-2 rounded-lg shadow-lg dark:bg-gray-600 cursor-pointer"
      >
        <div className="flex p-4 justify-center relative w-auto h-32 bg-white-500 text-gray-400 dark:text-lime-800">
          <IoMdAddCircle size={"6rem"} />
        </div>
        <div className="flex relative px-6 py-4 justify-center ">
          <h5 className="mb-3 text-xl text-center font-semibold tracking-tight text-gray-400 dark:text-lime-800 uppercase">
            Add a Food Menu
          </h5>
        </div>
      </div>
    </>
  );
};

export default AddFoodMenuCard;
