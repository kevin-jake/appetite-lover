import React from "react";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";

const ReviewCards = ({ review }) => {
  const { isPositiveFeedback } = review;
  return (
    <div
      className={`w-full p-4 rounded-lg shadow-md ${
        isPositiveFeedback ? "positive" : "negative"
      }`}
    >
      <div>
        <h5 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          {`${review.comment.split(" ")[0]} ${review.comment.split(" ")[1]}...`}
        </h5>
        <p className="mt-2 dark:text-white">{review.comment}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p
          className={`text-sm font-medium ${
            isPositiveFeedback ? "text-green-500 " : "text-red-500 "
          }`}
        >
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
    </div>
  );
};

export default ReviewCards;
