"use client"

import { useEffect, useState } from "react"
import { Navbar } from "../components/navbar"
import { KPICard } from "../components/kpi-card"
import { ChartArea } from "../components/chart-area"
import { ChartPie } from "../components/chart-pie"
import { ChartRadar } from "../components/chart-radar"
import { HeatmapIndia } from "../components/heatmap-india"
import { getOverviewMetrics, getStateInsights } from "../lib/api-client"

interface EnrolmentTrendData {
  name: string
  value: number
}

interface AgeDistributionData {
  name: string
  value: number
}

export default function Home() {
  const [metrics, setMetrics] = useState({
    total_states: 0,
    total_enrolments: 0,
    total_updates: 0,
    volatility_score: 0,
    stability_index: 0,
  })
  const [stateData, setStateData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [metricsData, statesData] = await Promise.all([getOverviewMetrics(), getStateInsights()])
        setMetrics(metricsData)
        setStateData(statesData)
      } catch (err) {
        console.error("[v0] Error fetching overview data:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Transform state data for charts
  const enrolmentTrendData: EnrolmentTrendData[] = stateData.slice(0, 7).map((state, idx) => ({
    name: `W${idx + 1}`,
    value: Math.round(state.total_enrolments / 1000000),
  }))

  const ageDistributionData: AgeDistributionData[] = [
    { name: "0-5 years", value: 15 },
    { name: "5-17 years", value: 22 },
    { name: "18+ years", value: 63 },
  ]

  const systemPerformanceData = [
    { name: "Uptime", value: 99.2 },
    { name: "Response Time", value: 95 },
    { name: "Data Accuracy", value: 98.5 },
    { name: "Security Score", value: 97 },
    { name: "Availability", value: 99.8 },
    { name: "Throughput", value: 94 },
  ]

  if (error) {
    return (
      <main>
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="glass-card rounded-2xl p-8 border-red-200/50 bg-red-500/10">
            <p className="text-red-600">Error: {error}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Make sure the backend is running at {process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="glass-card rounded-2xl p-12 mb-8 bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-purple-600/10 border-purple-200/50">
          <h1 className="text-4xl font-bold text-foreground mb-2">AI-Powered Intelligence Platform for Aadhaar Data</h1>
          <p className="text-lg text-muted-foreground">
            Enterprise-grade analytics for national-scale insights and predictive intelligence
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KPICard
            label="Total States"
            value={metrics.total_states.toString()}
            icon="🗺️"
            change={2}
            trend="up"
            color="blue"
          />
          <KPICard
            label="Total Enrolments"
            value={(metrics.total_enrolments / 1000000000).toFixed(2)}
            unit="B"
            icon="👥"
            change={5.2}
            trend="up"
            color="indigo"
          />
          <KPICard
            label="Total Updates"
            value={metrics.total_updates.toString()}
            icon="🔄"
            change={12}
            trend="up"
            color="purple"
          />
          <KPICard
            label="Volatility Score"
            value={metrics.volatility_score.toFixed(2)}
            icon="📊"
            change={8}
            trend="down"
            color="orange"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartArea data={loading ? [] : enrolmentTrendData} title="Enrolment Trends" />
          <ChartPie data={ageDistributionData} title="Age Distribution" colors={["#3b82f6", "#6366f1", "#a855f7"]} />
        </div>

        {/* Radar Chart */}
        <div className="mb-8">
          <ChartRadar data={systemPerformanceData} title="System Performance Metrics" />
        </div>

        {/* Heatmap */}
        <div className="mb-8">
          <HeatmapIndia />
        </div>
      </div>
    </main>
  )
}
