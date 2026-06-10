import api from "./axios";

export interface TodaySession {
  session_id: number;
  task_title: string;
  planned_hours: number;
  completed_hours: number;
  is_completed: boolean;
}

export interface MissedSession {
  session_id: number;
  task_title: string;
  planned_hours: number;
  session_date: string;
}

export const getTodaySessions = async (): Promise<TodaySession[]> => {
  const response = await api.get("/sessions/today");
  return response.data;
};

export const getMissedSessions = async (): Promise<MissedSession[]> => {
  const response = await api.get("/sessions/missed");
  return response.data;
};

export const completeSession = async (
  id: number,
  completed_hours: number
) => {
  const response = await api.patch(
    `/sessions/${id}/complete`,
    {
      completed_hours,
    }
  );

  return response.data;
};