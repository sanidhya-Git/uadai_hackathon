import axios from "axios";

const api = axios.create({
  baseURL: "/api/backend",
});

export const fetchOverview = () =>
  api.get("?path=overview");

export const fetchStateInsights = () =>
  api.get("?path=state/insights");

export const fetchAnomalies = () =>
  api.get("?path=anomaly/alerts");

export const fetchForecast = () =>
  api.get("?path=forecast/next-cycle");
export const fetchDistrictInsights = (state: string) =>
  api.get(`?path=district/${state}`);


