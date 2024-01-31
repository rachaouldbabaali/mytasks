"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { register } from '../api/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SignUpProps {
  onSignUp: (name: string, email: string, password: string) => void;
}

const SignUpPage: React.FC<SignUpProps> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();
  
  const handleSignUp = async (e: SyntheticEvent) => {
      e.preventDefault();
    if (name && email && password) {
      onSignUp(name, email, password);
    } else {
        toast.error('Please enter valid name, email, and password');
    }};

  const onSignUp = async (name: string, email: string, password: string) => {
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
      <form 
        className="bg-white p-8 rounded shadow-md w-96"
        onSubmit={handleSignUp}
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
      </form>
    </div>
    </>
  );
};

export default SignUpPage;
