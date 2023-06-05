"use client";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useUser } from "@/hooks/useUser";
import { CgSpinnerTwo } from "react-icons/cg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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
    .min(8, "Password must be at least 8 characters"),
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
  const { login, register, loading } = useUser();
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
                Email
              </label>
              <input
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                type="email"
                id="email"
                className={`focus:outline-none focus:ring-1 focus:bg-white text-gray-900 text-sm rounded-lg  block w-full p-2.5  dark:text-white dark:bg-gray-700 border dark:placeholder-gray-400   ${
                  Boolean(touched.email) && Boolean(errors.email)
                    ? "focus:ring-red-500 focus:border-red-500 border-red-500 bg-red-200 dark:border-red-500 "
                    : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-600 dark:border-gray-500"
                } `}
              />
              {Boolean(touched.email) && Boolean(errors.email) && (
                <p className="text-xs m-2 text-red-300">
                  {touched.email && errors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="relative mb-2">
                <input
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  className={`focus:outline-none focus:ring-1 focus:bg-white text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:text-white dark:bg-gray-700 border dark:placeholder-gray-400   ${
                    Boolean(touched.password) && Boolean(errors.password)
                      ? "focus:ring-red-500 focus:border-red-500 border-red-500 bg-red-200 dark:border-red-500 "
                      : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-600 dark:border-gray-500   "
                  } `}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-lg leading-5">
                  {showPassword ? (
                    <button
                      type="button"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      <AiFillEyeInvisible />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      <AiFillEye />
                    </button>
                  )}
                </div>
              </div>
              {Boolean(touched.password) && Boolean(errors.password) && (
                <p className="text-xs m-2 text-red-300">
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
                    className={`focus:outline-none focus:ring-1 focus:bg-white text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:text-white dark:bg-gray-700 border dark:placeholder-gray-400  ${
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                        ? "focus:ring-red-500 focus:border-red-500 border-red-500 bg-red-200 dark:border-red-500 "
                        : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-600 dark:border-gray-500   "
                    } `}
                  />
                  {Boolean(touched.firstName) && Boolean(errors.firstName) && (
                    <p className="text-xs m-2 text-red-300">
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
                    className={`focus:outline-none focus:ring-1 focus:bg-white text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:text-white dark:bg-gray-700 border dark:placeholder-gray-400 ${
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                        ? "focus:ring-red-500 focus:border-red-500 bg-red-200 border-red-500 dark:border-red-500 "
                        : "focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-600 dark:border-gray-500   "
                    } `}
                  />
                  {Boolean(touched.lastName) && Boolean(errors.lastName) && (
                    <p className="text-xs m-2 text-red-300">
                      {touched.lastName && errors.lastName}
                    </p>
                  )}
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
              className="flex justify-center w-full text-white bg-emerald-700 hover:bg-emerald-600 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              {loading ? <CgSpinnerTwo className="loading-icon" /> : pageType}
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
