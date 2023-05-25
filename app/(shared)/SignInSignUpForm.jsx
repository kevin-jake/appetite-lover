"use client";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Required")
    .max(35, "Nickname will be fine, if your name is that long.")
    .matches(/^[^0-9]*$/, "Your name should not contain any numbers"),
  lastName: yup
    .string()
    .required("Required")
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
  // mobileNumber: yup
  //   .string()
  //   .matches(/^(\+63|0)\d{9,10}$/, {
  //     message:
  //       "Mobile number must start with +63 or 0, followed by 9 or 10 digits",
  //   })
  //   .test("is-allowed-length", "Invalid mobile number length", (value) => {
  //     if (value?.startsWith("+63")) {
  //       return value.length === 13;
  //     } else if (value?.startsWith("0")) {
  //       return value.length === 11;
  //     }
  //     return false;
  //   })
  //   .required("Required"),
  // isTermsChecked: yup
  //   .boolean()
  //   .oneOf([true], "Please read and check the Terms of Use"),
  // isPrivacyChecked: yup
  //   .boolean()
  //   .oneOf([true], "Please read and check the Privacy Policy"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  imagePath: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const SignInSignUpForm = ({ setModalType, pageType, closeModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isLogin = pageType === "Login";
  console.log(
    "🚀 ~ file: SignInSignUpForm.jsx:73 ~ SignInSignUpForm ~ isLogin:",
    isLogin
  );
  const isRegister = pageType === "Register";

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const handleRegister = async (values, onSubmitProps) => {
  //   const valuesWithImage = await uploadImage(values);
  //   const userData = await register(values.imagePath ? valuesWithImage : values)
  //     .unwrap()
  //     .then()
  //     .catch((error) => notifyError(error));
  //   onSubmitProps.resetForm();
  //   dispatch(setLogin(userData));
  //   closeModal();
  // };

  // const handleLogin = async (values, onSubmitProps) => {
  //   const userData = await login(values)
  //     .unwrap()
  //     .then()
  //     .catch((error) => notifyError(error));
  //   onSubmitProps.resetForm();
  //   dispatch(setLogin(userData));
  //   closeModal();
  // };

  const handleFormSubmit = (values, onSubmitProps) => {
    console.log(
      "🚀 ~ file: SignInSignUpForm.jsx:103 ~ handleFormSubmit ~ values:",
      values
    );
    // try {
    if (isLogin) {
      console.log("login");
    }
    if (isRegister) {
      console.log("register");
    }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => {
        console.log(
          "🚀 ~ file: SignInSignUpForm.jsx:139 ~ SignInSignUpForm ~ errors:",
          errors
        );
        console.log(
          "🚀 ~ file: SignInSignUpForm.jsx:135 ~ SignInSignUpForm ~ values:",
          values
        );

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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
              />
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required={isRegister}
              />
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.firstName}
                  />
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lastName}
                  />
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
            <div className="flex justify-between">
              <a
                href="#"
                className="text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {pageType}
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
