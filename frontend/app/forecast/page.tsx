"use client";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";

export default function ForecastPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/backend?path=forecast/compare")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Forecast Comparison</h2>

        <div style={{ display: "flex", gap: 30 }}>
          <div>
            <h3>ARIMA Model</h3>
            <h1>{data.arima_prediction}</h1>
          </div>

          <div>
            <h3>Prophet Model</h3>
            <h1>{data.prophet_prediction}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
