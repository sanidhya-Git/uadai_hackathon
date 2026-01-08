"use client";
import { useEffect, useState } from "react";
import { fetchOverview } from "../services/api";
import KPICard from "../components/KPICard";
import Navbar from "../components/Navbar";

export default function HomePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchOverview().then(res => setData(res.data));
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div style={{ padding: 20, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        <KPICard title="Total States" value={data.total_states} />
        <KPICard title="Total Enrolments" value={data.total_enrolments} />
        <KPICard title="Total Updates" value={data.total_updates} />
        <KPICard title="Volatility Score" value={data.volatility_score.toFixed(2)} />
      </div>
    </>
  );
}
