import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '@/services/attendanceAPI';

export const fetchAttendanceAsync = createAsyncThunk(
  'attendance/fetchAttendance',
  async () => {
    const response = await api.fetchAttendance();
    return response.data;
  }
);

export const addAttendanceAsync = createAsyncThunk(
  'attendance/addAttendance',
  async (newEntry) => {
    const response = await api.addAttendance(newEntry);
    return response.data;
  }
);

export const updateAttendanceAsync = createAsyncThunk(
  'attendance/updateAttendance',
  async ({ id, data }) => {
    const response = await api.updateAttendance(id, data);
    return response.data;
  }
);

export const deleteAttendanceAsync = createAsyncThunk(
  'attendance/deleteAttendance',
  async (id) => {
    await api.deleteAttendance(id);
    return id;
  }
);

// const attendanceSlice = createSlice({
//   name: 'attendance',
//   initialState: {
//     entries: [],
//     status: 'idle',
//     error: null
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAttendanceAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchAttendanceAsync.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.entries = action.payload;
//       })
//       .addCase(fetchAttendanceAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(addAttendanceAsync.fulfilled, (state, action) => {
//         state.entries.push(action.payload);
//       })
//       .addCase(updateAttendanceAsync.fulfilled, (state, action) => {
//         const index = state.entries.findIndex(entry => entry.id === action.payload.id);
//         if (index >= 0) {
//           state.entries[index] = action.payload;
//         }
//       })
//       .addCase(deleteAttendanceAsync.fulfilled, (state, action) => {
//         state.entries = state.entries.filter(entry => entry.id !== action.payload);
//       });
//   }
// });





export const fetchEmployees = createAsyncThunk('attendance/fetchEmployees', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('http://localhost:3000/employee');
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const saveAttendance = createAsyncThunk('attendance/saveAttendance', async (attendanceData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('http://localhost:3000/employeeAttendance', attendanceData);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchAttendanceByEmployee = createAsyncThunk('attendance/fetchAttendanceByEmployee', async (employeeId, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`http://localhost:3000/employeeAttendance?employeeId=${employeeId}`);
    return data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: { employees: [], attendanceRecords: [], loading: false, error: null, toast: { showToast: false, message: '', type: '' } },
  reducers: {
    resetToast: (state) => { state.toast = { showToast: false, message: '', type: '' }; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => { state.employees = action.payload; })
      .addCase(fetchEmployees.rejected, (state, action) => { state.toast = { showToast: true, message: action.payload, type: 'danger' }; })
      .addCase(saveAttendance.fulfilled, (state, action) => {
        state.attendanceRecords.push(action.payload);
        state.toast = { showToast: true, message: 'Attendance saved successfully!', type: 'success' };
      })
      .addCase(saveAttendance.rejected, (state, action) => { state.toast = { showToast: true, message: action.payload, type: 'danger' }; })
      .addCase(fetchAttendanceByEmployee.fulfilled, (state, action) => { state.attendanceRecords = action.payload; })
      .addCase(fetchAttendanceByEmployee.rejected, (state, action) => { state.toast = { showToast: true, message: action.payload, type: 'danger' }; });
  },
});

export const { resetToast } = attendanceSlice.actions;
export default attendanceSlice.reducer;
