"use client";
import Loading from "@/components/Loading";
import LandingPageInfo from "./LandingPageInfo";
import Map from "./Map";
import TopLists from "./TopLists";
import { Suspense, useState } from "react";
import Link from "next/link";

export default function LandingPage() {
  const [isTopListVisible, setisTopListVisible] = useState(false);
  const [areaSelected, setAreaSelected] = useState("");

  return (
    <div className="flex justify-center flex-col items-start lg:flex-row lg:justify-start h-full p-2">
      {isTopListVisible ? (
        <div
          id="top-left-modal"
          data-modal-placement="top-left"
          tabIndex="-1"
          className="flex justify-center relative z-10 w-full px-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full"
        >
          <div className=" max-w-full max-h-full">
            <div className=" bg-white w-full rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Top 10 Food Spots in
                  <Link href={`/${areaSelected}?page=1`}>
                    <button className="m-2 p-1 font-bold text-blue-500 border-b-2 border-blue-500 hover:border-emerald-600 hover:text-emerald-600">
                      {areaSelected}
                    </button>
                  </Link>
                </h3>
                <button
                  type="button"
                  onClick={() => setisTopListVisible(false)}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="top-left-modal"
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <Suspense fallback={<Loading />}>
                <TopLists area={areaSelected} />
              </Suspense>
            </div>
          </div>
        </div>
      ) : (
        <LandingPageInfo />
      )}

      <Map
        setisTopListVisible={(state) => setisTopListVisible(state)}
        isTopListVisible={isTopListVisible}
        areaSelected={areaSelected}
        setAreaSelected={(area) => setAreaSelected(area)}
      />
    </div>
  );
}
