"use client";
import { UseUser } from "@/hooks/useUser";
import { database, functions } from "@/libs/appwrite";
import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";

const LikeWidget = ({ foodSpotId }) => {
  const [buttonState, setButtonState] = useState("neutral");
  const [foodSpot, setFoodSpot] = useState({});
  const [loading, setLoading] = useState(false);
  const { user, loading: userLoading } = UseUser();
  if (!userLoading && foodSpot.likes?.includes(user.email)) {
    setButtonState("Like");
  }
  if (!userLoading && foodSpot.dislikes?.includes(user.email)) {
    setButtonState("Dislike");
  }

  useEffect(() => {
    const getLikes = async () => {
      setLoading(true);
      const foodSpot = await database.listDocuments(
        process.env.NEXT_PUBLIC_DATABASE,
        process.env.NEXT_PUBLIC_FOOD_SPOT,
        [Query.equal("$id", [foodSpotId])]
      );

      setFoodSpot(foodSpot.documents[0]);
      setLoading(false);
    };

    getLikes();
  }, [loading, userLoading]);

  const handleClick = async (e, value) => {
    try {
      setLoading(true);
      const result = await functions.createExecution(
        process.env.NEXT_PUBLIC_LIKE_FUNC,
        JSON.stringify({
          foodSpotId,
          likeState: value,
          email: user.email,
        }),
        true
      );
      console.log(
        "🚀 ~ file: LikeWidget.jsx:48 ~ handleClick ~ result:",
        result
      );
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div
      className="flex justify-center gap-3 rounded-xl w-24 bg-gray-200 dark:bg-gray-700 p-2"
      x-data="app"
    >
      <button
        disabled={loading}
        type="button"
        onClick={(e) => handleClick(e, "Like")}
      >
        <span
          className={`flex justify-center items-center align-middle gap-2 cursor-pointer select-none rounded-xl p-2 text-center dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-blue-400 ${
            buttonState === "Like" && "bg-blue-500 font-bold text-white"
          }
              `}
        >
          <MdOutlineThumbUp />
        </span>
      </button>
      <button
        disabled={loading}
        type="button"
        onClick={(e) => handleClick(e, "Dislike")}
      >
        <span
          className={`block cursor-pointer select-none rounded-xl p-2 text-center dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-blue-400 ${
            buttonState === "Dislike" && "bg-blue-500 font-bold text-white"
          }
              `}
        >
          <MdOutlineThumbDown />
        </span>
      </button>
    </div>
  );
};

export default LikeWidget;
