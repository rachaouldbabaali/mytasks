"use client"
import React from "react";
import { IoIosCheckboxOutline, IoIosCheckmark, IoMdTime } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";

interface TaskProps {
  taskName: string;
  description: string;
  status: "completed" | "not completed";
  creationDate: string;
  completionDate?: string | null;
}

const Task: React.FC<TaskProps> = ({
  taskName,
  description,
  status,
  creationDate,
  completionDate,
}) => {
  const isCompleted = status === "completed";

  const handleCompleteTask = () => {
    console.log(`Task ${taskName} completed`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex-1 whitespace-nowrap">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">{taskName}</h2>
        {isCompleted ? (
          <span className="text-sm text-green-500">Completed</span>
        ) : (
          <button
            className="text-sm text-red-500 hover:text-red-700 cursor-pointer"
            onClick={() => handleCompleteTask()}
          >
            Mark as completed
          </button>
        )}
      </div>
      <p className="text-gray-700 my-4">{description}</p>
      <div className="flex items-center  border-t-2">
        <div className="flex items-center">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <span>Created: {creationDate}</span>
        </div>
        {isCompleted && (
          <div className="flex items-center ml-4">
            <IoMdTime className="text-gray-500 mr-2" />
            <span>Completed: {completionDate}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const AllTasksPage: React.FC = () => {
  // Example tasks data
  const tasks: TaskProps[] = [
    {
      taskName: "Task 1",
      description: "Description for Task 1",
      status: "completed",
      creationDate: "2022-01-01",
      completionDate: "2022-01-10",
    },
    {
      taskName: "Task 3",
      description: "Description for Task 3",
      status: "completed",
      creationDate: "2022-01-10",
      completionDate: "2022-01-15",
    },
    {
      taskName: "Task 2",
      description: "Description for Task 2",
      status: "not completed",
      creationDate: "2022-01-05",
    },
    {
      taskName: "Task 6",
      description: "Description for Task 6",
      status: "not completed",
      creationDate: "2022-01-05",
    },
    {
      taskName: "Task 4",
      description: "Description for Task 4",
      status: "not completed",
      creationDate: "2022-01-15",
    },
    {
      taskName: "Task 5",
      description: "Description for Task 5",
      status: "completed",
      creationDate: "2022-01-20",
      completionDate: "2022-01-25",
    },
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">All Tasks</h1>
      <div className="flex flex-wrap gap-4 shaddow-lg">
        {tasks.map((task, index) => (
          <Task key={index} {...task} />
        ))}
      </div>
    </div>
  );
};

export default AllTasksPage;
