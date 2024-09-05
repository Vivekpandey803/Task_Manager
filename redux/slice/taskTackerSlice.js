import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTasks, createTask, updateTask, deleteTask } from '@/services/tasktrackerAPI';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await getTasks();
  return response.data;
});

export const addTask = createAsyncThunk('tasks/addTask', async (taskData) => {
  const response = await createTask(taskData);
  return response.data;
});

export const updateTaskThunk = createAsyncThunk('tasks/updateTask', async ({ taskId, taskData }) => {
  const response = await updateTask(taskId, taskData);
  return response.data;
});

export const deleteTaskThunk = createAsyncThunk('tasks/deleteTask', async (taskId) => {
  await deleteTask(taskId);
  return taskId;
});
export const getTaskByIdThunk
= createAsyncThunk('tasks/getTaskById', async (taskId) => {
  await getTaskById(taskId);
  return taskId;
});
const taskTrackerSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.task_id === action.payload.task_id);
        state.tasks[index] = action.payload;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.task_id !== action.payload);
      })
      .addCase(getTaskByIdThunk.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.task_id !== action.payload);
      });
  },
});

export default taskTrackerSlice.reducer;
