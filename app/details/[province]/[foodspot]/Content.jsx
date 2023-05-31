"use client";
import Tabs from "./Tabs";

const Content = ({ name, area }) => {
  return (
    <div className="flex-col flex w-full  mb-10">
      {/* BREADCRUMBS */}
      <a
        href="#"
        className="px-4 py-1 bg-white rounded-lg text-gray-500 flex items-start mb-2"
      >
        <h5 className="text-wh-300">{`Home > ${area} > ${name}`}</h5>
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
            {name}
          </h2>
        </div>
      </div>
      <Tabs />
    </div>
  );
};

export default Content;
