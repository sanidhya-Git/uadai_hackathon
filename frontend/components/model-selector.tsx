"use client"

import { useState } from "react"

interface ModelSelectorProps {
  onModelChange: (model: string) => void
}

export function ModelSelector({ onModelChange }: ModelSelectorProps) {
  const [selectedModel, setSelectedModel] = useState("prophet")

  const models = [
    { id: "arima", name: "ARIMA", accuracy: "92.3%", description: "Statistical time-series model" },
    { id: "prophet", name: "Prophet", accuracy: "94.7%", description: "Facebook's forecasting model" },
    { id: "lstm", name: "LSTM", accuracy: "96.2%", description: "Deep learning neural network" },
  ]

  const handleSelect = (modelId: string) => {
    setSelectedModel(modelId)
    onModelChange(modelId)
  }

  return (
    <div className="glass-card rounded-xl p-6 mb-8">
      <h3 className="text-lg font-semibold text-foreground mb-4">Multi-Model AI Forecasting</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {models.map((model) => (
          <div
            key={model.id}
            onClick={() => handleSelect(model.id)}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedModel === model.id
                ? "bg-gradient-to-br from-blue-500/30 to-indigo-500/20 border-2 border-primary shadow-lg"
                : "bg-white/40 border border-white/20 hover:bg-white/60"
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-bold text-foreground">{model.name}</h4>
              <span className="text-xs font-semibold px-2 py-1 rounded bg-green-500/20 text-green-700">
                {model.accuracy}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{model.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
