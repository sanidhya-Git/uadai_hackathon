"use client";
import { useEffect, useState } from "react";
import { fetchStateInsights } from "../../services/api";
import Navbar from "../../components/Navbar";

export default function StatePage() {
  const [states, setStates] = useState<any[]>([]);

  useEffect(() => {
    fetchStateInsights().then(res => setStates(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ padding: 20 }}>
        <h2>State-wise Aadhaar Enrolments</h2>
        <table>
          <thead>
            <tr>
              <th>State</th>
              <th>Total Enrolments</th>
            </tr>
          </thead>
          <tbody>
            {states.map((s, i) => (
              <tr key={i}>
                <td>{s.state}</td>
                <td>{s.total_enrolments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
