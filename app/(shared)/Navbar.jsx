"use client";
import Image from "next/image";
import React, { useState } from "react";
import SignInSignUpModal from "./SignInSignUpModal";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLogout } from "@/store/slices/auth/authSlice";
import useAuth from "@/hooks/useAuth";

const Navbar = () => {
  const dispatch = useDispatch();
  const {
    currentAccount: user,
    isSignInOpen,
    logout,
    closeModal,
    openModal,
  } = useAuth();
  console.log("🚀 ~ file: Navbar.jsx:12 ~ Navbar ~ user:", user);

  const [pageType, setPageType] = useState("Login");

  return (
    <header className="mb-5">
      {isSignInOpen && (
        <SignInSignUpModal
          closeModal={closeModal}
          pageType={pageType}
          setPageType={setPageType}
        />
      )}
      <nav className="flex justify-between align-middle items-center w-full bg-wh-900 text-wh-10 px-10 py-4">
        <div className="basis-2/3 md:mt-3">
          <Image src="/logo.png" alt="logo" width={300} height={100} />
        </div>
        <div className="flex justify-between align-bottom space-x-2">
          {!user && (
            <>
              <button
                onClick={() => {
                  openModal();
                  setPageType("Login");
                }}
                className="relative inline-flex items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Sign In
                </span>
              </button>
              <button
                onClick={() => {
                  openModal();
                  setPageType("Register");
                }}
                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Register
                </span>
              </button>
            </>
          )}
          {user && (
            <button
              onClick={() => {
                logout();
                dispatch(setLogout());
              }}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {user.name}
              </span>
            </button>
          )}
        </div>
      </nav>
      <hr className="border-2 border-cyan-900 mx-10" />
    </header>
  );
};

export default Navbar;
