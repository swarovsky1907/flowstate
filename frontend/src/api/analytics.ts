import api from "./axios";

export const getOverview = async () => {
  const res = await api.get("/analytics/overview");
  return res.data;
};

export const getProductivity = async () => {
  const res = await api.get("/analytics/productivity");
  return res.data;
};

export const getStreak = async () => {
  const res = await api.get("/analytics/streak");
  return res.data;
};

export const getWeeklyAnalytics = async () => {
  const res = await api.get("/analytics/weekly");
  return res.data;
};