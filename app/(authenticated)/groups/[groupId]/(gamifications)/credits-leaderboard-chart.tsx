"use client";

import { Card } from "@/components/ui/card";
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

interface CreditsLeaderboardChartProps {
  data: {
    name: string;
    credits: number;
  }[];
}

export function CreditsLeaderboardChart({
  data,
}: CreditsLeaderboardChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />

        <Tooltip />
        <Legend />
        <Bar dataKey="credits" name="Gesammelte Credits" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
