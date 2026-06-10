import api from "./axios";

export interface DailySchedule {
  task_id: number;
  title: string;
  priority: string;
  hours_today: number;
}

export const getDailySchedule =
  async (): Promise<DailySchedule[]> => {
    const response = await api.get(
      "/schedule/daily"
    );

    return response.data;
  };