import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const LandingPageInfo = () => {
  return (
    <div className="flex justify-center relative z-10 w-full px-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full">
      <div className=" w-full max-w-full max-h-full">
        <div className=" bg-white w-full rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
            <span className="text-3xl w-full font-bold text-emerald-700 dark:text-white">
              Find the best food Spots in{" "}
              <span className="underline underline-offset-8 decoration-emerald-500 text-4xl w-full font-bold text-lime-700 dark:text-white">
                Metro Manila
              </span>
            </span>
          </div>
          <div className="flex font-lg fo flex-col p-6 gap-4 justify-center items-center align-middle">
            <p>
              Find the the top 10 best eating spots in Manila, Philippines! This
              website will show you the list of eating spots on the municipality
              or area that you have selected on the map.
            </p>

            <p>
              Manila, the vibrant capital city of the Philippines, offers a wide
              array of flavors and dishes to tantalize the taste buds of locals
              and visitors alike. From traditional Filipino cuisine to
              international delights, Manila is a melting pot of gastronomic
              experiences that will leave any food lover craving for more.
            </p>

            <p>
              Overall, Manila{"'"}s food scene is a tapestry of rich and diverse
              flavors that showcase the best of Filipino cuisine alongside
              international influences. From humble street food to upscale
              dining establishments, Manila offers a culinary experience that
              caters to all tastes and budgets. So, if you find yourself in this
              bustling city, be prepared to embark on a gastronomic adventure
              that will leave you with a newfound appreciation for the vibrant
              food culture of Manila.
            </p>
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
