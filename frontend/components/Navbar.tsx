"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  const tabs = [
    { label: "Overview", href: "/" },
    { label: "Geographic", href: "/geographic" },
    { label: "Anomalies", href: "/anomalies" },
    { label: "Predictions", href: "/predictions" },
  ]

  return (
    <nav className="glass-nav sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            ◆
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">Aadhaar InsightX</h1>
            <p className="text-xs text-muted-foreground">AI Intelligence Platform</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-white/80 text-primary shadow-md"
                    : "text-muted-foreground hover:bg-white/40 hover:text-foreground"
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </div>

        {/* Settings Icon */}
        <button className="p-2 hover:bg-white/40 rounded-lg transition-colors duration-200 text-muted-foreground hover:text-foreground">
          ⚙️
        </button>
      </div>
    </nav>
  )
}
