"use client";
import React, { useEffect, useState } from "react";
import { isAuthenticated, logout } from "../api/api";
import { IoIosCheckboxOutline, IoMdApps, IoIosLogOut } from "react-icons/io";
import { FaChartLine } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar: React.FC = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await isAuthenticated();
        setUser(true);
      } catch (error) {
        console.error("Error checking user:", error);
      }
    };
    checkUser();
  }, []);

  if (!user) {
    return (
      <div className="sidebar min-h-screen flex flex-col justify-between bg-gray-700 text-white m-5 p-5 rounded-lg border-4">
        <div className="logo p-4">
          <h3 className="text-3xl font-bold whitespace-nowrap">
            <a href="/" className="hover:text-blue-500">
              MY TASKS
            </a>
          </h3>
        </div>

        <div className="links flex flex-col justify-center">
          <a
            href="/login"
            className="p-4 hover:bg-gray-900 rounded-md flex gap-2"
          >
            <IoMdApps className="w-6 h-6 text-blue-500" />
            Login
          </a>
          <a
            href="/register"
            className="p-4 hover:bg-gray-900 rounded-md flex gap-2 whitespace-nowrap"
          >
            <IoIosCheckboxOutline className="w-6 h-6 text-blue-500 " />
            Register
          </a>
        </div>
      </div>
    );
  }

    const handleLogout = async () => {
        try {
        await logout();
        toast.success("Logout successful!");
        window.location.href = "/";
        } catch (error) {
        console.error("Error logging out:", error);
        toast.error("Error logging out!");
        }
    };
  

  return (
    <div className="sidebar min-h-screen flex flex-col justify-between bg-gray-700 text-white m-5 p-5 rounded-lg border-4">
      <ToastContainer />
      <div className="logo p-4">
        <h3 className="text-3xl font-bold whitespace-nowrap">
          <a href="/" className="hover:text-blue-500">
            MY TASKS{" "}
          </a>
        </h3>
      </div>

      <div className="links flex flex-col justify-center">
        <a
          href="/allTasks"
          className="p-4 hover:bg-gray-900 rounded-md flex gap-2"
        >
          <IoMdApps className="w-6 h-6 text-blue-500" />
          All tasks
        </a>
        <a
          href="/completed-tasks"
          className="p-4 hover:bg-gray-900 rounded-md flex gap-2 whitespace-nowrap"
        >
          <IoIosCheckboxOutline className="w-6 h-6 text-blue-500 " />
          Completed tasks
        </a>
        <a
          href="/analytics"
          className="p-4 hover:bg-gray-900 rounded-md flex gap-2"
        >
          <FaChartLine className="w-6 h-6 text-blue-500" />
          Analytics
        </a>
      </div>

      <div className="logout p-4">
        <button
            onClick={handleLogout}
          className="p-4 hover:bg-gray-900 rounded-md flex gap-2"
        >
          LogOut <IoIosLogOut className="w-6 h-6 text-blue-500" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
