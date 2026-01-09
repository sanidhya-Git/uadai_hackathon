"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import TrendChart from "../../components/LineChart";

export default function ForecastPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/backend?path=forecast/compare")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  const chartData = [
    { name: "ARIMA", value: data.arima_prediction },
    { name: "Prophet", value: data.prophet_prediction }
  ];

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Forecast Comparison</h2>
        <TrendChart data={chartData} />
      </div>
    </>
  );
}

