import Image from "next/image";
import React from "react";
import MenuCardButtons from "./MenuCardButtons";

const MenuCards = ({ foodMenu }) => {
  return (
    <div className="max-w-xs mx-4 mb-2 rounded-lg shadow-lg dark:bg-gray-600">
      <div className="basis-full relative w-auto h-32 bg-white-500">
        <Image
          fill
          src={foodMenu.imgUrl || "/placeholder-image.jpg"}
          alt={foodMenu.foodName}
          sizes="(max-width: 480px) 100vw,
                (max-width: 768px) 75vw,
                (max-width: 1060px) 50vw,
                33vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <MenuCardButtons foodMenu={foodMenu} />
      <div className="px-6 py-4 ">
        <h5 className="mb-3 text-xl font-semibold tracking-tight text-green-600 dark:text-lime-200 uppercase">
          {foodMenu.foodName}
        </h5>
        <p className="leading-normal text-gray-700 dark:text-white">
          {foodMenu.description}
        </p>
      </div>
      <div className="flex items-center justify-between p-4">
        <span className="text-xl text-green-600 dark:text-lime-200">
          Php {foodMenu.price}
        </span>
      </div>
    </div>
  );
};

export default MenuCards;
