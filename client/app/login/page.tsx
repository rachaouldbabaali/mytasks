"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../api/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const LoginPage: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const onLogin = async (email: string, password: string) => {
    const response = await login(email, password);

    if (response.status === 200) {
      toast.success("Login successful!");
    router.push("/allTasks");
    } else {
        toast.error("Login failed!");
        }

  };


  const handleLogin = (e: SyntheticEvent) => {
    e.preventDefault();
    if (email && password) {
      onLogin(email, password);
    } else {
      toast.error("Please enter valid email and password");
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
        <form
          className="bg-white p-8 rounded shadow-md w-96"
          onSubmit={handleLogin}
        >
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
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
        </form>
      </div>
    </>
  );
};

export default LoginPage;
