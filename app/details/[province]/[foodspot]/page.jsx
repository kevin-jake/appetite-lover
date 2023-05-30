import React from "react";
import Content from "./Content";
import TopLists from "@/app/(home)/TopLists";
import { Databases, Query } from "appwrite";
import client from "@/libs/appwrite";

const databases = new Databases(client);
const getProvinceId = async (provinceId) => {
  const province = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_PROVINCE_COLLECTION,
    [Query.equal("$id", [provinceId])]
  );
  return province.documents[0].provinceName;
};

const getPost = async (foodspotId) => {
  const post = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE,
    process.env.NEXT_PUBLIC_FOOD_SPOT_COLLECTION,
    [Query.equal("$id", [foodspotId])]
  );
  return post.documents[0];
};

const Post = async ({ params }) => {
  console.log("🚀 ~ file: page.jsx:27 ~ params:", params);
  const post = await getPost(params.foodspot);
  const provinceName = await getProvinceId(post.provinceId);

  if (!post) {
    return <div>Post Not Found</div>;
  }

  return (
    <main className="px-10 leading-7">
      <div className="md:flex gap-10 mb-5">
        <div className="basis-3/4">
          <Content name={post.spotName} province={provinceName} />
        </div>
        <div className="basis-1/4">
          <TopLists colNumber={"1"} area={decodeURI(params.province)} />
        </div>
      </div>
    </main>
  );
};

export default Post;
