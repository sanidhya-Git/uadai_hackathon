"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function DistrictChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="district" hide />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total_enrolments" fill="#1e90ff" />
      </BarChart>
    </ResponsiveContainer>
  );
}