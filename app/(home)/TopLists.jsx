"use client";
import React, { useEffect, useState } from "react";
import FoodSpotCards from "./FoodSpotCards";
import { Query } from "appwrite";
import { database } from "@/libs/appwrite";
import NoResults from "../(shared)/NoResults";
import Loading from "../(shared)/Loading copy";

const getAreaId = async (area) => {
  const areas = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_AREA,
    [Query.equal("areaName", [area])]
  );
  return areas.documents[0] || {};
};

const getTopLists = async (area) => {
  const { $id: areaId } = await getAreaId(area);
  const toplists = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_FOOD_SPOT,
    [Query.equal("areaId", [areaId])]
  );
  return toplists.documents;
};
const TopLists = ({ colNumber = 2, area, closeTopList }) => {
  const [toplists, setToplists] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("🚀 ~ file: TopLists.jsx:30 ~ TopLists ~ loading:", loading);

  useEffect(() => {
    const getList = async () => {
      setLoading(true);
      const lists = await getTopLists(area);
      setToplists(lists);
      setLoading(false);
    };

    getList();
  }, [area]);

  return (
    <div
      id="top-left-modal"
      data-modal-placement="top-left"
      tabIndex="-1"
      className="flex justify-center relative z-10 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full"
    >
      <div className=" max-w-full max-h-full">
        <div className=" bg-white w-full rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Top 10 Food Spots on {area}
            </h3>
            <button
              type="button"
              onClick={closeTopList}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="top-left-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className={`grid grid-cols-${colNumber} gap-4 p-6`}>
              {toplists.map((item) => (
                <FoodSpotCards
                  key={item.foodSpotName}
                  name={item.foodSpotName}
                  foodSpotId={item.$id}
                  imgUrl={item.imgUrl}
                  area={area}
                />
              ))}
            </div>
          )}
          {toplists.length === 0 && !loading && <NoResults />}
        </div>
      </div>
    </div>
  );
};

export default TopLists;
