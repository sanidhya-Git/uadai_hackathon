"use client";

export default function MapLegend() {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        alignItems: "center",
        marginTop: 12,
        fontSize: 13
      }}
    >
      <span style={{ fontWeight: 600 }}>Enrolment Density:</span>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span
          style={{
            width: 18,
            height: 10,
            backgroundColor: "#edf8fb",
            display: "inline-block"
          }}
        />
        Low
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span
          style={{
            width: 18,
            height: 10,
            backgroundColor: "#66c2a4",
            display: "inline-block"
          }}
        />
        Medium
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <span
          style={{
            width: 18,
            height: 10,
            backgroundColor: "#006d2c",
            display: "inline-block"
          }}
        />
        High
      </div>
    </div>
  );
}

