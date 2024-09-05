import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { fetchTasks, addTask, editTask, removeTask } from '@/redux/slice/taskSlice';

export const useTasks = () => {
  const [newTask, setNewTask] = useState({ taskName: '', description: '' });
  const [editTaskId, setEditTaskId] = useState(null);
  const [editData, setEditData] = useState({ taskName: '', description: '' });
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks || []); 
  const status = useSelector((state) => state.tasks.status);

  useEffect(() => { {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleAddNewTask = async () => {
  
    try {
      dispatch(addTask(newTask));
      setNewTask({ taskName: '', description: '' });
      window.location.reload(); 

    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleEditSave = async (taskId) => {
   
    try {
      dispatch(editTask({ taskId, taskData: editData })); 
      setEditTaskId(null); 
      setEditData({ taskName: '', description: '' }); 
      window.location.reload(); 

    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      dispatch(removeTask(taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleAddTaskChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });

  };

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditData({ taskName: task.taskName, description: task.description });

  };

  return {
    tasks,
    status,
    newTask,
    editData,
    editTaskId,
    handleAddNewTask,
    handleEditSave,
    handleDelete,
    handleAddTaskChange,
    handleEditChange,
    handleEdit,
    setEditTaskId
  };
};
