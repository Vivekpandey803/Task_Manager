import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTasks, createTask, updateTask, deleteTask } from '@/services/taskAPI';


export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await getTasks();
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData) => {
  const response = await createTask(taskData);
  return response.data;
});

export const editTask = createAsyncThunk('tasks/editTask', async ({ taskId, taskData }) => {
  const response = await updateTask(taskId, taskData);
  return response.data;
});

export const removeTask = createAsyncThunk('tasks/removeTask', async (taskId) => {
  await deleteTask(taskId);
  return taskId;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index >= 0) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      });
  },
});

export default taskSlice.reducer;
