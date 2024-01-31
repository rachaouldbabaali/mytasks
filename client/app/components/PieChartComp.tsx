// components/PieChart.tsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface PieChartCompProps {
  numberOfTasks: number;
  numberOfCompletedTasks: number;
  numberOfUncompletedTasks: number;
}

const PieChartComp: React.FC<PieChartCompProps> = ({
  numberOfTasks,
  numberOfCompletedTasks,
  numberOfUncompletedTasks,
}) => {
  const data = [
    { name: "Completed", value: numberOfCompletedTasks },
    { name: "Uncompleted", value: numberOfUncompletedTasks },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div>
      <h2 className="text-xl font-bold p-4 text-gray-700">Tasks Overview</h2>
      <div className="flex flex-wrap items-center ">
        <ResponsiveContainer width="60%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="flex flex-col ">
          <p className="text-gray-700 font-bold">
            Total :{" "}
            <span className="text-gray-700 font-normal">{numberOfTasks}</span>
          </p>

          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#0088FE] mr-2"></div>
            <p className="text-gray-700 font-bold">
              Completed :{" "}
              <span className="text-gray-700 font-normal">
                {numberOfCompletedTasks}
              </span>
            </p>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#FF8042] mr-2"></div>
            <p className="text-gray-700 font-bold">
              Uncompleted :{" "}
              <span className="text-gray-700 font-normal">
                {numberOfUncompletedTasks}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartComp;
