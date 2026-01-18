"use client"

import { useEffect, useState } from "react"
import { Navbar } from "../../components/Navbar"
import { InteractiveHeatmap } from "../../components/interactive-heatmap"
import { ChartBar } from "../../components/chart-bar"
import { SearchFilter } from "../../components/search-filter"
import { getStateInsights, getDistrictInsights } from "../../lib/api-client"
import { UploadDataset } from "../../components/upload-panel"

interface StateData {
  name: string
  value: number
}

export default function GeographicPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [topStates, setTopStates] = useState<StateData[]>([])
  const [topDistricts, setTopDistricts] = useState<StateData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadTopStats()
  }, [])

  const loadTopStats = async () => {
    try {
      setLoading(true)
      const states = await getStateInsights("all")

      const sorted = states.sort((a,b)=>b.total_enrolments-a.total_enrolments)
      setTopStates(sorted.slice(0,5).map(s=>({
        name:s.state,
        value:Math.round(s.total_enrolments/1e6)
      })))

      if(sorted.length){
        const d = await getDistrictInsights(sorted[0].state,"all")
        setTopDistricts(d.slice(0,5).map(x=>({
          name:x.district,
          value:Math.round(x.total_enrolments/1e6)
        })))
      }
    } catch(e:any){
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <main>
        <Navbar />
        <div className="p-10 text-red-600">Error: {error}</div>
      </main>
    )
  }

  return (
    <main>
      <Navbar />
      <UploadDataset />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <SearchFilter onSearch={setSearchQuery} />

        <InteractiveHeatmap />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {loading ? (
            <>
              <div className="glass-card h-96 animate-pulse" />
              <div className="glass-card h-96 animate-pulse" />
            </>
          ) : (
            <>
              <ChartBar data={topStates} title="Top States by Enrolment" />
              <ChartBar data={topDistricts} title="Top Districts by Enrolment" />
            </>
          )}
        </div>
      </div>
    </main>
  )
}
