import Image from "next/image";
import React from "react";

const MenuCards = ({ food }) => {
  return (
    <div className="max-w-xs mx-4 mb-2 rounded-lg shadow-lg">
      <div className="basis-full relative w-auto h-32 bg-wh-500">
        <Image
          fill
          src={food.imgUrl}
          alt={food.foodName}
          sizes="(max-width: 480px) 100vw,
                (max-width: 768px) 75vw,
                (max-width: 1060px) 50vw,
                33vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="px-6 py-4">
        {/* <div className="flex mb-2">
          <span className="px-4 py-0.5 text-sm bg-red-500 rounded-full text-red-50">
            Seafood
          </span>
        </div> */}
        <h5 className="mb-3 text-xl font-semibold tracking-tight text-green-600 uppercase">
          {food.foodName}
        </h5>
        <p className="leading-normal text-gray-700">{food.description}</p>
      </div>
      <div className="flex items-center justify-between p-4">
        <span className="text-xl text-green-600">Php {food.price}</span>
      </div>
    </div>
  );
};

export default MenuCards;
