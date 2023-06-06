"use client";
import { useRouter } from "next/navigation";
import { CgSpinnerTwo } from "react-icons/cg";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { database, functions } from "@/libs/appwrite";
import { ModalContext } from "@/context/ModalContext";

const DeleteModal = ({ name, collectionId, documentId, foodSpotId }) => {
  console.log(
    "🚀 ~ file: DeleteModal.jsx:10 ~ DeleteModal ~ collectionId:",
    collectionId
  );
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const { closeModal, refetchTopList } = useContext(ModalContext);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await database.deleteDocument(
        process.env.NEXT_PUBLIC_DATABASE,
        collectionId,
        documentId
      );
      closeModal();
      if (collectionId === process.env.NEXT_PUBLIC_FOOD_MENU) {
        toast.success(`Successfully deleted`);
        router.refresh();
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
      setDeleting(false);
      return;
    }

    if (collectionId !== process.env.NEXT_PUBLIC_FOOD_MENU) {
      try {
        await functions.createExecution(
          process.env.NEXT_PUBLIC_UPDATE_RATINGS_FUNC,
          foodSpotId,
          true
        );
        toast.success(`Successfully deleted`);
        refetchTopList();
        if (collectionId === process.env.NEXT_PUBLIC_FOOD_SPOT) {
          router.push("/");
        } else router.refresh();
      } catch (error) {
        toast.error(error.message);
        console.error(error.message);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <div className="px-6 py-6 lg:px-8">
      <h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
        Delete {name}?
      </h2>
      <p className="mb-4 text-lg text-center font-medium text-gray-500 dark:text-gray-600">
        {collectionId === process.env.NEXT_PUBLIC_FOOD_SPOT ? (
          <div className="flex flex-col">
            <span>
              Reviews and Food Menu will also not be accessible after deleting.
            </span>
            <span>Are you sure you want to delete this food spot?</span>
          </div>
        ) : (
          "Are you sure you want to delete?"
        )}
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
  );
};

export default DeleteModal;
