import TopLists from "@/app/(home)/TopLists";
import ContentHead from "./ContentHead";
import Tabs from "./Tabs";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/components/Loading";

const Content = ({ foodspot, area }) => {
  return (
    <div className="md:flex gap-10 mb-5">
      <div className="basis-3/4">
        <div className="flex-col flex w-full  mb-10">
          <span className="px-4 py-1 bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white flex items-start mb-2">
            <h5 className="text-wh-300">
              <Link href="/">
                <span className="hover:text-emerald-600 hover:border-b-2 hover:border-emerald-600 hover:font-bold">
                  Home
                </span>
              </Link>
              {" > "}
              <Link href={`/${area}?page=1`}>
                <span className="hover:text-emerald-600 hover:border-b-2 hover:border-emerald-600 hover:font-bold">
                  {area}
                </span>
              </Link>
              {` > ${foodspot.foodSpotName}`}
            </h5>
          </span>
          <ContentHead {...foodspot} />
          <Tabs
            foodSpotId={foodspot.$id}
            foodSpotName={foodspot.foodSpotName}
            location={foodspot.location}
          />
        </div>
      </div>
      <div className="basis-1/4">
        <div
          id="top-left-modal"
          data-modal-placement="top-left"
          tabIndex="-1"
          className="flex justify-center relative z-10 w-full px-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full"
        >
          <div className=" max-w-full max-h-full">
            <div className=" bg-white w-full rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Top 10 Food Spots in {area}
                </h3>
              </div>
              <Suspense fallback={<Loading />}>
                <TopLists area={area} isFromContent={true} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
