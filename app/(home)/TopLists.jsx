"use client";
import React, { useContext, useEffect, useState } from "react";
import FoodSpotCards from "./FoodSpotCards";
import { Query } from "appwrite";
import { database } from "@/libs/appwrite";
import NoResults from "@/components/NoResults";
import Loading from "@/components/Loading";
import FoodSpotForm from "./FoodSpotForm";
import { ModalContext } from "@/context/ModalContext";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";

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
    [
      Query.equal("areaId", [areaId]),
      Query.orderDesc("ratings"),
      Query.limit(10),
    ]
  );
  const highestRating = +toplists.documents[0]?.ratings;
  toplists.documents.forEach(
    (foodSpot) => (foodSpot.ratings = (+foodSpot.ratings / highestRating) * 5)
  );
  return { lists: toplists.documents, areaId };
};

const TopLists = ({ area, closeTopList, isFromContent }) => {
  const router = useRouter();
  const [toplists, setToplists] = useState([]);
  const [uniqueArea, setUniqueArea] = useState("");
  const { openModal, refetch, refetchTopList } = useContext(ModalContext);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getList = async () => {
      try {
        const { lists, areaId } = await getTopLists(area);
        setUniqueArea(areaId);
        setToplists(lists);
      } catch (error) {
        toast.error(error.message);
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (refetch) {
      getList();
      refetchTopList();
    }
  }, [area, refetch]);
  return (
    <>
      <div
        id="top-left-modal"
        data-modal-placement="top-left"
        tabIndex="-1"
        className="flex justify-center relative z-10 w-full px-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full"
      >
        <div className=" max-w-full max-h-full">
          <div className=" bg-white w-full rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Top 10 Food Spots in
                {isFromContent ? (
                  <>{` ${area}`}</>
                ) : (
                  <Link href={`/${area}?page=1`}>
                    <button className="m-2 p-1 font-bold text-blue-500 border-b-2 border-blue-500 hover:border-emerald-600 hover:text-emerald-600">
                      {area}
                    </button>
                  </Link>
                )}
              </h3>
              {!isFromContent && (
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
              )}
            </div>
            {loading ? (
              <Loading />
            ) : (
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
            )}
            {toplists.length === 0 && !loading && <NoResults />}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopLists;
