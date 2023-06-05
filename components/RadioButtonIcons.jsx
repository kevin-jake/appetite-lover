"use client";
import React from "react";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";

const RadioButtonIcons = ({ isPositiveFeedback, setFieldValue, disabled }) => {
  const handleClick = (e, value) => {
    setFieldValue("isPositiveFeedback", value);
  };

  return (
    <div
      className="flex justify-center gap-3 rounded-xl w-24 bg-gray-200 dark:bg-gray-700 p-2"
      x-data="app"
    >
      <button
        disabled={disabled}
        type="button"
        onClick={(e) => handleClick(e, true)}
      >
        <span
          className={`block cursor-pointer select-none rounded-xl p-2 text-center dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-blue-400 ${
            isPositiveFeedback && "bg-blue-500 font-bold text-white"
          }
          `}
        >
          <MdOutlineThumbUp />
        </span>
      </button>
      <button
        disabled={disabled}
        type="button"
        onClick={(e) => handleClick(e, false)}
      >
        <span
          className={`block cursor-pointer select-none rounded-xl p-2 text-center dark:text-white hover:bg-blue-700 hover:text-white dark:hover:bg-blue-400 ${
            !isPositiveFeedback && "bg-blue-500 font-bold text-white"
          }
          `}
        >
          <MdOutlineThumbDown />
        </span>
      </button>
    </div>
  );
};

export default RadioButtonIcons;
