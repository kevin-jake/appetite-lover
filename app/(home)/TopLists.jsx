import React from "react";
import FoodSpotCards from "./FoodSpotCards";

const TopLists = ({ colNumber = 2, area, closeTopList }) => {
  let top10 = Array.from({ length: 10 }, (value, index) => index + 1);
  return (
    <div
      id="top-left-modal"
      data-modal-placement="top-left"
      tabIndex="-1"
      className="relative top-0 left-0 right-0 z-10 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className=" max-w-2xl max-h-full">
        <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Top 10 Food Spots on {area}
            </h3>
            <button
              type="button"
              onClick={closeTopList}
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
          <div className={`grid grid-cols-${colNumber} gap-4 p-6`}>
            {top10.map((item) => (
              <FoodSpotCards key={item} name={item} area={area} />
            ))}

            {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.)
              goes into effect on May 25 and is meant to ensure a common set of
              data rights in the European Union. It requires organizations to
              notify users as soon as possible of high-risk data breaches that
              could personally affect them.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopLists;
