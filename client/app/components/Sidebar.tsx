"use client";
import React, { useEffect, useState } from "react";
import { isAuthenticated, logout } from "../api/api";
import { usePathname, useRouter } from "next/navigation";
import { IoIosCheckboxOutline, IoIosSquareOutline,IoMdApps, IoIosLogOut } from "react-icons/io";
import { FaChartLine } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar: React.FC = () => {
  const [user, setUser] = useState(false);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await isAuthenticated();
        setUser(true);
      } catch (error) {
        setUser(false);
      }
    };
    checkUser();
  });

  if (!user) {
    return (
      <div className="sidebar min-h-screen flex flex-col justify-between border-gray-500 bg-[#f7d9c4] text-gray-700 m-5 p-5 rounded-lg border-4">
        <div className="logo p-4">
          <h3 className="text-3xl font-bold whitespace-nowrap">
            <a href="/" className="hover:text-blue-500 text-gray-700">
              MY TASKS
            </a>
          </h3>
        </div>

        <div className="links flex flex-col justify-center">
          <a
            href="/login"
            className="p-4 hover:bg-[#c9e4de] rounded-md flex gap-2"
          >
            <IoMdApps className="w-6 h-6 text-gray-700" />
            Login
          </a>
          <a
            href="/register"
            className="p-4 hover:bg-[#c9e4de] rounded-md flex gap-2 whitespace-nowrap"
          >
            <IoIosCheckboxOutline className="w-6 h-6 text-gray-700 " />
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
        router.push("/login");
        } catch (error) {
        console.error("Error logging out:", error);
        toast.error("Error logging out!");
        }
    };
  

  return (
    <>
      <ToastContainer />
    <div className="sidebar min-h-screen flex flex-col justify-between border-gray-500 bg-[#f7d9c4] text-gray-700 m-5 p-5 rounded-lg border-4">
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
  className={`p-4 hover:bg-[#c9e4de] rounded-md flex gap-2 ${path == '/allTasks' ? 'bg-[#c9e4de]' : 'text-gray-700'}`}
>
  <IoMdApps className="w-6 h-6" />
  All tasks
</a>
        <a
          href="/completedTasks"
          className={`p-4 hover:bg-[#c9e4de] rounded-md flex gap-2 ${path == '/completedTasks' ? 'bg-[#c9e4de]' : 'text-gray-700'}`}
        >
          <IoIosCheckboxOutline className="w-6 h-6 text-gray-700 " />
          Completed tasks
        </a>
        <a href="/incompletedTasks"
          className={`p-4 hover:bg-[#c9e4de] rounded-md flex gap-2 ${path == '/incompletedTasks' ? 'bg-[#c9e4de]' : 'text-gray-700'}`}
        >
          <IoIosSquareOutline className="w-6 h-6 text-gray-700 " />
          Incompleted tasks
        </a>
        <a
          href="/dashboard"
          className={`p-4 hover:bg-[#c9e4de] rounded-md flex gap-2 ${path == '/dashboard' ? 'bg-[#c9e4de]' : 'text-gray-700'}`}
        >
          <FaChartLine className="w-6 h-6 text-gray-700" />
          Dashboard
        </a>
      </div>

      <div className="logout p-4">
        <button
            onClick={handleLogout}
          className="p-4 hover:bg-[#c9e4de] rounded-md flex gap-2"
        >
          LogOut <IoIosLogOut className="w-6 h-6 text-gray-500" />
        </button>
      </div>
    </div>
    </>
  );
};

export default Sidebar;
