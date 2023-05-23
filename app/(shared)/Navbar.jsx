import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = (props) => {
  return (
    <header className="mb-5">
      <nav className="flex justify-between items-center w-full bg-wh-900 text-wh-10 px-10 py-4">
        <div className="basis-2/3 md:mt-3">
          <h1 className="font-bold text-3xl md:text-5xl">Appetite Lover</h1>
        </div>
        <div>
          <p>Sign In</p>
        </div>
      </nav>
      <hr className="border-1 mx-10" />
    </header>
  );
};

export default Navbar;
