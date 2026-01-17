"use client"

import { useState } from "react"

interface SearchFilterProps {
  onSearch: (query: string) => void
}

export function SearchFilter({ onSearch }: SearchFilterProps) {
  const [query, setQuery] = useState("")

  const handleSearch = (value: string) => {
    setQuery(value)
    onSearch(value)
  }

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center gap-2">
        <span className="text-xl">🔍</span>
        <input
          type="text"
          placeholder="Search states, districts, or regions..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="flex-1 bg-white/50 border border-white/20 rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>
    </div>
  )
}
