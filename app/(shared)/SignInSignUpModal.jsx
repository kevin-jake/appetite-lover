"use client";
import React, { useState } from "react";
import ModalBackdrop from "./ModalBackdrop";
import SignInSignUpForm from "./SignInSignUpForm";

const SignInSignUpModal = ({ closeModal }) => {
  const [pageType, setPageType] = useState("Login");
  return (
    <>
      <div
        id="authentication-modal"
        tabIndex="-1"
        aria-hidden="true"
        className=" z-30 flex justify-center absolute items-middle w-full h-full"
      >
        <div className="relative w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              onClick={closeModal}
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                {pageType == "Login" ? "Sign in" : "Register"} to our platform
              </h3>
              <SignInSignUpForm
                pageType={pageType}
                setModalType={(type) => setPageType(type)}
              />
            </div>
          </div>
        </div>
      </div>
      <ModalBackdrop closeModal={closeModal} />
    </>
  );
};

export default SignInSignUpModal;
