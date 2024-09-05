import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '@/services/employeeAPI';

export const getEmployees = createAsyncThunk('employees/getEmployees', fetchEmployees);

export const createEmployee = createAsyncThunk('employees/createEmployee', addEmployee);

export const editEmployee = createAsyncThunk('employees/editEmployee', async ({ id, employeeData }) => {
  return updateEmployee(id, employeeData);
});

export const removeEmployee = createAsyncThunk('employees/removeEmployee', async (id) => {
  await deleteEmployee(id);
  return id;
});

const employeeSlice = createSlice({
  name: 'employees',
  initialState: { list: [], status: null },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.fulfilled, (state, action) => { state.list = action.payload; })
      .addCase(createEmployee.fulfilled, (state, action) => { state.list.push(action.payload); })
      .addCase(editEmployee.fulfilled, (state, action) => {
        const index = state.list.findIndex(emp => emp.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter(emp => emp.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
