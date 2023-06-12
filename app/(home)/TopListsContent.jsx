"use client";
import React, { useContext } from "react";
import FoodSpotCards from "./FoodSpotCards";
import NoResults from "@/components/NoResults";
import FoodSpotForm from "./FoodSpotForm";
import { ModalContext } from "@/context/ModalContext";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const TopListsContent = ({ area, isFromContent, toplists, uniqueArea }) => {
  const router = useRouter();
  const { openModal } = useContext(ModalContext);
  const { user } = useUser();

  return (
    <>
      <div className="flex flex-col justify-center items-center align-middle">
        <div
          className={`grid grid-cols-1 gap-4 p-6 ${
            isFromContent ? "" : "md:grid-cols-2"
          }`}
        >
          {toplists.map((item, index) => (
            <div
              key={`${item.foodSpotName}-${index}`}
              className="cursor-pointer"
              onClick={() => router.push(`/${area}/${item.$id}`)}
            >
              <FoodSpotCards
                rank={index + 1}
                name={item.foodSpotName}
                description={item.description}
                ratings={item.ratings}
                imgUrl={item.imgUrl || "/placeholder-image.jpg"}
              />
            </div>
          ))}
        </div>
        {!isFromContent && user && (
          <button
            onClick={() => {
              openModal(
                <div className="px-6 py-6 lg:px-8">
                  <h2 className="mb-4 text-4xl font-medium text-gray-900 dark:text-white">
                    Add Food Spot for {area}
                  </h2>
                  <FoodSpotForm areaId={uniqueArea} area={area} />
                </div>
              );
            }}
            className="flex justify-center my-4 w-2/3 text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Add a Food Spot
          </button>
        )}
      </div>
      {toplists.length === 0 && <NoResults />}
    </>
  );
};

export default TopListsContent;
