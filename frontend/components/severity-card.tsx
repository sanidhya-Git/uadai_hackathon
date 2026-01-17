"use client"

interface SeverityCardProps {
  severity: "Critical" | "High" | "Medium" | "Low"
  count: number
  trend: number
  icon: string
}

export function SeverityCard({ severity, count, trend, icon }: SeverityCardProps) {
  const colors = {
    Critical: { bg: "from-red-500/20 to-red-600/10 border-red-200/50", text: "text-red-700" },
    High: { bg: "from-orange-500/20 to-orange-600/10 border-orange-200/50", text: "text-orange-700" },
    Medium: { bg: "from-yellow-500/20 to-yellow-600/10 border-yellow-200/50", text: "text-yellow-700" },
    Low: { bg: "from-blue-500/20 to-blue-600/10 border-blue-200/50", text: "text-blue-700" },
  }

  const config = colors[severity]

  return (
    <div className={`glass-card rounded-xl p-6 bg-gradient-to-br ${config.bg}`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className={`text-sm font-semibold ${config.text}`}>{severity} Severity</p>
          <h3 className="text-3xl font-bold text-foreground mt-1">{count}</h3>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
      <div className="text-xs text-muted-foreground">
        {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% since last check
      </div>
    </div>
  )
}
