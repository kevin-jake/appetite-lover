"use client";
import React from "react";
import { MdSend } from "react-icons/md";

const ReviewForm = () => {
  return (
    <form className="w-full bg-white rounded-lg px-4 pt-2">
      <div className="flex flex-col justify-center align-middle w-full -mx-3 mb-6">
        <h5 className="font-bold px-4 pt-3 pb-2 text-gray-800 text-lg">
          Add a review
        </h5>
        <div className="w-full md:w-full px-3 mb-2 mt-2">
          <textarea
            className="bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
            name="comment"
            placeholder="Type Your Comment"
            required
          ></textarea>
        </div>
        <div className="flex items-start justify-end w-full text-gray-700 px-2 mr-auto">
          <button
            type="submit"
            className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
          >
            <span className="inline-flex gap-2 justify-between align-middle items-center">
              Post
              <MdSend />
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReviewForm;
