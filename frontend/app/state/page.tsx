"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import IndiaHeatMap from "../../components/IndiaHeatMap";
import DistrictHeatMap from "../../components/DistrictHeatMap";
import MapLegend from "../../components/MapLegend";
import { motion } from "framer-motion";
import {
  fetchStateInsights,
  fetchDistrictInsights
} from "../../services/api";

type AgeKey = "age_0_5" | "age_5_17" | "age_18_greater";

export default function StatePage() {
  const [states, setStates] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [ageKey, setAgeKey] = useState<AgeKey>("age_18_greater");
  const [loading, setLoading] = useState(false);

  // Load state-level data
  useEffect(() => {
    fetchStateInsights().then(res => setStates(res.data));
  }, []);

  // Handle state click → district drill-down
  const handleStateClick = async (state: string) => {
    setLoading(true);
    setSelectedState(state);

    try {
      const res = await fetchDistrictInsights(state);
      setDistricts(res.data);
    } catch (err) {
      console.error("Failed to load districts", err);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: 20 }}>
        <h2>State → District Aadhaar Drill-Down</h2>
        <p style={{ color: "#666" }}>
          Click on a state to explore district-level Aadhaar enrolments
        </p>

        {/* INDIA STATE MAP */}
        <IndiaHeatMap
          data={states}
          onStateClick={handleStateClick}
        />

        <MapLegend />

        {/* DISTRICT SECTION */}
        {selectedState && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginTop: 40 }}
          >
            <h3>
              District-level Enrolments —{" "}
              <span style={{ color: "#ff5722" }}>
                {selectedState.toUpperCase()}
              </span>
            </h3>

            {/* AGE TOGGLE */}
            <div style={{ margin: "15px 0", display: "flex", gap: 10 }}>
              <button onClick={() => setAgeKey("age_0_5")}>
                Age 0-5
              </button>
              <button onClick={() => setAgeKey("age_5_17")}>
                Age 5-17
              </button>
              <button onClick={() => setAgeKey("age_18_greater")}>
                Age 18+
              </button>
            </div>

            {loading ? (
              <p>Loading district data...</p>
            ) : (
              <DistrictHeatMap
                data={districts}
                ageKey={ageKey}
              />
            )}
          </motion.div>
        )}
      </div>
    </>
  );
}

