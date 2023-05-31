"use client";
import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/99276-loading-utensils";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default Loading;
