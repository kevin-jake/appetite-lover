import { database } from "@/libs/appwrite";
import { Query } from "appwrite";
import React from "react";
import AreaContent from "./AreaContent";
import SearchFoodSpot from "./SearchFoodSpot";

const getAreaId = async (area) => {
  const areas = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_AREA,
    [Query.equal("areaName", [area])]
  );
  return areas.documents[0] || {};
};

const getFoodSpots = async (area, pageNumber = 0, search = "") => {
  const { $id: areaId } = await getAreaId(area);
  const spots = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_FOOD_SPOT,
    [
      Query.equal("areaId", areaId),
      Boolean(search)
        ? Query.search("foodSpotName", search)
        : Query.equal("areaId", areaId),
      Query.orderDesc("ratings"),
      Query.limit(10),
      Query.offset(10 * pageNumber),
    ]
  );
  return { ...spots, areaId };
};

const AreaPage = async ({ params, searchParams }) => {
  const area = decodeURI(params.area);
  const {
    documents: foodSpots,
    total,
    areaId,
  } = await getFoodSpots(
    area,
    +searchParams?.page - 1 || 0,
    searchParams.search
  );

  return (
    <div className="p-4 max-w-full max-h-full">
      <div className="bg-white w-full rounded-lg shadow dark:bg-gray-700">
        <div className="flex flex-col items-center gap-4 md:gap-0 md:flex-row md:justify-between p-5 border-b rounded-t dark:border-gray-600">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Food spots in {area}
          </h3>
          <div className="flex w-full md:w-1/2">
            <SearchFoodSpot searchInput={searchParams?.search} area={area} />
          </div>
        </div>
        <AreaContent
          areaId={areaId}
          area={area}
          foodSpots={foodSpots}
          currentPage={+searchParams.page}
          totalResults={total}
        />
      </div>
    </div>
  );
};

export default AreaPage;
