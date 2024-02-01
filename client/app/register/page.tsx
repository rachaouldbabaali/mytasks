"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import withAuth from '../utils/withAuth';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SignUpProps {
  onSignUp: (name: string, email: string, password: string) => void;
}

const SignUpPage: React.FC<SignUpProps> = () => {
  const router = useRouter();

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values: typeof initialValues) => {
    const { name, email, password } = values;

    try {
      const response = await register(name, email, password);

      if (response.status === 201) {
        toast.success('Signup successful!');
        router.push('/login');
      } else if (response.status === 409) {
        toast.error('Email already exists!');
      } else {
        toast.error('Signup failed!');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Something went wrong!');
      }
    }
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
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border rounded-md"
                placeholder="Enter your password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
              type="submit"
            >
              Sign Up
            </button>

            <div className="mt-4">
              <button
                className="text-blue-500 hover:underline"
                type="button"
                onClick={() => router.push('/login')}
              >
                Already have an account? Login
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default withAuth(SignUpPage);
