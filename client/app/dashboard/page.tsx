"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import withAuth from '../utils/withAuth';
import DatePicker from "react-datepicker";
import {
  getNumberOfTasks,
  getNumberOfTasksByDate,
} from "../api/api";
import PieChartComp from "../components/PieChartComp";
import BarGraphComp from "../components/BarGraphComp";
import TasksWithDateFilter from "../components/TasksWithDateFilter";
import LineChartComp from "../components/LineChartComp";
import "react-datepicker/dist/react-datepicker.css";

const AnalyticsPage: React.FC = () => {
  const [numberOfTasks, setNumberOfTasks] = useState(0);
  const [numberOfCompletedTasks, setNumberOfCompletedTasks] = useState(0);
  const [numberOfUncompletedTasks, setNumberOfUncompletedTasks] = useState(0);
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [barGraphData, setBarGraphData] = useState<
    { date: string; completed: number }[]
  >([]);

  const router = useRouter();


  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await getNumberOfTasks();
        setNumberOfTasks(response.allTasks);
        setNumberOfCompletedTasks(response.completed);
        setNumberOfUncompletedTasks(response.incompleted);
      } catch (error) {
        console.error("Error fetching number of tasks:", error);
      }
    };

    // get available dates from getNumberOfTasksByDate
    const fetchAvailableDates = async () => {
      try {
        const response = await getNumberOfTasksByDate();
        const availableDate = Object.keys(response);
        setAvailableDates(availableDate);
        console.log(availableDate);
      } catch (error) {
        console.error("Error fetching available dates:", error);
      }
    };

    const fetchBarGraphData = async () => {
      try {
        const response = await getNumberOfTasksByDate();
        const data = Object.keys(response).map((date) => ({
          date,
          completed: response[date].completed,
        }));
        setBarGraphData(data);
      } catch (error) {
        console.error("Error fetching bar graph data:", error);
      }
    };
    fetchData();
    fetchAvailableDates();
    fetchBarGraphData();
  }, []);

  const handleDateChange = async (date: Date | null) => {
    if (date) {
      const formattedDate = date.toDateString();
      console.log(formattedDate, "formatted date");
      
      setSelectedDate(formattedDate);
      try {
        const response = await getNumberOfTasksByDate();
        const numberOfTasks = response[formattedDate];
        setNumberOfTasks(numberOfTasks.completed + numberOfTasks.incompleted);
        setNumberOfCompletedTasks(numberOfTasks.completed);
        setNumberOfUncompletedTasks(numberOfTasks.incompleted);
      } catch (error) {
        console.error("Error fetching number of tasks:", error);
      }
    } else {
      setSelectedDate(null);
    }
  };

  console.log(selectedDate, "selected date");
  

  return (
    <>
    <div className="container mx-auto m-4 ">
      <div className="flex justify-around border-b-4 border-gray-500  pb-4 mb-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Analytics</h1>
      </div>
      <div className="flex justify-around  flex-col shadow-xl bg-[#fdffb6]">
        <div className="flex items-center space-x-4 m-4 w-fit border-2 p-2 shadow-lg bg-white">
          <label>Select Date:</label>
          <DatePicker
            selected={selectedDate ? new Date(selectedDate) : null}
            onChange={(date) => handleDateChange(date)}
            dateFormat="dd/MM/yyyy"
            filterDate={(date) => availableDates.includes(date.toDateString())}
            
          />
        </div>
        <PieChartComp
          numberOfTasks={numberOfTasks}
          numberOfCompletedTasks={numberOfCompletedTasks}
          numberOfUncompletedTasks={numberOfUncompletedTasks}
        />

        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4 ml-4 text-gray-700">
            Completed Tasks Per Date
          </h2>
          <BarGraphComp data={barGraphData} />
        </div>
      </div>
    </div>
    <LineChartComp />
    <TasksWithDateFilter />
    </>
  );
};


export default withAuth(AnalyticsPage);
