"use client"

interface KPICardProps {
  label: string
  value: string
  unit?: string
  icon: string
  change: number
  trend: "up" | "down"
  color: "blue" | "indigo" | "purple" | "orange"
}

export function KPICard({ label, value, unit, icon, change, trend, color }: KPICardProps) {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/10 border-blue-200/50",
    indigo: "from-indigo-500/20 to-indigo-600/10 border-indigo-200/50",
    purple: "from-purple-500/20 to-purple-600/10 border-purple-200/50",
    orange: "from-orange-500/20 to-orange-600/10 border-orange-200/50",
  }

  return (
    <div className={`glass-card rounded-xl p-6 bg-gradient-to-br ${colorClasses[color]}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <h3 className="text-3xl font-bold text-foreground mt-1">
            {value}
            {unit && <span className="text-lg text-muted-foreground ml-1">{unit}</span>}
          </h3>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>

      <div className="flex items-center gap-2">
        <span className={`text-sm font-semibold ${trend === "up" ? "text-orange-600" : "text-green-600"}`}>
          {trend === "up" ? "↑" : "↓"} {Math.abs(change)}%
        </span>
        <span className="text-xs text-muted-foreground">vs last period</span>
      </div>
    </div>
  )
}
