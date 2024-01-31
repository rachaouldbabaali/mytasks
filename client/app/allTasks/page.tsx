"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getTasks, markTaskAsCompleted } from "../api/api";
import Task from "../components/Task";
import NewTaskModal from "../components/NewTaskModal";
import { IoIosCheckboxOutline, IoIosCheckmark, IoMdTime } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";

interface TaskProps {
  _id: string;
  name: string;
  description: string;
  status: "completed" | "not completed";
  creationDate: string;
  completionDate?: string | null;
}

const AllTasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleCreateTask = async (taskData: { name: string; description: string }) => {
    try {
      await createTask(taskData);
      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
      window.location.reload();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="container mx-auto mt-4 ">
        <div className="flex justify-around">
        <h1 className="text-3xl font-bold mb-6 text-gray-100">All Tasks</h1>
        <button 
        className="rounded-lg shadow-md bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4"
        onClick={() => setIsModalOpen(true)}>
            Create Task
        </button>
        </div>
      
      <div className="flex flex-wrap gap-4 shaddow-lg">
        {tasks.length === 0 ? (
    <div className="flex items-center justify-center">
    <div className="flex flex-col items-center pt-50">
      <p className="text-xl text-center my-36 text-gray-900">You have no tasks yet!</p>
      
    </div>
  </div>
  ) : (
    tasks.map((task) => (
      <Task
        key={task._id}
        name={task.name}
        description={task.description}
        status={task.status}
        creationDate={task.creationDate}
        completionDate={task.completionDate}
        onMarkAsCompleted={() => markTaskAsCompleted(task._id)}
      />
    ))
  )}
        
      </div>
      {isModalOpen && (
        <NewTaskModal onClose={() => setIsModalOpen(false)} onCreateTask={handleCreateTask} />
      )}
    </div>
  );
};

export default AllTasksPage;
