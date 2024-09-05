import axios from 'axios';

const API_URL = 'http://localhost:3000/task';

export const getTasks = () => axios.get(API_URL);
export const createTask = (taskData) => axios.post(API_URL, taskData);
export const updateTask = (taskId, taskData) => axios.put(`${API_URL}/${taskId}`, taskData);
export const deleteTask = (taskId) => axios.delete(`${API_URL}/${taskId}`);
