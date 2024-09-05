import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProjects, addProject, updateProject, deleteProject } from '@/services/projectAPI';

export const fetchProjectsAsync = createAsyncThunk('projects/fetchProjects', fetchProjects);

export const addProjectAsync = createAsyncThunk('projects/addProject', async (newProject) => {
  await addProject(newProject);
  return newProject;
});

export const updateProjectAsync = createAsyncThunk('projects/updateProject', async ({ projectId, updatedData }) => {
  await updateProject(projectId, updatedData);
  return { projectId, updatedData };
});

export const deleteProjectAsync = createAsyncThunk('projects/deleteProject', deleteProject);

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProjectsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.projects = action.payload;
      })
      .addCase(fetchProjectsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        const { projectId, updatedData } = action.payload;
        const index = state.projects.findIndex(project => project.id === projectId);
        if (index !== -1) state.projects[index] = { ...state.projects[index], ...updatedData };
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.projects = state.projects.filter(project => project.id !== action.payload);
      });
  },
});

export default projectSlice.reducer;
