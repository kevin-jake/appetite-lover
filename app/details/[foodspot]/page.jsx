import React from "react";
import Content from "./Content";
import TopLists from "@/app/(home)/TopLists";

const Post = async () => {
  const post = [];

  if (!post) {
    return <div>Post Not Found</div>;
  }

  return (
    <main className="px-10 leading-7">
      <div className="md:flex gap-10 mb-5">
        <div className="basis-3/4">
          <Content />
        </div>
        <div className="basis-1/4">
          <TopLists colNumber={"1"} />
        </div>
      </div>
    </main>
  );
};

export default Post;
