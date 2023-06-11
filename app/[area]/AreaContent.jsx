"use client";
import React, { useContext } from "react";
import FoodSpotCards from "../(home)/FoodSpotCards";
import Pagination from "./Pagination";
import { useRouter } from "next/navigation";
import NoResults from "@/components/NoResults";
import FoodSpotForm from "../(home)/FoodSpotForm";
import { useUser } from "@/hooks/useUser";
import { ModalContext } from "@/context/ModalContext";

const AreaContent = ({
  foodSpots,
  currentPage,
  totalResults,
  area,
  areaId,
}) => {
  const router = useRouter();
  const { user } = useUser();
  const { openModal } = useContext(ModalContext);
  return (
    <div className="flex flex-col gap-4 p-4 justify-center">
      {foodSpots.map((item, index) => (
        <div
          key={`${item.foodSpotName}-${index}`}
          className="cursor-pointer"
          onClick={() => router.push(`/${area}/${item.$id}`)}
        >
          <FoodSpotCards
            name={item.foodSpotName}
            description={item.description}
            imgUrl={item.imgUrl || "/placeholder-image.jpg"}
          />
        </div>
      ))}
      {foodSpots.length === 0 && <NoResults />}
      {user && (
        <div className="flex justify-center w-full">
          <div className="flex justify-center w-full md:w-1/4">
            <button
              onClick={() => {
                openModal(
                  <div className="px-6 py-6 lg:px-8">
                    <h2 className="mb-4 text-4xl font-medium text-gray-900 dark:text-white">
                      Add Food Spot for {area}
                    </h2>
                    <FoodSpotForm areaId={areaId} area={area} />
                  </div>
                );
              }}
              className="flex justify-center my-4 text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Add a Food Spot
            </button>
          </div>
        </div>
      )}

      {Boolean(currentPage) && (
        <Pagination
          currentPage={currentPage > totalResults ? totalResults : currentPage}
          totalPages={Math.ceil(totalResults / 10)}
          area={area}
        />
      )}
    </div>
  );
};

export default AreaContent;
