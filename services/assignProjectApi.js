import axios from 'axios';

const API_URL = 'http://localhost:3000/assignProject';

export const fetchAllProjects = () => axios.get(`${API_URL}`);
export const fetchProjectById = (id) => axios.get(`${API_URL}/${id}`); 
export const addProject = (projectData) => axios.post(`${API_URL}`, projectData);
export const updateProject = (id, updatedData) => axios.put(`${API_URL}/${id}`, updatedData); 
export const deleteProject = (id) => axios.delete(`${API_URL}/${id}`);
