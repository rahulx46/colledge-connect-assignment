import api from "./api.js";

export const fetchTasks = async () => {
  const response = await api.get("/tasks");
  return response.data.data;
};

export const fetchTask = async (taskId) => {
  const response = await api.get(`/tasks/${taskId}`);
  return response.data.data;
};

export const createTask = async (payload) => {
  const response = await api.post("/tasks", payload);
  return response.data.data;
};

export const updateTask = async (taskId, payload) => {
  const response = await api.put(`/tasks/${taskId}`, payload);
  return response.data.data;
};

export const deleteTask = async (taskId) => {
  await api.delete(`/tasks/${taskId}`);
};
