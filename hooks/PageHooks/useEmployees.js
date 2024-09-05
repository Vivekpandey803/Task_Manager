import { useState, useCallback } from "react";
import axios from "axios";

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/employee");
      setEmployees(response.data);

    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  }, []);

  const fetchEmployee = useCallback(async (employeeId) => {
    try {
      const response = await axios.get(`http://localhost:3000/employee/${employeeId}`);

      setSelectedEmployee(response.data);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  }, []);

  const updateEmployee = useCallback(async (employeeId, updatedData) => {
    try {
      await axios.put(`http://localhost:3000/employee/${employeeId}`, updatedData);
      fetchEmployees(); 

    } catch (error) {
      console.error("Error updating employee:", error);
    }
  }, []);

  const deleteEmployee = useCallback(async (employeeId) => {
    try {
      await axios.delete(`http://localhost:3000/employee/${employeeId}`);
      fetchEmployees(); 
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }, [fetchEmployees]);

  return { employees, selectedEmployee, fetchEmployee, updateEmployee, deleteEmployee, fetchEmployees };
};
