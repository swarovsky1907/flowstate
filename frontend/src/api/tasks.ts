import api from "./axios";

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

export const createTask = async (task: any) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const deleteTask = async (
  id: number
) => {
  const response = await api.delete(
    `/tasks/${id}`
  );

  return response.data;
};

export const updateTask = async (
  id: number,
  taskData: {
    title: string;
    description: string;
    priority: string;
    estimated_hours: number;
    deadline: string;
  }
) => {
  const response = await api.put(
    `/tasks/${id}`,
    taskData
  );

  return response.data;
};