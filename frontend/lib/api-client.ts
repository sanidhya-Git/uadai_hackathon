// API client for communicating with FastAPI backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export interface OverviewMetrics {
  total_states: number
  total_enrolments: number
  total_updates: number
  volatility_score: number
  stability_index: number
}

export interface StateInsight {
  state: string
  total_enrolments: number
}

export interface DistrictInsight {
  district: string
  total_enrolments: number
}

export interface Anomaly {
  state?: string
  district?: string
  date?: string
  total_enrolments: number
  anomaly_flag: number
}

export interface ForecastComparison {
  arima_prediction: number | null
  prophet_prediction: number | null
}

// Overview endpoints
export async function getOverviewMetrics(): Promise<OverviewMetrics> {
  const response = await fetch(`${API_BASE_URL}/overview/`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) throw new Error("Failed to fetch overview metrics")
  return response.json()
}

// State endpoints
export async function getStateInsights(): Promise<StateInsight[]> {
  const response = await fetch(`${API_BASE_URL}/state/insights`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) throw new Error("Failed to fetch state insights")
  return response.json()
}

// District endpoints
export async function getDistrictInsights(stateName: string): Promise<DistrictInsight[]> {
  const response = await fetch(`${API_BASE_URL}/district/${encodeURIComponent(stateName)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) throw new Error(`Failed to fetch district insights for ${stateName}`)
  return response.json()
}

// Anomaly endpoints
export async function getAnomalyAlerts(): Promise<Anomaly[]> {
  const response = await fetch(`${API_BASE_URL}/anomaly/alerts`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) throw new Error("Failed to fetch anomaly alerts")
  return response.json()
}

// Forecast endpoints
export async function getForecastComparison(): Promise<ForecastComparison> {
  const response = await fetch(`${API_BASE_URL}/forecast/compare`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
  if (!response.ok) throw new Error("Failed to fetch forecast comparison")
  return response.json()
}
