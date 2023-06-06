"use client";
import React, { Suspense, useState } from "react";
import MenuTab from "./MenuTab";
import ReviewsTab from "./ReviewsTab";
import Loading from "@/components/Loading";
import ReviewForm from "./ReviewForm";
import LocationTab from "./LocationTab";

const Tabs = ({ foodSpotId, foodSpotName, location }) => {
  const TABS = ["Menu", "Reviews", "Location"];
  const [tab, setTab] = useState("Menu");

  const handleTabClick = (tabOption) => {
    setTab(tabOption);
  };

  const tabContent = (tab) => {
    switch (tab) {
      case "Menu":
        return (
          <section className="pt-4 pb-1">
            <div className="text-left">
              <h4 className="text-3xl mb-4 text-emerald-700 dark:text-lime-200 font-bold ">
                Menu
              </h4>
            </div>
            <div className="container w-full px-5 py-6 mx-auto">
              <Suspense fallback={<Loading />}>
                <MenuTab foodSpotId={foodSpotId} foodSpotName={foodSpotName} />
              </Suspense>
            </div>
          </section>
        );
      case "Reviews":
        return (
          <section className="pt-4 pb-1">
            <div className="text-left">
              <h4 className="text-3xl mb-4 text-emerald-700 dark:text-lime-200 font-bold ">
                Reviews
              </h4>
            </div>
            <div className="flex flex-col gap-8">
              <ReviewForm foodSpotId={foodSpotId} />
              <Suspense fallback={<Loading />}>
                <ReviewsTab foodSpotId={foodSpotId} />
              </Suspense>
            </div>
          </section>
        );
      case "Location":
        return <LocationTab location={location} />;
    }
  };

  return (
    <div className="mt-2   bg-white rounded-lg shadow dark:bg-gray-700 ">
      <div className="m-2 bg-white  dark:bg-gray-700 border-b border-gray-200 dark:border-gray-500">
        <ul className="mx-2 flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          {TABS.map((tabOption) => (
            <li key={tabOption} className="mr-2" role="presentation">
              <button
                className={`inline-block p-4 rounded-t-lg  ${
                  tab == tabOption
                    ? "text-blue-600 border-b-2 border-blue-600 hover:text-blue-600 hover:border-blue-300 dark:hover:text-blue-300"
                    : "border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                type="button"
                role="tab"
                aria-controls="profile-example"
                aria-selected="false"
                onClick={() => handleTabClick(tabOption)}
              >
                {tabOption}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="m-2" id="tab-content">
        <div
          className="p-4 rounded-lg"
          id="profile-example"
          role="tabpanel"
          aria-labelledby="profile-tab-example"
        >
          {tabContent(tab)}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
