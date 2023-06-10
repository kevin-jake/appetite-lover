import FoodSpotCards from "@/app/(home)/FoodSpotCards";
import { database } from "@/libs/appwrite";
import { Query } from "appwrite";
import React from "react";

const getAreaId = async (area) => {
  const areas = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_AREA,
    [Query.equal("areaName", [area])]
  );
  return areas.documents[0] || {};
};

const getFoodSpots = async (area, pageNumber = 0) => {
  const { $id: areaId } = await getAreaId(area);
  const spots = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_FOOD_SPOT,
    [
      Query.equal("areaId", [areaId]),
      Query.orderDesc("ratings"),
      Query.limit(10),
      Query.offset(10 * pageNumber),
    ]
  );
  return spots.documents;
};

const AreaPage = async ({ params, searchParams }) => {
  const foodSpots = await getFoodSpots(
    decodeURI(params.area),
    searchParams.page
  );

  return (
    <div className="p-4 max-w-full max-h-full">
      <div className="bg-white w-full rounded-lg shadow dark:bg-gray-700">
        <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Food spots in {decodeURI(params.area)}
          </h3>
        </div>
        <div className="flex flex-col gap-4 p-4 justify-center">
          {foodSpots.map((item, index) => (
            <div
              key={`${item.foodSpotName}-${index}`}
              className="cursor-pointer"
            >
              <FoodSpotCards
                name={item.foodSpotName}
                description={item.description}
                ratings={item.ratings}
                imgUrl={item.imgUrl || "/placeholder-image.jpg"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AreaPage;
