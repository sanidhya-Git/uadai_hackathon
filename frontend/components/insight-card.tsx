"use client"

interface InsightCardProps {
  title: string
  description: string
  metric: string
  icon: string
  color: "blue" | "indigo" | "purple" | "orange"
}

export function InsightCard({ title, description, metric, icon, color }: InsightCardProps) {
  const colorClasses = {
    blue: "from-blue-500/20 to-blue-600/10 border-blue-200/50",
    indigo: "from-indigo-500/20 to-indigo-600/10 border-indigo-200/50",
    purple: "from-purple-500/20 to-purple-600/10 border-purple-200/50",
    orange: "from-orange-500/20 to-orange-600/10 border-orange-200/50",
  }

  return (
    <div className={`glass-card rounded-lg p-4 bg-gradient-to-br ${colorClasses[color]}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="text-lg font-bold text-foreground mt-3">{metric}</div>
    </div>
  )
}
