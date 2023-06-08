"use client";
import LandingPageInfo from "./LandingPageInfo";
import Map from "./Map";
import TopLists from "./TopLists";
import { useState } from "react";

export default function LandingPage() {
  const [isTopListVisible, setisTopListVisible] = useState(false);
  const [areaSelected, setAreaSelected] = useState("");

  return (
    <div className="flex justify-center flex-col items-start lg:flex-row lg:justify-start h-full p-2">
      {isTopListVisible ? (
        <TopLists
          area={areaSelected}
          closeTopList={() => setisTopListVisible(false)}
        />
      ) : (
        <LandingPageInfo />
      )}
      <div className="flex justify-center w-full">
        <Map
          setisTopListVisible={(state) => setisTopListVisible(state)}
          isTopListVisible={isTopListVisible}
          setAreaSelected={(area) => setAreaSelected(area)}
        />
      </div>
    </div>
  );
}
