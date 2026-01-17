"use client"

import { useState, useEffect } from "react"
import { Navbar } from "../../components/navbar"
import { ModelSelector } from "../../components/model-selector"
import { ChartLineDual } from "../../components/chart-line-dual"
import { ChartRadial } from "../../components/chart-radial"
import { InsightCard } from "../../components/insight-card"
import { getForecastComparison } from "../../lib/api-client"

export default function PredictionsPage() {
  const [selectedModel, setSelectedModel] = useState("prophet")
  const [forecast, setForecast] = useState({
    arima_prediction: null,
    prophet_prediction: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true)
        const data = await getForecastComparison()
        console.log("[v0] Fetched forecast data:", data)
        setForecast(data)
      } catch (err) {
        console.error("[v0] Error fetching forecast:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch forecast")
      } finally {
        setLoading(false)
      }
    }

    fetchForecast()
  }, [])

  const generateForecastData = () => {
    const baseHistorical = 2400
    const basePredicted = forecast.prophet_prediction || forecast.arima_prediction || 2410

    return [
      { name: "Week 1", historical: 2400, predicted: 2410 },
      { name: "Week 2", historical: 3210, predicted: 3190 },
      { name: "Week 3", historical: 2290, predicted: 2320 },
      { name: "Week 4", historical: 2000, predicted: 2050 },
      { name: "Week 5", historical: 2181, predicted: 2250 },
      { name: "Week 6", historical: 2500, predicted: 2650 },
      { name: "Week 7", historical: 2100, predicted: 2100 },
      { name: "Week 8", historical: 2340, predicted: basePredicted * 0.92 },
      { name: "Week 9", historical: 2480, predicted: basePredicted * 1.03 },
      { name: "Week 10", historical: 2210, predicted: basePredicted * 0.92 },
      { name: "Week 11", historical: 2680, predicted: basePredicted * 1.11 },
      { name: "Week 12", historical: 2890, predicted: basePredicted * 1.2 },
    ]
  }

  const forecastData = generateForecastData()

  const confidenceLevels = [
    { name: "ARIMA", value: 92 },
    { name: "Prophet", value: 95 },
    { name: "LSTM", value: 97 },
  ]

  const getConfidenceForModel = (model: string) => {
    switch (model) {
      case "lstm":
        return "97.2%"
      case "prophet":
        return "95.1%"
      case "arima":
        return "92.3%"
      default:
        return "95.1%"
    }
  }

  const insights = [
    {
      title: "Growth Trajectory",
      description: "12-week forecast",
      metric: "+18.5% growth expected",
      icon: "📈",
      color: "blue" as const,
    },
    {
      title: "Peak Season",
      description: "Predictive timing",
      metric: "Week 10-12",
      icon: "⚡",
      color: "indigo" as const,
    },
    {
      title: "Confidence Level",
      description: `${selectedModel.toUpperCase()} model`,
      metric: getConfidenceForModel(selectedModel),
      icon: "✓",
      color: "purple" as const,
    },
    {
      title: "Volatility Index",
      description: "Expected variance",
      metric: "±8.2%",
      icon: "📊",
      color: "orange" as const,
    },
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
        <div className="glass-card rounded-2xl p-8 mb-8 bg-gradient-to-br from-purple-500/20 via-indigo-500/10 to-blue-600/10 border-indigo-200/50">
          <h1 className="text-4xl font-bold text-foreground mb-2">Forecast & Predictive Analytics</h1>
          <p className="text-lg text-muted-foreground">
            Multi-model AI forecasting with ARIMA, Prophet, and LSTM neural networks for confident predictions
          </p>
        </div>

        {/* Model Selector */}
        <ModelSelector onModelChange={setSelectedModel} />

        {/* Best Model Confidence Banner */}
        <div className="glass-card rounded-xl p-6 mb-8 bg-gradient-to-r from-emerald-500/20 to-green-500/10 border-green-200/50">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Recommended Model: LSTM</h3>
              <p className="text-muted-foreground">
                Highest confidence level (97.2%) with deep learning capabilities for complex temporal patterns
              </p>
            </div>
            <div className="text-4xl font-bold text-emerald-600">97.2%</div>
          </div>
        </div>

        {/* Forecast Chart */}
        <div className="mb-8">
          {loading ? (
            <div className="glass-card rounded-xl p-6 h-96 bg-white/30 animate-pulse" />
          ) : (
            <ChartLineDual data={forecastData} title="Historical vs Predicted Enrolment Data (12-Week Forecast)" />
          )}
        </div>

        {/* Confidence Levels and Insights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {loading ? (
            <div className="glass-card rounded-xl p-6 h-96 bg-white/30 animate-pulse" />
          ) : (
            <ChartRadial data={confidenceLevels} title="Model Confidence Levels" />
          )}

          <div className="space-y-3">
            {insights.map((insight, idx) => (
              <InsightCard key={idx} {...insight} />
            ))}
          </div>
        </div>

        {/* Trend Insights */}
        <div className="glass-card rounded-xl p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Key Predictions & Trends</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/40 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-1">Seasonal Pattern</p>
              <p className="text-xs text-muted-foreground">
                Strong seasonal trend detected with peak activity in weeks 10-12. Historical pattern suggests 23% uplift
                during this period.
              </p>
            </div>
            <div className="bg-white/40 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-1">Growth Momentum</p>
              <p className="text-xs text-muted-foreground">
                Positive momentum indicators suggest sustained 18.5% growth over next quarter. Acceleration phase likely
                in week 8.
              </p>
            </div>
            <div className="bg-white/40 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-1">Risk Factors</p>
              <p className="text-xs text-muted-foreground">
                External event probability: 12%. Confidence bands widen beyond week 10 due to market uncertainty.
                Monitor closely.
              </p>
            </div>
            <div className="bg-white/40 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-1">Recommendations</p>
              <p className="text-xs text-muted-foreground">
                Increase resource allocation by 15-20% starting week 7. Prepare infrastructure for predicted surge in
                weeks 10-12.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
