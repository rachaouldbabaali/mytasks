import React from "react";
import { IoIosCheckboxOutline, IoMdApps, IoIosLogOut } from 'react-icons/io';
import { FaChartLine } from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar h-min-screen lg:flex flex-col justify-between bg-gray-700 text-white m-5 p-5 rounded-lg border-2">
      <div className="logo p-4">
        <h3 className="text-3xl font-bold whitespace-nowrap">
            <a href="/" className="hover:text-blue-500">MY TASKS</a>
        </h3>
      </div>

      <div className="links flex flex-col justify-center">
        <a href="/allTasks" className="p-4 hover:bg-gray-900 rounded-md flex gap-2">
          <IoMdApps className="w-6 h-6 text-blue-500" />
          All tasks
        </a>
        <a href="/completed-tasks" className="p-4 hover:bg-gray-900 rounded-md flex gap-2 whitespace-nowrap">
          <IoIosCheckboxOutline className="w-6 h-6 text-blue-500 " />
          Completed tasks
        </a>
        <a href="/analytics" className="p-4 hover:bg-gray-900 rounded-md flex gap-2">
          <FaChartLine className="w-6 h-6 text-blue-500" />
          Analytics
        </a>
      </div>

      <div className="logout p-4">
        <a href="/logout" className="p-4 hover:bg-gray-900 rounded-md flex gap-2">
          Logout <IoIosLogOut className="w-6 h-6 text-blue-500" />
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
