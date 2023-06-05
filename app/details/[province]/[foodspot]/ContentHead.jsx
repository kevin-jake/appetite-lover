import Image from "next/image";
import React from "react";
import LikeWidget from "./LikeWidget";

const ContentHead = ({ foodSpotName, imgUrl, description, $id }) => {
  return (
    <div
      className=" rounded-lg mb-4 md:mb-0 w-full relative overflow-hidden"
      style={{ height: "18em" }}
    >
      <div
        className=" rounded-lg absolute left-0 bottom-0 w-full h-full z-10"
        style={{
          backgroundImage: "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
        }}
      ></div>
      <Image
        alt={foodSpotName}
        fill
        src={imgUrl || "/placeholder-image.jpg"}
        sizes="(max-width: 480px) 100vw,
                (max-width: 768px) 75vw,
                (max-width: 1060px) 50vw,
                33vw"
        style={{ objectFit: "cover" }}
      />
      <div className="flex justify-between w-full p-4 absolute bottom-0 left-0 z-20">
        <div className="flex flex-col w-full justify-between gap-1">
          <div className="flex justify-between">
            <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
              {foodSpotName}
            </h2>
            <LikeWidget foodSpotId={$id} />
          </div>
          <div>
            <h4 className="text-sm text-gray-100 leading-tight">
              {description}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentHead;