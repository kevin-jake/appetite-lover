"use client";
import { Formik } from "formik";
import * as yup from "yup";
import { CgSpinnerTwo } from "react-icons/cg";
import { ID } from "appwrite";
import { database, storage } from "@/libs/appwrite";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import ImageDropzone from "@/app/(shared)/ImageDropzone";

const foodMenuSchema = yup.object().shape({
  foodName: yup
    .string()
    .required("Food Name is required.")
    .max(255, "Please limit the name to 255 characters only."),
  description: yup
    .string()
    .max(255, "Please limit the description to 255 characters only."),
  price: yup.number().min(0, "Please input a valid number."),
});

const initialValues = {
  foodName: "",
  description: "",
  price: "",
  imgUrl: null,
};

const uploadImage = async (image) => {
  try {
    const fileId = ID.unique();
    const res = await storage.createFile(
      process.env.NEXT_PUBLIC_IMAGE_BUCKET,
      fileId,
      image
    );
    return `${process.env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${process.env.NEXT_PUBLIC_IMAGE_BUCKET}/files/${res.$id}/preview?project=${process.env.NEXT_PUBLIC_PROJECT}`;
  } catch (error) {
    toast.error(error.message);
    console.error(error.message);
  }
};

const AddFoodMenuForm = ({ foodSpotId, closeModal }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, openModal } = useUser();

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (!user) {
      return openModal();
    }
    setLoading(true);
    let data = { ...values, foodSpotId };
    if (values.imgUrl) {
      data.imgUrl = await uploadImage(values.imgUrl);
    }

    try {
      const result = await database.createDocument(
        process.env.NEXT_PUBLIC_DATABASE,
        process.env.NEXT_PUBLIC_FOOD_MENU,
        ID.unique(),
        data
      );
      onSubmitProps.resetForm();
      closeModal();
      toast.success("Food Menu successfully created.");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={foodMenuSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
      }) => {
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="foodName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Food Name
              </label>
              <input
                label="Food Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.foodName}
                name="foodName"
                type="foodName"
                id="foodName"
                className={`focus:outline-none focus:ring-1 focus:bg-white text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-white dark:bg-gray-700 border dark:placeholder-gray-400   ${
                  Boolean(touched.foodName) && Boolean(errors.foodName)
                    ? "focus:ring-red-500 focus:border-red-500 border-red-500 bg-red-200 dark:border-red-500 "
                    : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-600 dark:border-gray-500"
                } `}
              />
              {Boolean(touched.foodName) && Boolean(errors.foodName) && (
                <p className="text-xs m-2 text-red-300">
                  {touched.foodName && errors.foodName}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                label="Food Menu Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                className={`focus:outline-none focus:ring-1 focus:bg-white text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:text-white dark:bg-gray-700 border dark:placeholder-gray-400   ${
                  Boolean(touched.description) && Boolean(errors.description)
                    ? "focus:ring-red-500 focus:border-red-500 border-red-500 bg-red-200 dark:border-red-500 "
                    : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-600 dark:border-gray-500   "
                } `}
              />
              {Boolean(touched.description) && Boolean(errors.description) && (
                <p className="text-xs m-2 text-red-300">
                  {touched.description && errors.description}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <div className="relative mb-6">
                <div className="absolute h-full inset-y-0 left-0 flex items-center pointer-events-none">
                  <span className="text-gray-400 font-bold text-md m-4">
                    Php
                  </span>
                </div>
                <input
                  label="Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  type="number"
                  name="price"
                  className={`focus:outline-none focus:ring-1 focus:bg-white text-gray-900 text-sm rounded-lg  block w-full pl-14 p-2.5  dark:text-white dark:bg-gray-700 border dark:placeholder-gray-400   ${
                    Boolean(touched.price) && Boolean(errors.price)
                      ? "focus:ring-red-500 focus:border-red-500 border-red-500 bg-red-200 dark:border-red-500 "
                      : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-600 dark:border-gray-500   "
                  } `}
                />
                {Boolean(touched.price) && Boolean(errors.price) && (
                  <p className="text-xs m-2 text-red-300">
                    {touched.price && errors.price}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <ImageDropzone setFieldValue={setFieldValue} values={values} />
            </div>
            <button
              type="submit"
              className="flex justify-center w-full text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              {loading ? <CgSpinnerTwo className="loading-icon" /> : "Submit"}
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default AddFoodMenuForm;
