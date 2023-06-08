import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const LandingPageInfo = () => {
  return (
    <div className="flex justify-center relative z-10 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full">
      <div className=" w-full max-w-full max-h-full">
        <div className=" bg-white w-full rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
            <span className="text-3xl w-full font-bold text-emerald-700 dark:text-white">
              Find the best food Spots in{" "}
              <span className="underline underline-offset-8 decoration-emerald-500 text-4xl w-full font-bold text-lime-700 dark:text-white">
                Manila
              </span>
            </span>
          </div>
          <div className="flex font-lg fo flex-col p-6 justify-center items-center align-middle">
            Find the the top 10 best eating spots in Manila, Philippines! This
            website will show you the list of eating spots on the municipality
            or area that you have selected on the map.
            <div className="flex w-full justify-end align-middle items-center">
              <p className="text-emerald-700 font-bold mt-2 mr-2">
                To get started click or search an area on the Map
              </p>{" "}
              <AiOutlineArrowRight size={20} color="forestgreen" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageInfo;
