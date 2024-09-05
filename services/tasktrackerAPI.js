
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/taskTracker';

export const getTasks = () => axios.get(BASE_URL);

export const getTaskById = (id) => axios.get(`${BASE_URL}/${id}`);

export const createTask = (task) => axios.post(BASE_URL, task);

export const updateTask = (id, task) => axios.put(`${BASE_URL}/${id}`, task);

export const deleteTask = (id) => axios.delete(`${BASE_URL}/${id}`);

