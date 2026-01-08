"use client";
import { useEffect, useState } from "react";
import { fetchAnomalies } from "../../services/api";
import Navbar from "../../components/Navbar";

export default function AnomalyPage() {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetchAnomalies().then(res => setAlerts(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>Anomalous Enrolment Patterns</h2>
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Total Enrolments</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((a, i) => (
              <tr key={i}>
                <td>{a.state}</td>
                <td>{a.total_enrolments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
