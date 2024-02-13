"use client";

import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TimeLeaderboardChartProps {
  data: {
    name: string;
    hoursSpent: number;
  }[];
}

export function TimeLeaderboardChart({ data }: TimeLeaderboardChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />

        <Tooltip />
        <Legend />
        <Bar
          dataKey="hoursSpent"
          name="Verbrachte Zeit (in Std.)"
          fill="#8884d8"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
