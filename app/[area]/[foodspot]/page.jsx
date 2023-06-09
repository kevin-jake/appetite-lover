import React from "react";
import Content from "./Content";
import { Query } from "appwrite";
import { database } from "@/libs/appwrite";
import PageNotFound from "@/components/PageNotFound";

const getAreaName = async (areaId) => {
  const area = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_AREA,
    [Query.equal("$id", [areaId]), Query.limit(1)]
  );
  return area.documents[0].areaName;
};

const getSpot = async (foodspotId) => {
  const spot = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_FOOD_SPOT,
    [Query.equal("$id", [foodspotId]), , Query.limit(1)]
  );
  return spot.documents[0];
};

const Spot = async ({ params }) => {
  const spot = await getSpot(params.foodspot);
  if (!spot) {
    return <PageNotFound />;
  }

  const areaName = await getAreaName(spot.areaId);

  return (
    <main className="px-10 leading-7">
      <Content foodspot={spot} area={areaName} />
    </main>
  );
};

export default Spot;
