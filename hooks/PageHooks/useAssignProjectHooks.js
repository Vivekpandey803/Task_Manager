import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, createProject, updateProject, deleteProject } from '@/redux/slice/assignProjectslice';

// Custom hook for managing project assignments
export const useAssignProject = () => {
    const dispatch = useDispatch();
    const { projects, loading, error } = useSelector((state) => state.assignProject);
    const [editingProject, setEditingProject] = useState(null); // Track project being edited
    const [newProject, setNewProject] = useState({
        employee_name: '',
        project: '',
        role: ''
    });

    // Fetch all projects when the component is mounted
    useEffect(() => {
        dispatch(fetchProjects());
    }, [dispatch]);

    // Handle input changes for new or edited project
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProject((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Submit function to handle both new and edit functionality
    const handleSubmit = () => {
        if (editingProject) {
            dispatch(updateProject(editingProject.id, newProject)); // Update project if editing
            setEditingProject(null); // Clear editing state
        } else {
            dispatch(createProject(newProject)); // Create new project if not editing
        }
        setNewProject({
            employee_name: '',
            project: '',
            role: ''
        }); // Clear the form
    };

    // Handle deleting a project
    const handleDelete = (id) => {
        dispatch(deleteProject(id));
    };

    // Set project for editing
    const handleEdit = (project) => {
        setEditingProject(project);
        setNewProject(project); // Pre-fill the form with project data
    };

    // Reset editing state
    const resetEditing = () => {
        setEditingProject(null);
        setNewProject({
            employee_name: '',
            project: '',
            role: ''
        });
    };

    // Return state and handler functions from the hook
    return {
        projects,
        loading,
        error,
        newProject,
        handleInputChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        editingProject,
        resetEditing
    };
};
