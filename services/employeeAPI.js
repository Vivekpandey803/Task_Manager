import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchEmployees = () => api.get('/employee').then(response => response.data);

export const addEmployee = (employeeData) => api.post('/employee', employeeData).then(response => response.data);

export const updateEmployee = (id, employeeData) => api.put(`/employee/${id}`, employeeData).then(response => response.data);

export const deleteEmployee = (id) => api.delete(`/employee/${id}`);
