"use client"

import { useEffect, useState } from "react"
import { Navbar } from "../../components/navbar"
import { InteractiveHeatmap } from "../../components/interactive-heatmap"
import { ChartBar } from "../../components/chart-bar"
import { SearchFilter } from "../../components/search-filter"
import { getStateInsights, getDistrictInsights } from "../../lib/api-client"

interface StateData {
  name: string
  value: number
}

export default function GeographicPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [topStatesData, setTopStatesData] = useState<StateData[]>([])
  const [topDistrictsData, setTopDistrictsData] = useState<StateData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const statesData = await getStateInsights()

        // Get top 5 states
        const sortedStates = statesData.sort((a, b) => b.total_enrolments - a.total_enrolments).slice(0, 5)

        const topStates: StateData[] = sortedStates.map((state) => ({
          name: state.state,
          value: Math.round(state.total_enrolments / 1000000),
        }))

        setTopStatesData(topStates)

        // Get districts for first top state
        if (sortedStates.length > 0) {
          const districtsData = await getDistrictInsights(sortedStates[0].state)
          const topDistricts: StateData[] = districtsData
            .sort((a, b) => b.total_enrolments - a.total_enrolments)
            .slice(0, 5)
            .map((district) => ({
              name: district.district,
              value: Math.round(district.total_enrolments / 1000000),
            }))

          setTopDistrictsData(topDistricts)
        }
      } catch (err) {
        console.error("[v0] Error fetching geographic data:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (error) {
    return (
      <main>
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="glass-card rounded-2xl p-8 border-red-200/50 bg-red-500/10">
            <p className="text-red-600">Error: {error}</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="glass-card rounded-2xl p-8 mb-8 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-600/10 border-purple-200/50">
          <h1 className="text-4xl font-bold text-foreground mb-2">Geographic & District Analysis</h1>
          <p className="text-lg text-muted-foreground">
            Explore enrolment density, regional trends, and district-level insights
          </p>
        </div>

        {/* Search Filter */}
        <div className="mb-8">
          <SearchFilter onSearch={setSearchQuery} />
        </div>

        {/* Interactive Heatmap */}
        <div className="mb-8">
          <InteractiveHeatmap />
        </div>

        {/* Top States and Districts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {loading ? (
            <>
              <div className="glass-card rounded-xl p-6 h-96 bg-white/30 animate-pulse" />
              <div className="glass-card rounded-xl p-6 h-96 bg-white/30 animate-pulse" />
            </>
          ) : (
            <>
              <ChartBar data={topStatesData} title="Top States by Enrolment Volume" color="#3b82f6" />
              <ChartBar data={topDistrictsData} title="Top Districts by Activity" color="#6366f1" />
            </>
          )}
        </div>

        {/* Regional Statistics */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Regional Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/40 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Northern Region</p>
              <p className="text-2xl font-bold text-foreground">324M</p>
              <p className="text-xs text-muted-foreground mt-1">enrolments</p>
            </div>
            <div className="bg-white/40 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Southern Region</p>
              <p className="text-2xl font-bold text-foreground">289M</p>
              <p className="text-xs text-muted-foreground mt-1">enrolments</p>
            </div>
            <div className="bg-white/40 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Eastern Region</p>
              <p className="text-2xl font-bold text-foreground">256M</p>
              <p className="text-xs text-muted-foreground mt-1">enrolments</p>
            </div>
            <div className="bg-white/40 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Western Region</p>
              <p className="text-2xl font-bold text-foreground">412M</p>
              <p className="text-xs text-muted-foreground mt-1">enrolments</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
