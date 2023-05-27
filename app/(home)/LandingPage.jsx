"use client";
import Map from "./Map";
import TopLists from "./TopLists";
import { useEffect, useState } from "react";
import { Client, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_PROJECT);

const getTopLists = async (province) => {
  const databases = new Databases(client);

  console.log(
    "🚀 ~ file: LandingPage.jsx:14 ~ getTopLists ~ province:",
    province
  );
  const top10list = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_FOOD_SPOT_COLLECTION
  );
  console.log("🚀 ~ file: page.js:17 ~ getTopLists ~ top10list:", top10list);
  return top10list;
};

export default function LandingPage({ top10list }) {
  const [isTopListVisible, setisTopListVisible] = useState(false);
  const [globalProvince, setGlobalProvince] = useState("");

  useEffect(() => {
    const topList = getTopLists(globalProvince);
    console.log(
      "🚀 ~ file: LandingPage.jsx:34 ~ useEffect ~ topList:",
      topList
    );
  }, [globalProvince]);

  return (
    <div className="flex lg:flex-row xs:flex-col sm:flex-col items-center lg:justify-start sm:justify-center xs:justify-center p-2">
      {isTopListVisible && (
        <TopLists
          province={globalProvince}
          closeTopList={() => setisTopListVisible(false)}
        />
      )}
      <Map
        setisTopListVisible={(state) => setisTopListVisible(state)}
        isTopListVisible={isTopListVisible}
        setGlobalProvince={(province) => setGlobalProvince(province)}
      />
    </div>
  );
}
