import React from "react";
import Content from "./Content";
import TopLists from "@/app/(home)/TopLists";
import { Query } from "appwrite";
import { database } from "@/libs/appwrite";

const getAreaId = async (areaId) => {
  const area = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_AREA,
    [Query.equal("$id", [areaId])]
  );
  return area.documents[0].areaName;
};

const getSpot = async (foodspotId) => {
  const spot = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_FOOD_SPOT,
    [Query.equal("$id", [foodspotId])]
  );
  return spot.documents[0];
};

const Spot = async ({ params }) => {
  const spot = await getSpot(params.foodspot);
  const areaName = await getAreaId(spot.areaId);

  if (!spot) {
    return <div>Food Spot Not Found</div>;
  }

  return (
    <main className="px-10 leading-7">
      <div className="md:flex gap-10 mb-5">
        <div className="basis-3/4">
          <Content foodspot={spot} area={areaName} />
        </div>
        <div className="basis-1/4">
          <TopLists colNumber={"1"} area={areaName} isFromContent={true} />
        </div>
      </div>
    </main>
  );
};

export default Spot;
