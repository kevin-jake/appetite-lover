import React from "react";
import MenuCards from "./MenuCards";
import AddFoodMenuCard from "./AddFoodMenuCard";
import { database } from "@/libs/appwrite";
import { Query } from "appwrite";

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
    <div className="grid lg:grid-cols-4 gap-y-6">
      {foodMenu.map((food) => (
        <MenuCards key={food.$id} food={food} />
      ))}
      <AddFoodMenuCard foodSpotId={foodSpotId} foodSpotName={foodSpotName} />
    </div>
  );
};

export default MenuTab;
