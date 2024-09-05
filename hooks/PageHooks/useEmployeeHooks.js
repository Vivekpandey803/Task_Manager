import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getEmployees, editEmployee, removeEmployee } from '@/redux/slice/employeeSlice';

export const useEmployees = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.list);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editedData, setEditedData] = useState({
    employee_name: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  const startEditing = (employee) => {
    setEditingEmployee(employee.id);
    setEditedData({
      employee_name: employee.employee_name,
      phone: employee.phone,
      email: employee.email,
    });
  };

  const cancelEditing = () => {
    setEditingEmployee(null);
    setEditedData({
      employee_name: '',
      phone: '',
      email: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveChanges = async () => {
    await dispatch(editEmployee({ id: editingEmployee, employeeData: editedData }));
    setEditingEmployee(null);
    window.location.reload();
  };

  const deleteEmployeeById = (id) => dispatch(removeEmployee(id));

  return {
    employees,
    editingEmployee,
    editedData,
    startEditing,
    cancelEditing,
    handleInputChange,
    saveChanges,
    deleteEmployeeById,
  };
};
