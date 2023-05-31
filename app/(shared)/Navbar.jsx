"use client";
import Image from "next/image";
import React, { useState } from "react";
import SignInSignUpModal from "./SignInSignUpModal";
import { UseUser } from "@/hooks/useUser";
import Link from "next/link";
import Loading from "./Loading";

const Navbar = () => {
  const { user, loading, isSignInOpen, openModal, closeModal, logout } =
    UseUser();
  const [openDropdown, setOpenDropdown] = useState(false);
  console.log(
    "🚀 ~ file: Navbar.jsx:13 ~ Navbar ~ openDropdown:",
    openDropdown
  );

  const [pageType, setPageType] = useState("Login");
  if (loading) return <Loading />;

  return (
    <header className="mb-5">
      {isSignInOpen && (
        <SignInSignUpModal
          pageType={pageType}
          setPageType={setPageType}
          closeModal={closeModal}
        />
      )}
      <nav className="flex justify-between align-middle items-center w-full bg-wh-900 text-wh-10 px-10 py-4">
        <div className="md:basis-2/3 md:mt-3">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={300} height={100} />
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center align-middle md:hidden">
          {!user && !loading && (
            <div className="relative h-full gap-4 flex flex-col items-center justify-center">
              <button
                onClick={() => {
                  openModal();
                  setPageType("Login");
                }}
                className="relative inline-flex w-full items-center justify-center p-0.5  overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="relative p-1 w-full transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Sign In
                </span>
              </button>
              <button
                onClick={() => {
                  openModal();
                  setPageType("Register");
                }}
                className="relative inline-flex w-full items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="relative p-1  transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Register
                </span>
              </button>
            </div>
          )}
          {user && (
            <button onClick={() => setOpenDropdown(!openDropdown)}>
              <div className="relative m-2 inline-flex items-center justify-center w-10 h-10 overflow-hidden border-gray-600 border-2 bg-lime-400 rounded-full dark:bg-gray-600">
                <span className="font-black text-gray-600 dark:text-gray-300">
                  {user.name[0]}
                </span>
              </div>
            </button>
          )}
          {openDropdown && (
            <div
              id="dropdownmobile"
              className="z-10 bg-white  rounded-lg shadow dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <p
                    onClick={() => {
                      logout();
                      setOpenDropdown(false);
                    }}
                    className="flex justify-end p-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                  >
                    Logout
                  </p>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="justify-between align-bottom space-x-2 hidden md:flex">
          {!user && !loading && (
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
          <div className="flex justify-center flex-col p-2">
            {user && (
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="relative inline-flex items-center justify-center p-3 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                type="button"
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                {user.name}
                <svg
                  className="w-4 h-4 ml-2"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>
            )}
            {openDropdown && (
              <div
                id="dropdown"
                className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <p
                      onClick={() => {
                        logout();
                        setOpenDropdown(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
