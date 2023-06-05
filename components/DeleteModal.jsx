"use client";
import { useRouter } from "next/navigation";
import ModalBackdrop from "./ModalBackdrop";
import { CgSpinnerTwo } from "react-icons/cg";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { database, functions } from "@/libs/appwrite";

const DeleteModal = ({
  closeModal,
  name,
  collectionId,
  documentId,
  foodSpotId,
}) => {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await database.deleteDocument(
        process.env.NEXT_PUBLIC_DATABASE,
        collectionId,
        documentId
      );
      closeModal();
      if (!foodSpotId) {
        toast.success(`Successfully deleted`);
        router.refresh();
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
      setDeleting(false);
      return;
    }

    if (foodSpotId) {
      try {
        await functions.createExecution(
          process.env.NEXT_PUBLIC_UPDATE_RATINGS_FUNC,
          foodSpotId,
          true
        );
        toast.success(`Successfully deleted`);
        router.refresh();
      } catch (error) {
        toast.error(error.message);
        console.error(error.message);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <>
      <div
        id="delete-modal"
        tabIndex="-1"
        aria-hidden="true"
        className=" z-40 flex justify-center absolute items-center w-full h-full rounded-lg "
      >
        <div className="relative w-4/5 lg:w-full max-w-md max-h-full">
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
              <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Delete {name}
              </h2>
              <p className="mb-4 text-lg text-center font-medium text-gray-500 dark:text-gray-600">
                Are you sure you want to delete?
              </p>
              <div className="flex gap-2 justify-center">
                {deleting ? (
                  <span className="flex justify-center w-full text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                    <CgSpinnerTwo className="loading-icon" />
                  </span>
                ) : (
                  <>
                    <button
                      onClick={closeModal}
                      type="button"
                      className="flex justify-center  text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete()}
                      className="flex justify-center  text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Yes
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalBackdrop closeModal={closeModal} />
    </>
  );
};

export default DeleteModal;
