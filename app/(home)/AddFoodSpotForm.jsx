"use client";
import { Formik } from "formik";
import * as yup from "yup";
import { CgSpinnerTwo } from "react-icons/cg";
import ImageDropzone from "../(shared)/ImageDropzone";
import { ID } from "appwrite";
import { database, storage } from "@/libs/appwrite";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UseUser } from "@/hooks/useUser";

const foodSpotSchema = yup.object().shape({
  foodSpotName: yup
    .string()
    .required("Food Name is required.")
    .max(255, "Please limit your description to 255 characters only."),
  description: yup
    .string()
    .max(255, "Please limit your description to 255 characters only."),
});

const initialValues = {
  foodSpotName: "",
  description: "",
  imgUrl: "",
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

const AddFoodSpotForm = ({ area, areaId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, openModal } = UseUser();

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (!user) {
      return openModal();
    }
    setLoading(true);
    let data = { ...values, areaId };
    if (values.imgUrl) {
      data.imgUrl = await uploadImage(values.imgUrl);
    }

    try {
      const result = await database.createDocument(
        process.env.NEXT_PUBLIC_DATABASE,
        process.env.NEXT_PUBLIC_FOOD_SPOT,
        ID.unique(),
        data
      );
      onSubmitProps.resetForm();
      toast.success("Food Spot successfully created.");
      router.push(`/details/${area}/${result.$id}`);
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
      validationSchema={foodSpotSchema}
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
                htmlFor="foodSpotName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Food Spot Name
              </label>
              <input
                label=" Food Spot Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.foodSpotName}
                name="foodSpotName"
                type="foodSpotName"
                id="foodSpotName"
                className={`focus:outline-none focus:ring-1 focus:bg-white text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-white dark:bg-gray-700 border dark:placeholder-gray-400   ${
                  Boolean(touched.foodSpotName) && Boolean(errors.foodSpotName)
                    ? "focus:ring-red-500 focus:border-red-500 border-red-500 bg-red-200 dark:border-red-500 "
                    : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-600 dark:border-gray-500"
                } `}
              />
              {Boolean(touched.foodSpotName) &&
                Boolean(errors.foodSpotName) && (
                  <p className="text-xs m-2 text-red-300">
                    {touched.foodSpotName && errors.foodSpotName}
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

export default AddFoodSpotForm;
