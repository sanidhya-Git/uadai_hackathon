import "./globals.css";

export const metadata = {
  title: "Aadhaar InsightX",
  description: "AI-driven Aadhaar Intelligence Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

