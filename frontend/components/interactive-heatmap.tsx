"use client"

import { useEffect, useState } from "react"
import { getStateInsights, getDistrictInsights } from "../lib/api-client"

interface StateRow {
  state: string
  total_enrolments: number
}

interface DistrictRow {
  district: string
  total_enrolments: number
}

export function InteractiveHeatmap() {
  const [age, setAge] = useState<"all" | "0-5" | "5-17" | "18+">("all")
  const [states, setStates] = useState<StateRow[]>([])
  const [districts, setDistricts] = useState<DistrictRow[]>([])
  const [selectedState, setSelectedState] = useState<string | null>(null)

  useEffect(() => {
    getStateInsights(age).then(setStates)
  }, [age])

  const loadDistricts = async (state: string) => {
    setSelectedState(state)
    const data = await getDistrictInsights(state, age)
    setDistricts(data)
  }

  const getColor = (value: number) => {
    if (value > 5e7) return "bg-red-600"
    if (value > 2e7) return "bg-orange-500"
    if (value > 1e7) return "bg-yellow-500"
    return "bg-yellow-300"
  }

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">India Aadhaar Enrolment Heatmap</h3>

      {/* Age Filter */}
      <div className="flex gap-2 mb-6">
        {(["all","0-5","5-17","18+"] as const).map(a => (
          <button
            key={a}
            onClick={() => setAge(a)}
            className={`px-4 py-2 rounded-lg text-sm ${
              age===a ? "bg-primary text-white" : "bg-white/50"
            }`}
          >
            {a==="all"?"All Ages":a+" yrs"}
          </button>
        ))}
      </div>

      {/* State Heatmap */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {states.map(s => (
          <div
            key={s.state}
            onClick={() => loadDistricts(s.state)}
            className={`${getColor(s.total_enrolments)} p-4 rounded-lg text-white cursor-pointer hover:scale-105 transition`}
          >
            <div className="font-bold text-sm">{s.state}</div>
            <div className="text-xs">{(s.total_enrolments/1e6).toFixed(1)} M</div>
          </div>
        ))}
      </div>

      {/* District Drilldown */}
      {selectedState && (
        <div className="mt-6 border-t pt-4">
          <h4 className="font-semibold mb-3">{selectedState} – District Breakdown</h4>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
            {districts.map(d => (
              <div key={d.district} className="bg-white/40 p-2 rounded text-xs">
                {d.district} – {(d.total_enrolments/1e6).toFixed(1)}M
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
