"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface GradesLeaderboardChartProps {
  data: {
    name: string;
    avgGrade: number;
  }[];
}

export function GradesLeaderboardChart({ data }: GradesLeaderboardChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />

        <Tooltip />
        <Legend />
        <Bar dataKey="avgGrade" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
