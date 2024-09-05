// store/roleSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRoles, addRole, updateRole, deleteRole } from '@/services/roleAPI';

export const fetchRolesAsync = createAsyncThunk('roles/fetchRoles', async () => {
  const response = await fetchRoles();
  return response;
});

export const addRoleAsync = createAsyncThunk('roles/addRole', async (newRole) => {
  await addRole(newRole);
  return newRole;
});

export const updateRoleAsync = createAsyncThunk('roles/updateRole', async ({ roleId, updatedData }) => {
  await updateRole(roleId, updatedData);
  return { roleId, updatedData };
});

export const deleteRoleAsync = createAsyncThunk('roles/deleteRole', async (roleId) => {
  await deleteRole(roleId);
  return roleId;
});

const roleSlice = createSlice({
  name: 'roles',
  initialState: {
    roles: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRolesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRolesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.roles = action.payload;
      })
      .addCase(fetchRolesAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addRoleAsync.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      })
      .addCase(updateRoleAsync.fulfilled, (state, action) => {
        const { roleId, updatedData } = action.payload;
        const index = state.roles.findIndex(role => role.id === roleId);
        if (index !== -1) {
          state.roles[index] = { ...state.roles[index], ...updatedData };
        }
      })
      .addCase(deleteRoleAsync.fulfilled, (state, action) => {
        const roleId = action.payload;
        state.roles = state.roles.filter(role => role.id !== roleId);
      });
  },
});

export default roleSlice.reducer;
