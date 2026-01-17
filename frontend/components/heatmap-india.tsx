"use client"

export function HeatmapIndia() {
  // Simplified India state heatmap visualization
  const states = [
    { name: "Maharashtra", enrolment: 95, color: "bg-red-500" },
    { name: "Uttar Pradesh", enrolment: 92, color: "bg-red-400" },
    { name: "Karnataka", enrolment: 87, color: "bg-orange-400" },
    { name: "Tamil Nadu", enrolment: 85, color: "bg-orange-400" },
    { name: "Andhra Pradesh", enrolment: 78, color: "bg-yellow-400" },
    { name: "Gujarat", enrolment: 75, color: "bg-yellow-400" },
    { name: "Rajasthan", enrolment: 68, color: "bg-yellow-300" },
    { name: "Madhya Pradesh", enrolment: 65, color: "bg-yellow-300" },
  ]

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Enrolment Density by State</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {states.map((state) => (
          <div
            key={state.name}
            className={`${state.color} rounded-lg p-3 text-white text-sm font-medium text-center cursor-pointer hover:scale-105 transition-transform duration-200`}
          >
            <div className="font-bold">{state.name}</div>
            <div className="text-xs opacity-90">{state.enrolment}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}
