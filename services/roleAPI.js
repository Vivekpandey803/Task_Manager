// lib/roleApi.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/role';

export const fetchRoles = () => {
  return axios.get(API_URL).then(response => response.data);
};

export const addRole = (newRoleData) => {
  return axios.post(API_URL, newRoleData);
};

export const updateRole = (roleId, updatedData) => {
  return axios.put(`${API_URL}/${roleId}`, updatedData);
};

export const deleteRole = (roleId) => {
  return axios.delete(`${API_URL}/${roleId}`);
};
