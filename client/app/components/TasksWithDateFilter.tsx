import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getCompletedTasksBetweenDates,
  getNumberOfTasksBetweenDates,
} from "../api/api";
import Task from "./Task";

interface TaskProps {
  _id: string;
  name: string;
  description: string;
  status: "completed" | "not completed";
  creationDate: string;
  completionDate?: string | null;
}

const TasksWithDateFilter: React.FC = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [numberOfTasks, setNumberOfTasks] = useState<number>(0);
  const [numberOfCompletedTasks, setNumberOfCompletedTasks] =
    useState<number>(0);
  const [numberOfUncompletedTasks, setNumberOfUncompletedTasks] =
    useState<number>(0);

  useEffect(() => {
    fetchTasks();
  }, [startDate, endDate]);

  const fetchTasks = async () => {
    try {
      if (startDate && endDate) {
        const formattedStartDate = startDate.toISOString().split("T")[0];
        const formattedEndDate = endDate.toISOString().split("T")[0];
        const tasksData = await getCompletedTasksBetweenDates(
          formattedStartDate,
          formattedEndDate
        );
        const numberOfTasksData = await getNumberOfTasksBetweenDates(
          formattedStartDate,
          formattedEndDate
        );
        setNumberOfTasks(numberOfTasksData.allTasks);
        setNumberOfCompletedTasks(numberOfTasksData.completed);
        setNumberOfUncompletedTasks(numberOfTasksData.incompleted);
        if (tasksData) {
          setTasks(tasksData);
        } else {
          setTasks([]);
        }
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    }
  };

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      setEndDate(date);
    }
  };

  const ratio = (numberOfCompletedTasks / numberOfTasks) * 100;

  return (
    <div className="container mx-auto mt-16">
      <div className="flex flex-col justify-around border-b-4 border-gray-500 pb-4 mb-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">
          Tasks with Date Filter
        </h1>
        <div className="flex flex-col md:flex-row items-center space-x-4">
          <label>Start Date:</label>
          <DatePicker
            selected={startDate}
            maxDate={endDate}
            onChange={handleStartDateChange}
            dateFormat="dd/MM/yyyy"
          />
          <label>End Date:</label>
          <DatePicker
            selected={endDate}
            minDate={startDate}
            onChange={handleEndDateChange}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 shaddow-lg">
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-700">
            Completion Rate: {ratio ? ratio.toFixed(2) : 0}%
          </p>
        </div>
        
        <div className="mt-4 flex flex-wrap gap-4 ">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center">
            <div className="flex flex-col items-center pt-50">
              <p className="text-xl text-center my-36 text-gray-900">
                Select dates!
              </p>
            </div>
          </div>
        ) : (
          tasks.map((task) => (
            <Task
              key={task._id}
              taskId={task._id}
              name={task.name}
              description={task.description}
              status={task.status}
              creationDate={task.creationDate}
              completionDate={task.completionDate}
            />
          ))
        )}
        </div>
      </div>
    </div>
  );
};

export default TasksWithDateFilter;
