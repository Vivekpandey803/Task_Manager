import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slice/employeeSlice';
import roleReducer from './slice/roleSlice'
import taskReducer from './slice/taskSlice';
import taskTrackerReducer from './slice/taskTackerSlice';
import attendanceReducer from './slice/attendanceSlice';
import projectReducer from './slice/projectSlice';
const store = configureStore({
  reducer: {
    employees: employeeReducer,
    roles: roleReducer,
    tasks: taskReducer,
    tasks: taskTrackerReducer,
    attendance: attendanceReducer,
    projects: projectReducer, 
  },
});
export default store;