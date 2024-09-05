import { createSlice } from '@reduxjs/toolkit';
import { fetchProjectsApi, createProjectApi, updateProjectApi, deleteProjectApi } from '@/services/assignProjectApi';

const initialState = {
    projects: [],
    loading: false,
    error: null
};

export const fetchProjects = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await fetchProjectsApi();
        dispatch(setProjects(data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const createProject = (newProject) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await createProjectApi(newProject);
        dispatch(addProject(data));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const updateProject = (id, updatedProject) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const data = await updateProjectApi(id, updatedProject);
        dispatch(updateProjectInState({ id, updatedProject: data }));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const deleteProject = (id) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        await deleteProjectApi(id);
        dispatch(removeProject(id));
    } catch (error) {
        dispatch(setError(error.message));
    } finally {
        dispatch(setLoading(false));
    }
};

const assignProjectSlice = createSlice({
    name: 'assignProject',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setProjects(state, action) {
            state.projects = action.payload;
        },
        addProject(state, action) {
            state.projects.push(action.payload);
        },
        updateProjectInState(state, action) {
            const { id, updatedProject } = action.payload;
            const index = state.projects.findIndex((proj) => proj.id === id);
            if (index !== -1) {
                state.projects[index] = updatedProject;
            }
        },
        removeProject(state, action) {
            state.projects = state.projects.filter((proj) => proj.id !== action.payload);
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

export const { setLoading, setProjects, addProject, updateProjectInState, removeProject, setError } = assignProjectSlice.actions;
export default assignProjectSlice.reducer;
