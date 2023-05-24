"use client";
import React, { useState } from "react";
import MenuTab from "./MenuTab";
import ReviewsTab from "./ReviewsTab";

const Tabs = () => {
  const TABS = ["Menu", "Reviews", "Location"];
  const [tab, setTab] = useState("Menu");

  const handleTabClick = (tabOption) => {
    setTab(tabOption);
  };

  const tabContent = (tab) => {
    switch (tab) {
      case "Menu":
        return <MenuTab />;
      case "Reviews":
        return <ReviewsTab />;
    }
  };

  return (
    <div className="mt-2  bg-white rounded-lg shadow dark:bg-gray-700 border-b border-gray-700 dark:border-gray-700">
      <div className="m-2  bg-white  dark:bg-gray-700 border-b border-gray-200 dark:border-gray-700">
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
