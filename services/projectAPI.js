import axios from 'axios';

const API_URL = 'http://localhost:3000/project';

export const fetchProjects = () => {
  return axios.get(API_URL).then(response => response.data);
};

export const addProject = (newProjectData) => {
  return axios.post(API_URL, newProjectData);
};

export const updateProject = (ProjectId, updatedData) => {
  return axios.put(`${API_URL}/${ProjectId}`, updatedData);
};

export const deleteProject = (ProjectId) => {
  return axios.delete(`${API_URL}/${ProjectId}`);
};
