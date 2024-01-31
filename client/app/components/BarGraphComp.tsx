import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarGraphProps {
  data: { date: string; completed: number; incompleted: number }[];
}

const BarGraphComp: React.FC<BarGraphProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="70%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        barGap={10}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" fill="#0088FE" name="Completed" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraphComp;
