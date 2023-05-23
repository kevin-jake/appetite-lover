import React from "react";

const Footer = () => {
  return (
    <footer className="bg-wh-900 text-wh-50 py-10 px-10">
      <div className="justify-between mx-auto gap-16 sm:flex">
        {/* FIRST COLUMN */}
        <div className="mt-16 basis-1/2 sm:mt-0">
          <h3 className="font-bold">Appetite Lover</h3>
        </div>
        <div className="mt-16 basis-1/4 sm:mt-0">
          <h4 className="font-blod">Links</h4>
          <p className="my-5">test</p>
          <p>Test blog future</p>
        </div>
        <div className="mt-16 basis-1/4 sm:mt-0">
          <h4 className="font-blod">Contact Us</h4>
          <p className="my-5">test</p>
          <p>Test blog future</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
