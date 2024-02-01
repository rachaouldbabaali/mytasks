import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { markTaskAsCompleted, updateTask, deleteTask } from "../api/api";
import { IoMdTime } from "react-icons/io";
import { FaCalendarAlt, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TaskProps {
  taskId: string;
  name: string;
  description: string;
  status: boolean;
  creationDate: string;
  completionDate?: string | null;
}

const Task: React.FC<TaskProps> = ({
  taskId,
  name,
  description,
  status,
  creationDate,
  completionDate,
}) => {
  const [isCompleted, setIsCompleted] = useState(status);
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const router = useRouter();
  const handleCompleteTask = async (id: string) => {
    try {
      const response = await markTaskAsCompleted(id);
      toast.success("Task completed!");
      
      setIsCompleted(true);
      window.location.reload();
    } catch (error) {
      console.error("Error completing task:", error);
      toast.error("Error completing task!");
    }
  };

  const handleEdit = () => {
    setUpdatedName(name);
    setUpdatedDescription(description);
    setEditMode(true);
  };

  const handleSave = () => {
    setEditMode(false);
    const task = {
      name: updatedName,
      description: updatedDescription,
    };
    const updateTaskData = async () => {
      try {
        const response = await updateTask(taskId, task);
        toast.success("Task updated!");
        window.location.reload();
      } catch (error) {
        console.error("Error updating task:", error);
        toast.error("Error updating task!");
      }
    };
    updateTaskData();
  };

  const handleDeleteTask = async (id: string) => {
     try {
        const response = await deleteTask(id);
        toast.success("Task deleted!");
        window.location.reload();
        } catch (error) {
            console.error("Error deleting task:", error);
            toast.error("Error deleting task!");
        }
  };

  useEffect(() => {
    setIsCompleted(status);
  }, [status]);

  return (
    <div className=" p-4 rounded-lg shadow-md mb-4 flex-1 whitespace-nowrap bg-[#ffd6a5]" >
      <ToastContainer />
      <div className="flex justify-between items-center mb-2">
        {editMode ? (
          <div className="flex flex-col gap-4 text-pretty">
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              className="text-lg font-bold cursor-pointer"
            />
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              onClick={handleEdit}
              className="cursor-pointer"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4 text-pretty">
            <h2
              className="text-lg font-bold cursor-pointer whitespace-nowrap"
              onClick={handleEdit}
            >
              {name}
            </h2>
            <p className="cursor-pointer" onClick={handleEdit}>
              {description}
            </p>
          </div>
        )}
        {isCompleted ? (
          <span className="text-sm flex self-start justify-items-start ">
          <span className="text-sm flex self-start justify-items-start text-green-500">
            Completed
          </span>
          <FaTrash
            className=" cursor-pointer ml-3 text-red-700 hover:text-red-900"
            onClick={() => handleDeleteTask(taskId)}
          />
        </span>
        ) : (
          <span className="text-sm flex self-start justify-items-start ">
            <button
              className="text-sm  hover:text-red-700 text-red-500 cursor-pointer"
              onClick={() => handleCompleteTask(taskId)}
            >
              Mark as completed
            </button>
            <FaTrash
              className=" cursor-pointer ml-3 text-red-700 hover:text-red-900"
              onClick={() => handleDeleteTask(taskId)}
            />
          </span>
        )}
        {editMode && (
          <button
            className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer flex self-start justify-items-start"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
      <div className="flex flex-col md:flex-row items-center justify-around pt-2 border-t-2">
        <div className="flex items-center ">
          <FaCalendarAlt className="text-gray-500 mr-2" />
          <span>Created: {creationDate?.slice(0, 10)}</span>
        </div>
        {isCompleted && (
          <div className="flex items-center ml-4">
            <IoMdTime className="text-gray-500 mr-2" />
            <span>Completed: {completionDate?.slice(0, 10)}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
