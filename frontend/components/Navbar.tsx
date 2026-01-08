"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ padding: "15px", background: "#2f3640", color: "white" }}>
      <Link href="/" style={{ marginRight: 20, color: "white" }}>Overview</Link>
      <Link href="/state" style={{ marginRight: 20, color: "white" }}>State</Link>
      <Link href="/anomaly" style={{ marginRight: 20, color: "white" }}>Anomalies</Link>
      <Link href="/forecast" style={{ color: "white" }}>Forecast</Link>
    </nav>
  );
}
