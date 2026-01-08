export default function KPICard({ title, value }: { title: string; value: any }) {
  return (
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
    }}>
      <h4 style={{ color: "#555" }}>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}
