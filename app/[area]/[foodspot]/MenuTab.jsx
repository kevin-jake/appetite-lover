import React from "react";
import MenuCards from "./MenuCards";
import AddFoodMenuCard from "./AddFoodMenuCard";
import { database } from "@/libs/appwrite";
import { Query } from "appwrite";
import NoResults from "@/components/NoResults";

export const revalidate = 0;

const getFoodMenu = async (foodSpotId) => {
  const menu = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_FOOD_MENU,
    [Query.equal("foodSpotId", [foodSpotId]), Query.orderDesc("$createdAt")]
  );
  return menu.documents;
};

const MenuTab = async ({ foodSpotId, foodSpotName }) => {
  const foodMenu = await getFoodMenu(foodSpotId);
  return (
    <>
      <div className="flex w-full justify-center items-center">
        {foodMenu.length === 0 && <NoResults />}
      </div>
      <div className="grid lg:grid-cols-4 gap-y-6">
        {foodMenu.map((food) => (
          <MenuCards key={food.$id} foodMenu={food} />
        ))}
        <AddFoodMenuCard foodSpotId={foodSpotId} foodSpotName={foodSpotName} />
      </div>
    </>
  );
};

export default MenuTab;
