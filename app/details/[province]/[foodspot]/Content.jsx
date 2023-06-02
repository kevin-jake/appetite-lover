import Image from "next/image";
import Tabs from "./Tabs";
import LikeWidget from "./LikeWidget";

const Content = ({ foodspot, area }) => {
  const { foodSpotName: name, imgUrl } = foodspot;
  // TODO: Add food spot description on content page and improve the breadcrumbs display
  return (
    <div className="flex-col flex w-full  mb-10">
      <span className="px-4 py-1 bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white flex items-start mb-2">
        <h5 className="text-wh-300">{`Home > ${area} > ${name}`}</h5>
      </span>
      <div
        className=" rounded-lg mb-4 md:mb-0 w-full relative overflow-hidden"
        style={{ height: "18em" }}
      >
        <div
          className=" rounded-lg absolute left-0 bottom-0 w-full h-full z-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
          }}
        ></div>
        <Image
          alt={name}
          fill
          src={imgUrl || "/placeholder-image.jpg"}
          sizes="(max-width: 480px) 100vw,
                (max-width: 768px) 75vw,
                (max-width: 1060px) 50vw,
                33vw"
          style={{ objectFit: "cover" }}
        />
        <div className="flex justify-between w-full p-4 absolute bottom-0 left-0 z-20">
          <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
            {name}
          </h2>
          <LikeWidget foodSpotId={foodspot.$id} />
        </div>
      </div>
      <Tabs foodSpotId={foodspot.$id} foodSpotName={name} />
    </div>
  );
};

export default Content;
