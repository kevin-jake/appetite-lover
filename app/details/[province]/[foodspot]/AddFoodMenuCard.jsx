"use client";
import React, { useContext, useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { ModalContext } from "@/context/ModalContext";
import FoodMenuForm from "./FoodMenuForm";
import { useUser } from "@/hooks/useUser";
import { database } from "@/libs/appwrite";
import { Query } from "appwrite";
const AddFoodMenuCard = ({ foodSpotId, foodSpotName }) => {
  const [createdBy, setCreatedBy] = useState("");
  const { openModal } = useContext(ModalContext);
  const { user } = useUser();

  useEffect(() => {
    const getSpot = async () => {
      const spot = await database.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE,
        process.env.NEXT_PUBLIC_FOOD_SPOT,
        [Query.equal("$id", [foodSpotId]), Query.limit(1)]
      );
      setCreatedBy(spot.documents[0]?.createdBy);
    };
    getSpot();
  }, [foodSpotId]);

  return (
    <>
      <div
        onClick={() => {
          openModal(
            <div className="px-6 py-6 lg:px-8">
              <h2 className="mb-4 text-4xl font-medium text-gray-900 dark:text-white">
                Add Food Menu for {foodSpotName}
              </h2>
              <FoodMenuForm foodSpotId={foodSpotId} />
            </div>
          );
        }}
        className={`${
          user?.email === createdBy || true ? "" : "hidden"
        } flex flex-col items-center justify-center align-middle max-w-xs mx-4 mb-2 rounded-lg shadow-lg dark:bg-gray-600 cursor-pointer`}
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
