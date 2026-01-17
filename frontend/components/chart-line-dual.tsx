"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface ChartLineDualProps {
  data: Array<{ name: string; historical: number; predicted: number }>
  title: string
}

export function ChartLineDual({ data, title }: ChartLineDualProps) {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="historical"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6" }}
            name="Historical Data"
          />
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#a855f7"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: "#a855f7" }}
            name="Predicted Data"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
