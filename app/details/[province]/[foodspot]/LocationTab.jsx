import GmapComponent from "@/components/GmapComponent";
import React from "react";

const LocationTab = ({ location }) => {
  return (
    <section className="pt-4 pb-1">
      <div className="text-left">
        <h4 className="text-3xl mb-4 text-emerald-700 dark:text-lime-200 font-bold ">
          Location
        </h4>
      </div>
      <div className="flex w-full h-full flex-col gap-8">
        <GmapComponent isFromContent={true} location={location} />
      </div>
    </section>
  );
};

export default LocationTab;
