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

// ================= OVERVIEW =================

export async function getOverviewMetrics(): Promise<OverviewMetrics> {
  const res = await fetch(`${API_BASE_URL}/overview/`)
  if (!res.ok) throw new Error("Failed to fetch overview metrics")
  return res.json()
}

// ================= STATE (AGE FILTER ENABLED) =================

export async function getStateInsights(age: "all" | "0-5" | "5-17" | "18+" = "all"): Promise<StateInsight[]> {
  const res = await fetch(`${API_BASE_URL}/state/insights?age=${age}`)
  if (!res.ok) throw new Error("Failed to fetch state insights")
  return res.json()
}

// ================= DISTRICT (AGE FILTER ENABLED) =================

export async function getDistrictInsights(
  stateName: string,
  age: "all" | "0-5" | "5-17" | "18+" = "all"
): Promise<DistrictInsight[]> {
  const res = await fetch(`${API_BASE_URL}/district/${encodeURIComponent(stateName)}?age=${age}`)
  if (!res.ok) throw new Error(`Failed to fetch district insights for ${stateName}`)
  return res.json()
}

// ================= ANOMALIES =================

export async function getAnomalyAlerts(): Promise<Anomaly[]> {
  const res = await fetch(`${API_BASE_URL}/anomaly/alerts`)
  if (!res.ok) throw new Error("Failed to fetch anomaly alerts")
  return res.json()
}

// ================= FORECAST =================

export async function getForecastComparison(): Promise<ForecastComparison> {
  const res = await fetch(`${API_BASE_URL}/forecast/compare`)
  if (!res.ok) throw new Error("Failed to fetch forecast comparison")
  return res.json()
}
