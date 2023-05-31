"use client";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { UseUser } from "@/hooks/useUser";
import Loading from "./Loading";

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Required")
    .max(35, "Nickname will be fine, if your name is that long.")
    .matches(/^[^0-9]*$/, "Your name should not contain any numbers"),
  lastName: yup
    .string()
    .max(
      35,
      "Woah! you have a longer last name than Sir Wolfeschlegelsteinhausenbergerdorff. Apply in Guiness and get back to us."
    )
    .matches(/^[^0-9]*$/, "Your name should not contain any numbers"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(6, "Password must be at least 6 characters"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  imagePath: "",
};

const SignInSignUpForm = ({ setModalType, pageType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, register, loading } = UseUser();
  const isLogin = pageType === "Login";
  const isRegister = pageType === "Register";

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      const { email, password } = values;
      login(email, password);
    }
    if (isRegister) {
      const { email, password, firstName, lastName } = values;
      const name = `${firstName} ${lastName}`;
      register(email, password, name);
    }
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => {
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                required={isRegister}
                type="email"
                id="email"
                className={`focus:outline-none focus:ring-1 focus:bg-white  dark:text-white border dark:placeholder-gray-400  text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${
                  Boolean(touched.email) && Boolean(errors.email)
                    ? "focus:ring-red-500 focus:border-red-500 border-red-500 dark:bg-red-600 dark:border-red-500 "
                    : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-600 dark:border-gray-500   "
                } `}
              />
              {Boolean(touched.email) && Boolean(errors.email) && (
                <p className="text-xs text-red-300">
                  {touched.email && errors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                required={isRegister}
                className={`focus:outline-none focus:ring-1 focus:bg-white dark:text-white border dark:placeholder-gray-400  text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${
                  Boolean(touched.password) && Boolean(errors.password)
                    ? "focus:ring-red-500 focus:border-red-500 border-red-500 dark:bg-red-600 dark:border-red-500 "
                    : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-600 dark:border-gray-500   "
                } `}
              />
              {Boolean(touched.password) && Boolean(errors.password) && (
                <p className="text-xs text-red-300">
                  {touched.password && errors.password}
                </p>
              )}
            </div>
            {isRegister && (
              <>
                <div>
                  <label
                    htmlFor="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First name
                  </label>
                  <input
                    name="firstName"
                    id="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                    className={`focus:outline-none focus:ring-1 focus:bg-white  dark:text-white border dark:placeholder-gray-400  text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                        ? "focus:ring-red-500 focus:border-red-500 border-red-500 dark:bg-red-600 dark:border-red-500 "
                        : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-600 dark:border-gray-500   "
                    } `}
                  />
                  {Boolean(touched.firstName) && Boolean(errors.firstName) && (
                    <p className="text-xs text-red-300">
                      {touched.firstName && errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last name
                  </label>
                  <input
                    name="lastName"
                    id="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                    className={`focus:outline-none focus:ring-1 focus:bg-white  dark:text-white border dark:placeholder-gray-400  text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                        ? "focus:ring-red-500 focus:border-red-500 border-red-500 dark:bg-red-600 dark:border-red-500 "
                        : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-600 dark:border-gray-500   "
                    } `}
                  />
                  {Boolean(touched.lastName) && Boolean(errors.lastName) && (
                    <p className="text-xs text-red-300">
                      {touched.lastName && errors.lastName}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="location"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Location
                  </label>
                  <input
                    name="location"
                    id="location"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.location}
                  />
                </div>
              </>
            )}
            {/* <div className="flex justify-between">
              <a
                href="#"
                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </a>
            </div> */}
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? <Loading /> : pageType}
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              {isLogin ? "Not registered? " : "Already have an account? "}
              <a
                href="#"
                onClick={() => setModalType(isLogin ? "Register" : "Login")}
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                {isLogin ? "Create account" : "Login here"}
              </a>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default SignInSignUpForm;
