import React from "react";
import Content from "./Content";
import TopLists from "@/app/(home)/TopLists";
import { Query } from "appwrite";
import { database } from "@/libs/appwrite";
import PageNotFound from "@/components/PageNotFound";

export const revalidate = 0;

const getAreaId = async (areaId) => {
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

  const areaName = await getAreaId(spot.areaId);

  return (
    <main className="px-10 leading-7">
      <div className="md:flex gap-10 mb-5">
        <div className="basis-3/4">
          <Content foodspot={spot} area={areaName} />
        </div>
        <div className="basis-1/4">
          <TopLists area={areaName} isFromContent={true} />
        </div>
      </div>
    </main>
  );
};

export default Spot;
