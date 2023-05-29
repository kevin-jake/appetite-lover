"use client";
import Map from "./Map";
import TopLists from "./TopLists";
import { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";
import client from "@/libs/appwrite";

const getTopLists = async (province) => {
  const databases = new Databases(client);
  const top10list = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_FOOD_SPOT_COLLECTION
  );
  console.log(
    "🚀 ~ file: LandingPage.jsx:14 ~ getTopLists ~ top10list:",
    top10list
  );
};

export default function LandingPage() {
  const [isTopListVisible, setisTopListVisible] = useState(false);
  const [areaSelected, setAreaSelected] = useState("");

  // useEffect(() => {
  //   const topList = async () => await getTopLists(areaSelected);
  //   topList();
  // }, [areaSelected]);

  return (
    <div className="flex lg:flex-row xs:flex-col sm:flex-col items-center lg:justify-start sm:justify-center xs:justify-center p-2">
      {isTopListVisible && (
        <TopLists
          area={areaSelected}
          closeTopList={() => setisTopListVisible(false)}
        />
      )}
      <Map
        setisTopListVisible={(state) => setisTopListVisible(state)}
        isTopListVisible={isTopListVisible}
        setAreaSelected={(province) => setAreaSelected(province)}
      />
    </div>
  );
}
