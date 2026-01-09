"use client";
import { useEffect, useState } from "react";
import { fetchOverview, fetchStateInsights } from "../services/api";
import KPICard from "../components/KPICard";
import Navbar from "../components/Navbar";
import IndiaHeatMap from "../components/IndiaHeatMap";

import TrendChart from "../components/LineChart";
import Heatmap from "../components/Heatmap";

export default function HomePage() {
  const [overview, setOverview] = useState<any>(null);
  const [states, setStates] = useState<any[]>([]);

  useEffect(() => {
    fetchOverview().then(res => setOverview(res.data));
    fetchStateInsights().then(res => setStates(res.data));
  }, []);

  if (!overview) return <p>Loading...</p>;

  const trendData = states.map((s) => ({
    name: s.state,
    value: s.total_enrolments
  }));

  return (
    <>
      <Navbar />

      {/* KPI SECTION */}
      <div style={{ padding: 20, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        <KPICard title="Total States" value={overview.total_states} />
        <KPICard title="Total Enrolments" value={overview.total_enrolments} />
        <KPICard title="Total Updates" value={overview.total_updates} />
        <KPICard title="Volatility Score" value={overview.volatility_score.toFixed(2)} />
      </div>
      <div style={{ padding: 20 }}>
  <h3>India Aadhaar Enrolment Heatmap</h3>
  <IndiaHeatMap data={states} />
</div>

      {/* NATIONAL TREND */}
      <div style={{ padding: 20 }}>
        <h3>National Enrolment Distribution</h3>
        <TrendChart data={trendData} />
      </div>

      {/* HEATMAP */}
      <div style={{ padding: 20 }}>
        <h3>State-wise Enrolment Intensity</h3>
        <Heatmap data={states} />
      </div>
    </>
  );
}
