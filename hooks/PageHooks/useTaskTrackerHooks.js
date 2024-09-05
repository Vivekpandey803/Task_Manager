import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, addTask, updateTaskThunk, deleteTaskThunk } from '@/redux/slice/taskTackerSlice';
import { useEffect } from 'react';

export const useTaskTracker = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const taskStatus = useSelector((state) => state.tasks.status);

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  const addNewTask = (taskData) => dispatch(addTask(taskData));
  const updateTask = (taskId, taskData) => dispatch(updateTaskThunk({ taskId, taskData }));
  const deleteTask = (taskId) => dispatch(deleteTaskThunk(taskId));
  const getTaskById = (taskId) => dispatch(getTaskByIdThunk(taskId));


  return { tasks, addNewTask, updateTask, deleteTask };
};
