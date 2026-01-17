"use client"

import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts"

interface ChartRadialProps {
  data: Array<{ name: string; value: number }>
  title: string
}

export function ChartRadial({ data, title }: ChartRadialProps) {
  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart data={data} innerRadius="20%">
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} />
          <RadialBar background dataKey="value" cornerRadius={8} fill="#6366f1" angleAxisId={0} />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  )
}
