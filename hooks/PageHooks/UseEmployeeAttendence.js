import { useState, useEffect } from 'react';
import { useEmployees } from './useEmployees';

const useEmployeeActions = () => {
  const { employees, selectedEmployee, fetchEmployee, updateEmployee, deleteEmployee, fetchEmployees } = useEmployees();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmTitle, setConfirmTitle] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [editData, setEditData] = useState({});
  const [editingRow, setEditingRow] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleViewDetails = (employeeId) => {
    fetchEmployee(employeeId);
    setShowModal(true);
  };

  const handleEdit = (employee) => {
    setEditData({
      employee_name: employee.employee_name,
      phone: employee.phone,
      email: employee.email,
      role: employee.role,
      location: employee.location,
      taskAllocated: employee.taskAllocated,
      taskAllocatedBy: employee.taskAllocatedBy,
    });
    setEditingRow(employee.id);
    setSelectedId(employee.id);
  };

  const handleDelete = (employeeId) => {
    setSelectedId(employeeId);
    setConfirmTitle('Confirm Delete');
    setConfirmMessage('Do you want to delete this employee?');
    setConfirmAction(() => () => {
      deleteEmployee(employeeId)
        .then(() => {
          setToastMessage('Employee deleted successfully!');
          setToastType('success');
          setShowToast(true);
          fetchEmployees();
        })
        .catch(() => {
          setToastMessage('Error deleting employee.');
          setToastType('error');
          setShowToast(true);
        })
        .finally(() => setShowConfirm(false));
    });
    setShowConfirm(true);
  };
  

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    setConfirmTitle('Confirm Save');
    setConfirmMessage('Do you want to save these changes?');
    setConfirmAction(() => () => {
      updateEmployee(selectedId, editData)
        .then(() => {
          setToastMessage('Employee updated successfully!');
          setToastType('success');
          setShowToast(true);
          fetchEmployees(); 
          setEditingRow(null); 
        })
        .catch(() => {
          setToastMessage('Error updating employee.');
          setToastType('error');
          setShowToast(true);
        })
        .finally(() => setShowConfirm(false));
    });

    setShowConfirm(true);
  };

  const handleClose = () => setShowModal(false);

  return {
    employees,
    selectedEmployee,
    showToast,
    toastMessage,
    toastType,
    showConfirm,
    confirmAction,
    confirmTitle,
    confirmMessage,
    editData,
    editingRow,
    showModal,
    handleViewDetails,
    handleEdit,
    handleDelete,
    handleEditChange,
    handleEditSave,
    handleClose,
  };
};

export default useEmployeeActions;
