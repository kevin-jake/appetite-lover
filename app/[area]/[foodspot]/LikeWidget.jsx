"use client";
import { useUser } from "@/hooks/useUser";
import { database, functions } from "@/libs/appwrite";
import { Query } from "appwrite";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CgSpinnerTwo } from "react-icons/cg";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";

const LikeWidget = ({ foodSpotId }) => {
  const [buttonState, setButtonState] = useState("neutral");
  const [foodSpot, setFoodSpot] = useState({});
  const [loading, setLoading] = useState(false);

  const { user, openModal, loading: userLoading } = useUser();

  useEffect(() => {
    const getLikes = async () => {
      setLoading(true);
      try {
        const foodSpot = await database.listDocuments(
          process.env.NEXT_PUBLIC_DATABASE,
          process.env.NEXT_PUBLIC_FOOD_SPOT,
          [Query.equal("$id", [foodSpotId])]
        );
        setFoodSpot(foodSpot.documents[0]);
      } catch (error) {
        toast.error(error.message);
        console.error(error.message);
      }
      setLoading(false);
    };

    getLikes();
  }, [buttonState, foodSpotId]);

  useEffect(() => {
    if (!userLoading && foodSpot.likes?.includes(user?.email))
      setButtonState("Like");
    else if (!userLoading && foodSpot.dislikes?.includes(user?.email))
      setButtonState("Dislike");
    else setButtonState("neutral");
  }, [foodSpotId, userLoading, foodSpot, user?.email]);

  const handleClick = async (e, value) => {
    if (!user) {
      return openModal();
    }
    try {
      setLoading(true);
      const rawResult = await functions.createExecution(
        process.env.NEXT_PUBLIC_LIKE_FUNC,
        JSON.stringify({
          foodSpotId,
          likeState: value,
          email: user.email,
        }),
        false
      );
      const result = JSON.parse(rawResult.response);
      if (buttonState === value) setButtonState("neutral");
      else setButtonState(value);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center align-middle gap-3 rounded-xl w-auto bg-gray-200 dark:bg-gray-700 p-2">
      {(loading || userLoading) && (
        <CgSpinnerTwo className="loading-icon" color="forestgreen" />
      )}
      {!loading && !userLoading && (
        <>
          <button type="button" onClick={(e) => handleClick(e, "Like")}>
            <span
              className={`flex justify-center items-center align-middle gap-2 cursor-pointer select-none rounded-xl p-2 text-center dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-blue-400 ${
                buttonState === "Like" && "bg-blue-500 font-bold text-white"
              }
              `}
            >
              <MdOutlineThumbUp />
              {foodSpot.likes?.length > 0 && foodSpot.likes.length}
            </span>
          </button>
          <button type="button" onClick={(e) => handleClick(e, "Dislike")}>
            <span
              className={`flex justify-center items-center align-middle gap-2 cursor-pointer select-none rounded-xl p-2 text-center dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-blue-400 ${
                buttonState === "Dislike" && "bg-blue-500 font-bold text-white"
              }
              `}
            >
              <MdOutlineThumbDown />
              {foodSpot.dislikes?.length > 0 && foodSpot.dislikes.length}
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default LikeWidget;
