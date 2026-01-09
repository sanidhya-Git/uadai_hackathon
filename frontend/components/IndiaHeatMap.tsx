"use client";

import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { scaleQuantize } from "d3-scale";

type IndiaHeatMapProps = {
  data: {
    state: string;
    total_enrolments: number;
  }[];
  onStateClick?: (state: string) => void;
};

const geoUrl = "/maps/india-states.json";

/**
 * Adjust max range if your enrolments grow
 */
const colorScale = scaleQuantize<string>()
  .domain([0, 10000000])
  .range([
    "#edf8fb",
    "#b3cde3",
    "#8c96c6",
    "#8856a7",
    "#810f7c"
  ]);

export default function IndiaHeatMap({
  data,
  onStateClick
}: IndiaHeatMapProps) {

  /**
   * Create quick lookup for state enrolments
   */
  const stateValueMap = new Map<string, number>(
    data.map(d => [d.state.toLowerCase(), d.total_enrolments])
  );

  return (
    <div style={{ width: "100%", maxWidth: 900, margin: "0 auto" }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 1100, center: [78, 22] }}
        width={800}
        height={900}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const stateName =
                geo.properties?.NAME_1 ||
                geo.properties?.name ||
                "";

              const key = stateName.toLowerCase();
              const value = stateValueMap.get(key) ?? 0;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(value)}
                  stroke="#ffffff"
                  onClick={() => {
                    if (onStateClick && stateName) {
                      onStateClick(stateName);
                    }
                  }}
                  style={{
                    default: {
                      outline: "none",
                      cursor: onStateClick ? "pointer" : "default"
                    },
                    hover: {
                      fill: "#ff7043",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#d84315",
                      outline: "none"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

