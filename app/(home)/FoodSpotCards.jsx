import Image from "next/image";
import Link from "next/link";
import React from "react";

// {/* TODO: Make a custom image component to handle onError  https://gist.github.com/codegino/b9ed69fec8495c5024ef925c432bf1f2 */}
const FoodSpotCards = ({ name, area, foodSpotId, imgUrl }) => {
  return (
    <div className="w-full grid grid-cols-2 relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="px-5 py-5 w-full">
        <Link href={`/details/${area}/${foodSpotId}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">
            {name}
          </h5>
        </Link>
      </div>
      <div className="relative w-auto h-32 bg-wh-500 overflow-hidden rounded-lg">
        <Image
          alt={name}
          fill
          src={imgUrl}
          sizes="(max-width: 480px) 100vw,
                (max-width: 768px) 75vw,
                (max-width: 1060px) 50vw,
                33vw"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default FoodSpotCards;
