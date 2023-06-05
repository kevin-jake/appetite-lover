"use client";
import React, { useContext } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { ModalContext } from "@/context/ModalContext";
import AddFoodMenuForm from "./AddFoodMenuForm";
// TODO: Add edit and delete function?
const AddFoodMenuCard = ({ foodSpotId, foodSpotName }) => {
  const { openModal } = useContext(ModalContext);
  return (
    <>
      <div
        onClick={() => {
          openModal(
            <div className="px-6 py-6 lg:px-8">
              <h2 className="mb-4 text-4xl font-medium text-gray-900 dark:text-white">
                Add Food Menu for {foodSpotName}
              </h2>
              <AddFoodMenuForm foodSpotId={foodSpotId} />
            </div>
          );
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
