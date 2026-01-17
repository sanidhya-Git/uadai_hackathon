"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ChartScatterProps {
  data: Array<{ x: number; y: number; name: string }>
  title: string
  xLabel: string
  yLabel: string
}

export function ChartScatter({ data, title, xLabel, yLabel }: ChartScatterProps) {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            dataKey="x"
            stroke="#6b7280"
            label={{ value: xLabel, position: "insideBottomRight", offset: -10 }}
          />
          <YAxis
            type="number"
            dataKey="y"
            stroke="#6b7280"
            label={{ value: yLabel, angle: -90, position: "insideLeft" }}
          />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Scatter name="Anomalies" data={data} fill="#ef4444" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
