"use client"

import { useState } from "react"

interface HeatmapState {
  selectedState: string | null
  ageGroup: "0-5" | "5-17" | "18+" | "all"
}

export function InteractiveHeatmap() {
  const [state, setState] = useState<HeatmapState>({
    selectedState: null,
    ageGroup: "all",
  })

  const stateData = [
    { name: "Maharashtra", density: 95, districts: 36 },
    { name: "Uttar Pradesh", density: 92, districts: 75 },
    { name: "Karnataka", density: 87, districts: 31 },
    { name: "Tamil Nadu", density: 85, districts: 38 },
    { name: "Andhra Pradesh", density: 78, districts: 26 },
    { name: "Gujarat", density: 75, districts: 33 },
    { name: "Rajasthan", density: 68, districts: 33 },
    { name: "Madhya Pradesh", density: 65, districts: 52 },
    { name: "Telangana", density: 82, districts: 33 },
    { name: "Haryana", density: 88, districts: 23 },
  ]

  const getColor = (density: number) => {
    if (density >= 90) return "bg-red-600"
    if (density >= 80) return "bg-orange-500"
    if (density >= 70) return "bg-yellow-500"
    if (density >= 60) return "bg-yellow-300"
    return "bg-yellow-100"
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Interactive State Heatmap</h3>

        {/* Age Group Toggle */}
        <div className="flex gap-2 mb-6">
          {(["all", "0-5", "5-17", "18+"] as const).map((group) => (
            <button
              key={group}
              onClick={() => setState({ ...state, ageGroup: group })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                state.ageGroup === group
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-white/50 text-muted-foreground hover:bg-white/70"
              }`}
            >
              {group === "all" ? "All Ages" : `${group} years`}
            </button>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {stateData.map((stateItem) => (
            <div
              key={stateItem.name}
              onClick={() => setState({ ...state, selectedState: stateItem.name })}
              className={`${getColor(stateItem.density)} rounded-lg p-4 text-white cursor-pointer hover:scale-105 transition-transform duration-200 ${
                state.selectedState === stateItem.name ? "ring-2 ring-white ring-offset-2" : ""
              }`}
            >
              <div className="font-bold text-sm">{stateItem.name}</div>
              <div className="text-xs opacity-90">{stateItem.density}% density</div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <span className="font-semibold text-foreground">Density:</span>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded bg-red-600"></div>
            <span>90%+</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded bg-orange-500"></div>
            <span>80-89%</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded bg-yellow-500"></div>
            <span>70-79%</span>
          </div>
          <div className="flex gap-2 items-center">
            <div className="w-4 h-4 rounded bg-yellow-300"></div>
            <span>60-69%</span>
          </div>
        </div>
      </div>

      {/* Selected State Details */}
      {state.selectedState && (
        <div className="border-t border-white/20 pt-6 mt-6">
          <h4 className="font-semibold text-foreground mb-3">{state.selectedState} - District Breakdown</h4>
          <div className="bg-white/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-2">
              Showing {stateData.find((s) => s.name === state.selectedState)?.districts} districts with age group
              filter: {state.ageGroup}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-white/50 rounded px-3 py-2 text-xs text-center font-medium">
                  District {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
