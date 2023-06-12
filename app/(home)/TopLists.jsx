import React from "react";
import { Query } from "appwrite";
import { database } from "@/libs/appwrite";
import TopListsContent from "./TopListsContent";

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

const TopLists = async (props) => {
  const { lists, areaId } = await getTopLists(props?.area);

  return <TopListsContent {...props} toplists={lists} uniqueArea={areaId} />;
};

export default TopLists;
