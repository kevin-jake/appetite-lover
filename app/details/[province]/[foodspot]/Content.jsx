import TopLists from "@/app/(home)/TopLists";
import ContentHead from "./ContentHead";
import Tabs from "./Tabs";

const Content = ({ foodspot, area }) => {
  return (
    <div className="md:flex gap-10 mb-5">
      <div className="basis-3/4">
        <div className="flex-col flex w-full  mb-10">
          <span className="px-4 py-1 bg-white dark:bg-gray-700 rounded-lg text-gray-500 dark:text-white flex items-start mb-2">
            <h5 className="text-wh-300">{`Home > ${area} > ${foodspot.foodSpotName}`}</h5>
          </span>
          <ContentHead {...foodspot} />
          <Tabs
            foodSpotId={foodspot.$id}
            foodSpotName={foodspot.foodSpotName}
          />
        </div>
      </div>
      <div className="basis-1/4">
        <TopLists area={area} isFromContent={true} />
      </div>
    </div>
  );
};

export default Content;
