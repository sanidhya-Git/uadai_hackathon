"use client"

import { useState, useEffect } from "react"
import { Navbar } from "../../components/navbar"
import { SeverityCard } from "../../components/severity-card"
import { ChartScatter } from "../../components/chart-scatter"
import { ChartTimeline } from "../../components/chart-timeline"
import { AnomalyCard } from "../../components/anomaly-card"
import { getAnomalyAlerts } from "../../lib/api-client"

interface ProcessedAnomaly {
  severity: "Critical" | "High" | "Medium" | "Low"
  type: string
  detectionTime: string
  impact: number
  description: string
}

export default function AnomaliesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [anomalies, setAnomalies] = useState<ProcessedAnomaly[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnomalies = async () => {
      try {
        setLoading(true)
        const data = await getAnomalyAlerts()
        console.log("[v0] Fetched anomalies:", data)

        const processedAnomalies: ProcessedAnomaly[] = data.map((anomaly, idx) => {
          const enrolments = anomaly.total_enrolments || 0
          const impact = Math.min(100, Math.abs(enrolments) % 100 || 50)
          const severities: Array<"Critical" | "High" | "Medium" | "Low"> = ["Critical", "High", "Medium", "Low"]
          const severity = severities[idx % 4]

          return {
            severity,
            type: ["Data Spike", "Pattern Deviation", "Temporal Anomaly", "Threshold Breach"][idx % 4],
            detectionTime: `${idx + 1} minutes ago`,
            impact,
            description: `Anomaly detected in ${anomaly.state || "system"}: ${anomaly.district || "regional"} region with ${Math.round(enrolments)} enrolments`,
          }
        })

        setAnomalies(processedAnomalies)
      } catch (err) {
        console.error("[v0] Error fetching anomalies:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch anomalies")
      } finally {
        setLoading(false)
      }
    }

    fetchAnomalies()
  }, [])

  // Calculate severity counts
  const severityCounts = {
    Critical: anomalies.filter((a) => a.severity === "Critical").length,
    High: anomalies.filter((a) => a.severity === "High").length,
    Medium: anomalies.filter((a) => a.severity === "Medium").length,
    Low: anomalies.filter((a) => a.severity === "Low").length,
  }

  const scatterData = anomalies.map((anomaly, idx) => ({
    x: anomaly.impact,
    y: Math.round(Math.random() * 100),
    name: anomaly.type,
  }))

  const timelineData = [
    { time: "00:00", anomalies: 3 },
    { time: "04:00", anomalies: 5 },
    { time: "08:00", anomalies: 12 },
    { time: "12:00", anomalies: 8 },
    { time: "16:00", anomalies: 15 },
    { time: "20:00", anomalies: 9 },
    { time: "24:00", anomalies: anomalies.length },
  ]

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
        <div className="glass-card rounded-2xl p-8 mb-8 bg-gradient-to-br from-red-500/20 via-orange-500/10 to-yellow-600/10 border-orange-200/50">
          <h1 className="text-4xl font-bold text-foreground mb-2">Anomaly Detection Center</h1>
          <p className="text-lg text-muted-foreground">
            AI-driven risk assessment and real-time threat detection for enterprise data integrity
          </p>
        </div>

        {/* Severity Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <SeverityCard severity="Critical" count={severityCounts.Critical} trend={2} icon="🔴" />
          <SeverityCard severity="High" count={severityCounts.High} trend={-1} icon="🟠" />
          <SeverityCard severity="Medium" count={severityCounts.Medium} trend={5} icon="🟡" />
          <SeverityCard severity="Low" count={severityCounts.Low} trend={-3} icon="🔵" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {loading ? (
            <>
              <div className="glass-card rounded-xl p-6 h-96 bg-white/30 animate-pulse" />
              <div className="glass-card rounded-xl p-6 h-96 bg-white/30 animate-pulse" />
            </>
          ) : (
            <>
              <ChartScatter
                data={scatterData}
                title="Anomaly Score vs Impact Score"
                xLabel="Anomaly Score"
                yLabel="Impact Score"
              />
              <ChartTimeline data={timelineData} title="Anomaly Trends (Last 24 Hours)" />
            </>
          )}
        </div>

        {/* View Mode Toggle */}
        <div className="glass-card rounded-xl p-4 mb-8 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Detected Anomalies</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-white/50 text-muted-foreground hover:bg-white/70"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-white/50 text-muted-foreground hover:bg-white/70"
              }`}
            >
              List View
            </button>
          </div>
        </div>

        {/* Anomalies Grid/List */}
        <div
          className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-3"}`}
        >
          {anomalies.map((anomaly, idx) => (
            <AnomalyCard key={idx} {...anomaly} />
          ))}
        </div>
      </div>
    </main>
  )
}
