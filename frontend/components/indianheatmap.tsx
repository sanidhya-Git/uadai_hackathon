"use client"

import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { useEffect, useState } from "react"

const geoUrl = "/india-states.geojson"

export function IndiaHeatMap({ age }: { age: string }) {
  const [data, setData] = useState<any[]>([])
  const [selectedState, setSelectedState] = useState<string | null>(null)

  useEffect(() => {
    fetch(`http://localhost:8000/state/insights?age=${age}`)
      .then(res => res.json())
      .then(setData)
  }, [age])

  const getValue = (name: string) =>
    data.find(d => d.state === name)?.metric || 0

  return (
    <ComposableMap projection="geoMercator" width={800} height={800}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              onClick={() => setSelectedState(geo.properties.NAME_1)}
              style={{
                default: {
                  fill: `rgba(37,99,235,${getValue(geo.properties.NAME_1)/1e8})`,
                  outline: "none"
                }
              }}
            />
          ))
        }
      </Geographies>
    </ComposableMap>
  )
}
