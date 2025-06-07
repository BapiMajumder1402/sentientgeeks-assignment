import axios from '@/lib/axios';

export const fetchTasks = async (page = 1, search = '') => {
  const res = await axios.get(`/tasks?page=${page}&search=${search}`);
  return res.data;
};

export const createTask = async (title) => {
  const res = await axios.post('/tasks', { title });
  return res.data;
};

export const updateTask = async (id, title) => {
  const res = await axios.put(`/tasks/${id}`, { title });
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axios.delete(`/tasks/${id}`);
  return res.data;
};

export const toggleTaskComplete = async (id, completed) => {
  const res = await axios.patch(`/tasks/${id}/complete`, { completed });
  return res.data;
};
