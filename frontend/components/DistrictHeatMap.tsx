"use client";

import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { scaleQuantize } from "d3-scale";

const geoUrl = "/maps/india-districts.json";

const colorScale = scaleQuantize<string>()
  .domain([0, 2000000])
  .range([
    "#edf8fb",
    "#b2e2e2",
    "#66c2a4",
    "#2ca25f",
    "#006d2c"
  ]);

export default function DistrictHeatMap({
  data,
  ageKey
}: {
  data: any[];
  ageKey: "age_0_5" | "age_5_17" | "age_18_greater";
}) {

  const valueMap = new Map(
    data.map(d => [d.district.toLowerCase(), d[ageKey]])
  );

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ scale: 2500, center: [78, 22] }}
      width={800}
      height={900}
    >
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map(geo => {
            const name = geo.properties?.DISTRICT?.toLowerCase() || "";
            const value = valueMap.get(name) ?? 0;

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={colorScale(value)}
                stroke="#fff"
                style={{
                  default: { outline: "none" },
                  hover: { fill: "#ff7043" }
                }}
              />
            );
          })
        }
      </Geographies>
    </ComposableMap>
  );
}
