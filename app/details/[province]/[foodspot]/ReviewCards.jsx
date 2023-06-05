"use client";
import { useUser } from "@/hooks/useUser";
import React, { useState } from "react";
import {
  MdDelete,
  MdEdit,
  MdOutlineThumbDown,
  MdOutlineThumbUp,
} from "react-icons/md";
import ReviewForm from "./ReviewForm";

const ReviewCards = ({ review }) => {
  const [editMode, setEditMode] = useState(false);
  const { isPositiveFeedback } = review;
  console.log("🚀 ~ file: ReviewCards.jsx:15 ~ ReviewCards ~ review:", review);
  const { user } = useUser();

  return (
    <div
      className={`w-full p-4 rounded-lg shadow-md  ${
        isPositiveFeedback
          ? "bg-green-200 dark:bg-green-950"
          : "bg-red-200 dark:bg-red-950"
      }`}
    >
      {editMode ? (
        <div className="flex">
          <ReviewForm
            isEdit={editMode}
            oldReview={review}
            closeEdit={() => setEditMode(false)}
          />
        </div>
      ) : (
        <>
          <div>
            <div className="flex justify-between">
              <h5 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                {`${review.comment.split(" ")[0]} ${
                  review.comment.split(" ").length > 1
                    ? review.comment.split(" ")[1]
                    : ""
                }...`}
              </h5>
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  className={
                    user?.email !== review.reviewerEmail ? "hidden" : ""
                  }
                  onClick={() => setEditMode(true)}
                >
                  <span className="block cursor-pointer text-gray-800 select-none rounded-xl p-2 text-center dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-blue-400">
                    <MdEdit />
                  </span>
                </button>
                <button
                  type="button"
                  className={
                    user?.email !== review.reviewerEmail ? "hidden" : ""
                  }
                  onClick={() => setEditMode(true)}
                >
                  <span className="block cursor-pointer text-gray-800 select-none rounded-xl p-2 text-center dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-blue-400">
                    <MdDelete />
                  </span>
                </button>
              </div>
            </div>
            <p className="mt-2 dark:text-white">{review.comment}</p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm font-medium text-gray-500">
              {review.reviewerEmail}
            </p>
            {isPositiveFeedback ? (
              <div className="flex justify-end gap-2 opacity-75 z-10">
                <MdOutlineThumbUp size="3rem" color="gray" />
              </div>
            ) : (
              <div className="flex justify-end gap-2 opacity-75 z-10">
                <MdOutlineThumbDown size="3rem" color="gray" />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ReviewCards;
