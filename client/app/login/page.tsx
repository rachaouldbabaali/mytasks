"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { login, isAuthenticatedUser } from "../api/api";
import withAuth from '../utils/withAuth';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const LoginPage: React.FC<LoginProps> = () => {
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });

  const onSubmit = async (values: typeof initialValues) => {
    const { email, password } = values;

    try {
      const response = await login(email, password);

      if (response.status === 200) {
        toast.success("Login successful!");
        router.push("/allTasks");
      } else {
        toast.error("Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred during login.");
    }
  };

  const handleSignUp = () => {
    router.push("/register");
  };

  return (
    <>
      <div>
        <ToastContainer />
      </div>
      <div className="min-h-screen flex items-center justify-center">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="bg-white p-8 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Login</h2>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
              type="submit"
            >
              Login
            </button>

            <div className="mt-4">
              <button
                className="text-blue-500 hover:underline"
                type="button"
                onClick={handleSignUp}
              >
                Don't have an account? Sign Up
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default withAuth(LoginPage);
