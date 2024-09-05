import { useDispatch, useSelector } from 'react-redux';
import { fetchRolesAsync, addRoleAsync, updateRoleAsync, deleteRoleAsync } from '@/redux/slice/roleSlice';
import { useState, useEffect } from 'react';

const useRoleDetails = () => {
  const dispatch = useDispatch();
  const roles = useSelector(state => state.roles.roles);
  const status = useSelector(state => state.roles.status);

  const [editingData, setEditingData] = useState({});
  const [editingRow, setEditingRow] = useState(null);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showSaveConfirmModal, setShowSaveConfirmModal] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRolesAsync());
    }
  }, [status, dispatch]);

  const handleEdit = (role) => {
    setEditingRow(role.id);
    setEditingData({ role: role.role });
  };

  const handleEditChange = (e) => {
    setEditingData({ ...editingData, [e.target.name]: e.target.value });
  };

  const handleDelete = (roleId) => {
    dispatch(deleteRoleAsync(roleId));
  };
  

  const handleAddRole = (newRoleData) => {
    dispatch(addRoleAsync(newRoleData));
    setShowAddRoleModal(false);
  };

  const handleSave = () => {
    if (editingRow) {
      dispatch(updateRoleAsync({ roleId: editingRow, updatedData: editingData }));
      setEditingRow(null);
    }
  };

  return {
    roles,
    editingRow,
    editingData,
    showAddRoleModal,
    showSaveConfirmModal,
    handleEdit,
    handleEditChange,
    handleDelete,
    handleAddRole,
    handleSave,
    setShowAddRoleModal,
    setShowSaveConfirmModal
  };
};

export default useRoleDetails;
