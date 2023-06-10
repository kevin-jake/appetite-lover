"use client";
import { ModalContext } from "@/context/ModalContext";
import { useUser } from "@/hooks/useUser";
import React, { useContext } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import FoodMenuForm from "./FoodMenuForm";
import DeleteModal from "@/components/DeleteModal";

const MenuCardButtons = ({ foodMenu }) => {
  const { user } = useUser();
  const { openModal } = useContext(ModalContext);
  return (
    <div className="relative flex justify-center pt-2 gap-3">
      <button
        type="button"
        className={user?.email !== foodMenu?.createdBy ? "hidden" : ""}
        onClick={() => {
          openModal(
            <div className="px-6 py-6 lg:px-8">
              <h2 className="mb-4 text-4xl font-medium text-gray-900 dark:text-white">
                Edit {foodMenu.foodName}
              </h2>
              <FoodMenuForm
                foodSpotId={foodMenu.foodSpotId}
                isEdit={true}
                oldData={{
                  foodName: foodMenu.foodName,
                  description: foodMenu.description,
                  price: foodMenu.price,
                  imgUrl: foodMenu?.imgUrl,
                  $id: foodMenu.$id,
                }}
              />
            </div>
          );
        }}
      >
        <span className="block cursor-pointer text-gray-800 bg-gray-300 dark:bg-gray-500 select-none rounded-xl p-2 text-center dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-blue-400">
          <MdEdit />
        </span>
      </button>
      <button
        type="button"
        className={user?.email !== foodMenu?.createdBy ? "hidden" : ""}
        onClick={() =>
          openModal(
            <DeleteModal
              collectionId={process.env.NEXT_PUBLIC_FOOD_MENU}
              name={foodMenu.foodName}
              documentId={foodMenu.$id}
            />
          )
        }
      >
        <span className="block cursor-pointer text-gray-800 bg-gray-300 dark:bg-gray-500 select-none rounded-xl p-2 text-center dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-blue-400">
          <MdDelete />
        </span>
      </button>
    </div>
  );
};

export default MenuCardButtons;
