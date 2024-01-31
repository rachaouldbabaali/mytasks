import React, { useEffect, useState } from 'react';
import { getNumberOfTasksByMonth } from '../api/api';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const LineChartComp = () => {
  const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        getNumberOfTasksByMonth().then((data) => {
        setMonthlyData(data);
        });
    }, []);
  

  return (
    <div className="flex flex-col items-center bg-[#fdffb6] my-6">
      <h2 className="text-xl font-bold p-4 text-gray-700 mt-4 text-start">
        Monthly Completion Rate</h2>
      {monthlyData && Object.keys(monthlyData).length > 0 ? (
        <LineChart width={600} height={300} data={Object.entries(monthlyData)}>
          <XAxis dataKey="[0]" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="[1].completed" name="Completed" stroke="#0088FE" />
          <Line type="monotone" dataKey="[1].incompleted" name="Incompleted" stroke="#FF8042" />
        </LineChart>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default LineChartComp;
