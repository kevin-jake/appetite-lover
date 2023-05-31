import React from "react";
import MenuCards from "./MenuCards";
import NoResults from "@/app/(shared)/NoResults";

const MenuTab = ({ foodMenu }) => {
  return (
    <section className="mt-4 bg-white dark:bg-gray-700 dark:text-white">
      <div className="text-left">
        <h4 className="text-3xl font-bold text-transparent dark:text-lime-200 bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          Menu
        </h4>
      </div>
      <div className="container w-full px-5 py-6 mx-auto">
        <div className="grid lg:grid-cols-4 gap-y-6">
          {foodMenu.map((food) => (
            <MenuCards key={food.$id} food={food} />
          ))}
        </div>
        {foodMenu.length == 0 && <NoResults />}
      </div>
    </section>
  );
};

export default MenuTab;
