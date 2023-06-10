"use client";
import RadioButtonIcons from "@/components/RadioButtonIcons";
import React, { useContext, useState } from "react";
import { MdSend } from "react-icons/md";
import { CgSpinnerTwo } from "react-icons/cg";
import { GrFormClose } from "react-icons/gr";
import { Formik } from "formik";
import * as yup from "yup";
import { database, functions } from "@/libs/appwrite";
import { useUser } from "@/hooks/useUser";
import { ID } from "appwrite";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ModalContext } from "@/context/ModalContext";

const commentSchema = yup.object().shape({
  comment: yup
    .string()
    .max(160, "Please limit your comment to 160 characters only.")
    .required("Comment body is required before posting"),
});

const initialComment = {
  comment: "",
  isPositiveFeedback: true,
};

const ReviewForm = ({ foodSpotId, isEdit, oldReview, closeEdit }) => {
  const router = useRouter();
  const { user, openModal } = useUser();
  const { refetchTopList } = useContext(ModalContext);
  const [posting, setPosting] = useState(false);

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (!user) {
      return openModal();
    }
    setPosting(true);
    if (isEdit) {
      try {
        const data = {
          comment: values.comment,
          isPositiveFeedback: values.isPositiveFeedback,
        };
        await database.updateDocument(
          process.env.NEXT_PUBLIC_DATABASE,
          process.env.NEXT_PUBLIC_REVIEWS,
          oldReview.$id,
          data
        );
        closeEdit();
        onSubmitProps.resetForm();
        router.refresh();
      } catch (error) {
        toast.error(error.message);
        console.error(error.message);
        setPosting(false);
        return;
      }
    } else {
      try {
        const data = { ...values, reviewerEmail: user.email, foodSpotId };
        await database.createDocument(
          process.env.NEXT_PUBLIC_DATABASE,
          process.env.NEXT_PUBLIC_REVIEWS,
          ID.unique(),
          data
        );
        onSubmitProps.resetForm();
        router.refresh();
      } catch (error) {
        toast.error(error.message);
        console.error(error.message);
        setPosting(false);
        return;
      }
    }

    try {
      await functions.createExecution(
        process.env.NEXT_PUBLIC_UPDATE_RATINGS_FUNC,
        foodSpotId,
        true
      );
      toast.success(`Review ${isEdit ? "edited" : "posted"}`);
      refetchTopList();
      router.refresh();
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setPosting(false);
    }
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isEdit ? oldReview : initialComment}
      validationSchema={commentSchema}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({
        values,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => (
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white dark:bg-gray-600 rounded-lg px-4 pt-2"
        >
          <div className="flex flex-col justify-center align-middle w-full -mx-3 mb-6">
            <div className="flex justify-between">
              <h5 className="font-bold px-4 pt-3 pb-2 text-gray-800 text-lg dark:text-white">
                {isEdit ? "Edit" : "Add a"} review
              </h5>
              {isEdit && (
                <button
                  onClick={closeEdit}
                  type="button"
                  className="text-gray-400 bg-transparent p-2 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                >
                  <GrFormClose />
                </button>
              )}
            </div>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                onBlur={handleBlur}
                disabled={posting}
                onChange={handleChange}
                value={values.comment}
                name="comment"
                className={`focus:outline-none focus:ring-1 focus:bg-white text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-white dark:bg-gray-700 border dark:placeholder-gray-400  ${
                  Boolean(errors.comment)
                    ? "focus:ring-red-500 focus:border-red-500 border-red-500 bg-red-200 dark:border-red-500   "
                    : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-600 dark:border-gray-500"
                } `}
                placeholder="Type Your Comment"
              ></textarea>
              {Boolean(errors.comment) && (
                <p className="text-xs m-2 text-red-300">{errors.comment}</p>
              )}
            </div>
            <div className="flex items-center align-middle justify-between w-full text-gray-700 px-2 mr-auto">
              <RadioButtonIcons
                isPositiveFeedback={values.isPositiveFeedback}
                setFieldValue={setFieldValue}
                disabled={posting}
              />
              <button
                type="submit"
                disabled={posting}
                className={`bg-gray-200 dark:bg-blue-700 dark:hover:bg-blue-400 text-gray-700 font-medium py-1 px-4  rounded-lg tracking-wide mr-1 hover:text-white hover:bg-blue-500 ${
                  posting && "cursor-not-allowed"
                }`}
              >
                <span className="inline-flex font-bold gap-2 justify-between align-middle items-center dark:text-white">
                  {isEdit ? "Update" : "Post"}
                  {posting ? (
                    <CgSpinnerTwo className="loading-icon" />
                  ) : (
                    <MdSend />
                  )}
                </span>
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ReviewForm;
