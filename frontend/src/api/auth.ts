import api from "./axios";

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await api.post("/login", {
    email,
    password,
  });

  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  dailyStudyHours: number
) => {
  const response = await api.post("/register", {
    name,
    email,
    password,
    daily_study_hours: dailyStudyHours,
  });

  return response.data;
};