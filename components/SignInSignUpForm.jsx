"use client";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useUser } from "@/hooks/useUser";
import { CgSpinnerTwo } from "react-icons/cg";
import { AiFillEye, AiFillEyeInvisible, AiOutlineGoogle } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { account } from "@/libs/appwrite";

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
    <>
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
                    {Boolean(touched.firstName) &&
                      Boolean(errors.firstName) && (
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
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <div className="flex flex-col justify-center gap-2 items-center w-full">
        <button
          onClick={() =>
            account.createOAuth2Session("google", process.env.NEXT_PUBLIC_URL)
          }
          className="flex items-center bg-white border border-gray-300 rounded-lg px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <svg
            className="h-6 w-6 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="800px"
            height="800px"
            viewBox="-0.5 0 48 48"
            version="1.1"
          >
            <title>Google-color</title>
            <desc>Created with Sketch.</desc>
            <g
              id="Icons"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Color-" transform="translate(-401.000000, -860.000000)">
                <g id="Google" transform="translate(401.000000, 860.000000)">
                  <path
                    d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                    id="Fill-1"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                    id="Fill-2"
                    fill="#EB4335"
                  ></path>
                  <path
                    d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                    id="Fill-3"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                    id="Fill-4"
                    fill="#4285F4"
                  ></path>
                </g>
              </g>
            </g>
          </svg>

          <span>Continue with Google</span>
        </button>
        <button
          onClick={() =>
            account.createOAuth2Session("facebook", process.env.NEXT_PUBLIC_URL)
          }
          className="flex gap-2 items-center bg-white border border-gray-300 rounded-lg px-6 py-2 text-sm font-medium text-blue-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <FaFacebookF size={20} />
          <span className="text-gray-800">Continue with Facebook</span>
        </button>
      </div>
    </>
  );
};

export default SignInSignUpForm;
