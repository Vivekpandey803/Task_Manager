import axios from 'axios';

const API_URL = 'http://localhost:3000/employeeAttendance';

export const fetchAttendance = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error('Error fetching attendance:', error);
    throw error; 
  }
};

export const addAttendance = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response;
  } catch (error) {
    console.error('Error adding attendance:', error);
    throw error;
  }
};

export const updateAttendance = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response;
  } catch (error) {
    console.error('Error updating attendance:', error);
    throw error;
  }
};

export const deleteAttendance = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting attendance:', error);
    throw error;
  }
};
