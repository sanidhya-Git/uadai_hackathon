"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ChartTimelineProps {
  data: Array<{ time: string; anomalies: number }>
  title: string
}

export function ChartTimeline({ data, title }: ChartTimelineProps) {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Line type="monotone" dataKey="anomalies" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444" }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
