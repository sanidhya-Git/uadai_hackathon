"use client"

interface AnomalyCardProps {
  severity: "Critical" | "High" | "Medium" | "Low"
  type: string
  detectionTime: string
  impact: number
  description: string
}

export function AnomalyCard({ severity, type, detectionTime, impact, description }: AnomalyCardProps) {
  const severityColors = {
    Critical: "border-l-4 border-l-red-600 bg-red-50/50",
    High: "border-l-4 border-l-orange-600 bg-orange-50/50",
    Medium: "border-l-4 border-l-yellow-600 bg-yellow-50/50",
    Low: "border-l-4 border-l-blue-600 bg-blue-50/50",
  }

  const severityBadge = {
    Critical: "bg-red-500 text-white",
    High: "bg-orange-500 text-white",
    Medium: "bg-yellow-500 text-white",
    Low: "bg-blue-500 text-white",
  }

  return (
    <div className={`glass-card rounded-lg p-4 ${severityColors[severity]}`}>
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold px-2 py-1 rounded ${severityBadge[severity]}`}>{severity}</span>
            <span className="text-sm font-semibold text-foreground">{type}</span>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/20">
        <div className="text-xs text-muted-foreground">{detectionTime}</div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-foreground">Impact:</span>
          <div className="w-16 h-2 bg-white/30 rounded-full overflow-hidden">
            <div
              className={`h-full ${impact > 70 ? "bg-red-500" : impact > 40 ? "bg-yellow-500" : "bg-green-500"}`}
              style={{ width: `${impact}%` }}
            ></div>
          </div>
          <span className="text-xs font-semibold text-foreground">{impact}%</span>
        </div>
      </div>
    </div>
  )
}
