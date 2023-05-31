import React from "react";
import Content from "./Content";
import TopLists from "@/app/(home)/TopLists";
import { Query } from "appwrite";
import { database } from "@/libs/appwrite";

const getAreaId = async (areaId) => {
  const area = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_AREA,
    [Query.equal("$id", [areaId])]
  );
  return area.documents[0].areaName;
};

const getPost = async (foodspotId) => {
  const post = await database.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_FOOD_SPOT,
    [Query.equal("$id", [foodspotId])]
  );
  return post.documents[0];
};

const Post = async ({ params }) => {
  const post = await getPost(params.foodspot);
  const areaName = await getAreaId(post.areaId);

  if (!post) {
    return <div>Post Not Found</div>;
  }

  return (
    <main className="px-10 leading-7">
      <div className="md:flex gap-10 mb-5">
        <div className="basis-3/4">
          <Content
            name={post.foodSpotName}
            area={areaName}
            imgUrl={post.imgUrl}
          />
        </div>
        <div className="basis-1/4">
          <TopLists colNumber={"1"} area={areaName} />
        </div>
      </div>
    </main>
  );
};

export default Post;
