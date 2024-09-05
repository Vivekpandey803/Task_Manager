import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectsAsync, addProjectAsync, updateProjectAsync, deleteProjectAsync } from '@/redux/slice/projectSlice';

const useProjectActions = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);
  const projectStatus = useSelector((state) => state.projects.status);
  const [showModal, setShowModal] = useState(false);
  const [newProjectData, setNewProjectData] = useState({ project: '' });
  const [editData, setEditData] = useState({});
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    if (projectStatus === 'idle') {
      dispatch(fetchProjectsAsync());
    }
  }, [projectStatus, dispatch]);

  const handleEdit = (project) => {
    setEditData({ project: project.project });
    setEditingRow(project.id);
  };

  const handleDelete = async (projectId) => {
     dispatch(deleteProjectAsync(projectId));
  };

  const handleAddNewProject = async () => {
     dispatch(addProjectAsync(newProjectData));
    setShowModal(false);
    setNewProjectData({ project: '' });
  };

  const handleEditSave = async (projectId) => {
     dispatch(updateProjectAsync({ projectId, updatedData: editData }));
    setEditingRow(null);
    dispatch(fetchProjectsAsync());
  };

  const handleNewProjectChange = (e) => setNewProjectData({ ...newProjectData, [e.target.name]: e.target.value });
  const handleEditChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Not Available' : date.toLocaleDateString();
   };

  return {
    projects,
    showModal,
    setShowModal,
    newProjectData,
    editData,
    editingRow,
    handleEdit,
    handleDelete,
    handleAddNewProject,
    handleEditSave,
    handleNewProjectChange,
    handleEditChange,
    formatDate
  };
};

export default useProjectActions;
