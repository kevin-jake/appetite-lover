"use client";
import React, { useState } from "react";
import Tabs from "./Tabs";

const Content = ({ name, province }) => {
  console.log("🚀 ~ file: Content.jsx:6 ~ Content ~ province:", province);
  const [isEditable, setIsEditable] = useState(false);

  const [title, setTitle] = useState("test");
  const [titleError, setTitleError] = useState("");
  const [tempTitle, setTempTitle] = useState(title);

  const [content, setContent] = useState("test");
  const [contentError, setContentError] = useState("");
  const [tempContent, setTempContent] = useState(content);

  const date = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const handleIsEditable = (bool) => {
    setIsEditable(bool);
    editor?.setEditable(bool);
  };

  const handleOnChangeTitle = (e) => {
    if (title) setTitleError("");
    setTitle(e.target.value);
  };

  const handleOnChangeContent = ({ editor }) => {
    if (!editor.isEmpty) setContentError("");
    setContent(editor.getHTML());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation checks
    if (title === "") setTitleError("This field is required.");
    if (editor?.isEmpty) setContentError("This field is required.");
    if (title === "" || editor?.isEmpty) return;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/post/${post?.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      }
    );
    const data = await response.json();

    handleIsEditable(false);
    setTempTitle("");
    setTempContent("");

    setTitle(data.title);
    setContent(data.content);
    editor?.commands.setContent(data.content);
  };

  return (
    <div className="flex-col flex w-full  mb-10">
      {/* BREADCRUMBS */}
      <a
        href="#"
        className="px-4 py-1 bg-white rounded-lg text-gray-500 flex items-start mb-2"
      >
        <h5 className="text-wh-300">{`Home > ${province.replace(
          /%20/g,
          " "
        )} > ${name}`}</h5>
      </a>
      <div
        className=" rounded-lg mb-4 md:mb-0 w-full relative"
        style={{ height: "18em" }}
      >
        <div
          className=" rounded-lg absolute left-0 bottom-0 w-full h-full z-10"
          style={{
            backgroundImage:
              "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
          }}
        ></div>
        <img
          src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
          className="rounded-lg absolute left-0 top-0 w-full h-full z-0 object-cover"
        />
        <div className="p-4 absolute bottom-0 left-0 z-20">
          <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
            {name} Jolliben
          </h2>
        </div>
      </div>
      <Tabs />
    </div>
  );
};

export default Content;
