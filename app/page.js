"use client";
import Link from "next/link";
import Map from "./(home)/Map";
import TopLists from "./(home)/TopLists";
import { useState } from "react";

export default function Home() {
  const [isTopListVisible, setisTopListVisible] = useState(false);
  const [globalProvince, setGlobalProvince] = useState("");
  console.log("🚀 ~ file: page.js:10 ~ Home ~ globalProvince:", globalProvince);

  return (
    <main className=" items-center">
      <div className="flex lg:flex-row xs:flex-col sm:flex-col items-center lg:justify-start sm:justify-center xs:justify-center p-2">
        {isTopListVisible && <TopLists province={globalProvince} />}
        <Map
          setisTopListVisible={(state) => setisTopListVisible(state)}
          isTopListVisible={isTopListVisible}
          setGlobalProvince={(province) => setGlobalProvince(province)}
        />
      </div>
    </main>
  );
}
