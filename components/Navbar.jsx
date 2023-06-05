"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import SignInSignUpModal from "./SignInSignUpModal";
import { useUser } from "@/hooks/useUser";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { ModalContext } from "@/context/ModalContext";
import ModalWrapper from "./ModalWrapper";

const Navbar = () => {
  const { user, loading, isSignInOpen, openModal, closeModal, logout } =
    useUser();
  const [openDropdown, setOpenDropdown] = useState(false);
  const { isModalOpen, modalChildren } = useContext(ModalContext);

  const [pageType, setPageType] = useState("Login");
  return (
    <header className="mb-5">
      <Toaster />
      {isSignInOpen && (
        <SignInSignUpModal
          pageType={pageType}
          setPageType={setPageType}
          closeModal={closeModal}
        />
      )}
      {isModalOpen && <ModalWrapper />}
      <nav
        className={`flex align-middle items-center w-full bg-wh-900 text-wh-10 px-10 py-4 ${
          loading ? "justify-center" : "justify-between gap-4"
        }`}
      >
        <div className=" md:mt-3">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={300} height={100} />
          </Link>
        </div>
        {!loading && (
          <>
            <div className="flex flex-col justify-center items-center align-middle md:hidden">
              {!user && (
                <div className="relative h-full gap-3 flex flex-col items-center justify-center">
                  <button
                    onClick={() => {
                      openModal();
                      setPageType("Login");
                    }}
                    className="w-full text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm text-center"
                  >
                    <span className="inline-flex p-2 font-bold  align-middle items-center text-white">
                      Sign In
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      openModal();
                      setPageType("Register");
                    }}
                    className="w-full text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm text-center"
                  >
                    <span className="inline-flex p-2 font-bold  align-middle items-center text-white">
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
              {!user && (
                <>
                  <button
                    onClick={() => {
                      openModal();
                      setPageType("Login");
                    }}
                    className="w-full text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm text-center"
                  >
                    <span className="inline-flex p-4 font-bold  align-middle items-center text-white">
                      Sign In
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      openModal();
                      setPageType("Register");
                    }}
                    className="w-full text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm text-center"
                  >
                    <span className="inline-flex p-4 font-bold  align-middle items-center text-white">
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
                    className="relative inline-flex items-center justify-center p-3 overflow-hidden text-sm font-bold text-gray-600 dark:text-gray-300 border-gray-600 border-2 bg-blue-100 rounded-lg dark:bg-gray-600"
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
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
