"use client";
import { UseUser } from "@/hooks/useUser";
import Map from "./Map";
import TopLists from "./TopLists";
import { useState } from "react";

export default function LandingPage() {
  const [isTopListVisible, setisTopListVisible] = useState(false);
  const [areaSelected, setAreaSelected] = useState("");
  const { loading } = UseUser();

  return (
    <>
      {!loading && (
        <div className="flex h-full lg:flex-row xs:flex-col sm:flex-col items-start lg:justify-start sm:justify-center xs:justify-center p-2">
          {isTopListVisible && (
            <TopLists
              area={areaSelected}
              closeTopList={() => setisTopListVisible(false)}
            />
          )}
          <Map
            setisTopListVisible={(state) => setisTopListVisible(state)}
            isTopListVisible={isTopListVisible}
            setAreaSelected={(area) => setAreaSelected(area)}
          />
        </div>
      )}
    </>
  );
}
