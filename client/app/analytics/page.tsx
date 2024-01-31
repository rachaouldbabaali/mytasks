"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from 'react-datepicker';
import { isAuthenticated, getNumberOfTasks, getNumberOfTasksByDate } from "../api/api";
import PieChartComp from "../components/PieChartComp";
import 'react-datepicker/dist/react-datepicker.css';

const AnalyticsPage: React.FC = () => {
  const [numberOfTasks, setNumberOfTasks] = useState(0);
  const [numberOfCompletedTasks, setNumberOfCompletedTasks] = useState(0);
  const [numberOfUncompletedTasks, setNumberOfUncompletedTasks] = useState(0);
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchNumberOfTasks = async () => {
      try {
        const response = await getNumberOfTasks();
        console.log(response);

        setNumberOfTasks(response.allTasks);
        setNumberOfCompletedTasks(response.completed);
        setNumberOfUncompletedTasks(response.incompleted);
      } catch (error) {
        console.error("Error fetching number of tasks:", error);
      }
    };

    const checkIfAuthenticated = async () => {
      try {
        const response = await isAuthenticated();
        setIsAuthenticatedUser(true);
      } catch (error) {
        router.push("/login");
        console.error("Error checking if authenticated:", error);
      }
    };

    fetchNumberOfTasks();
    checkIfAuthenticated();
  }, []);

  return (
    <div className="container mx-auto mt-4 ">
      <div className="flex justify-around border-b-4 border-gray-500  pb-4 mb-4">
        <h1 className="text-3xl font-bold mb-6 text-gray-700">Analytics</h1>
      </div>
      <div className="flex justify-around  flex-col shadow-xl bg-[#fdffb6]">
        <PieChartComp
          numberOfTasks={numberOfTasks}
          numberOfCompletedTasks={numberOfCompletedTasks}
          numberOfUncompletedTasks={numberOfUncompletedTasks}
        />
      </div>
    </div>
  );
};

export default AnalyticsPage;