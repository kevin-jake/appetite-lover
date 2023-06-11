import React from "react";
import { SiAppwrite } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-wh-900 text-wh-50 py-10 px-10">
      <div className="w-full flex flex-col justify-center items-center mx-auto max-w-screen-xl p-4">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 Appetite Lover. The source code is licensed MIT.
        </span>
        <span className="text-sm flex justify-center items-center gap-1 text-gray-500 sm:text-center dark:text-gray-400">
          Developed using <SiAppwrite color="gray" /> Appwrite.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
