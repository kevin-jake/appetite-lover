"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SignInSignUpModal from "./SignInSignUpModal";

const Navbar = (props) => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  return (
    <header className="mb-5">
      <nav className="flex justify-between items-center w-full bg-wh-900 text-wh-10 px-10 py-4">
        <div className="basis-2/3 md:mt-3">
          <h1 className="font-bold text-3xl md:text-5xl">Appetite Lover</h1>
        </div>
        <div>
          <p onClick={() => setIsSignInOpen(true)}>Sign In</p>
        </div>
      </nav>
      <hr className="border-2 border-cyan-900 mx-10" />
      {isSignInOpen && (
        <SignInSignUpModal closeModal={() => setIsSignInOpen(false)} />
      )}
    </header>
  );
};

export default Navbar;
