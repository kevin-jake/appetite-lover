import Image from "next/image";
import Tabs from "./Tabs";
import { database } from "@/libs/appwrite";
import { Query } from "appwrite";

const getFoodMenu = async (foodSpotId) => {
  const menu = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_FOOD_MENU,
    [Query.equal("foodSpotId", [foodSpotId])]
  );
  return menu.documents;
};

const getReviews = async (foodSpotId) => {
  const reviews = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_REVIEWS,
    [Query.equal("foodSpotId", [foodSpotId])]
  );
  return reviews.documents;
};

const Content = async ({ foodspot, area }) => {
  const { foodSpotName: name, imgUrl } = foodspot;
  const foodMenu = await getFoodMenu(foodspot.$id);
  console.log("🚀 ~ file: Content.jsx:27 ~ Content ~ foodMenu:", foodMenu);
  const reviews = await getReviews(foodspot.$id);
  console.log("🚀 ~ file: Content.jsx:29 ~ Content ~ reviews:", reviews);

  return (
    <div className="flex-col flex w-full  mb-10">
      <a
        href="#"
        className="px-4 py-1 bg-white rounded-lg text-gray-500 flex items-start mb-2"
      >
        <h5 className="text-wh-300">{`Home > ${area} > ${name}`}</h5>
      </a>
      <div
        className=" rounded-lg mb-4 md:mb-0 w-full relative"
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
          src={imgUrl}
          sizes="(max-width: 480px) 100vw,
                (max-width: 768px) 75vw,
                (max-width: 1060px) 50vw,
                33vw"
          style={{ objectFit: "cover" }}
        />
        <div className="p-4 absolute bottom-0 left-0 z-20">
          <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
            {name}
          </h2>
        </div>
      </div>
      <Tabs foodMenu={foodMenu} reviews={reviews} />
    </div>
  );
};

export default Content;
