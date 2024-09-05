// "use client";

// import React, { useEffect, useState } from 'react';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { useDispatch, useSelector } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { Provider } from 'react-redux';
// import { Button, Table, Modal, Form, Toast, ToastContainer } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// // Async Thunks for API Calls
// const fetchAttendanceAsync = createAsyncThunk(
//   'employeeAttendance/fetchAttendance',
//   async () => {
//     const response = await axios.get('https://localhost:3000/employeeattendance');
//     return response.data;
//   }
// );

// const fetchEmployeesAsync = createAsyncThunk(
//   'employeeAttendance/fetchEmployees',
//   async () => {
//     const response = await axios.get('https://localhost:3000/employee');
//     return response.data;
//   }
// );

// const addAttendanceAsync = createAsyncThunk(
//   'employeeAttendance/addAttendance',
//   async (attendanceData) => {
//     const response = await axios.post('https://localhost:3000/employeeattendance', attendanceData);
//     return response.data;
//   }
// );

// // Slice to handle state
// const employeeAttendanceSlice = createSlice({
//   name: 'employeeAttendance',
//   initialState: {
//     attendance: [],
//     employees: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAttendanceAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchAttendanceAsync.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.attendance = action.payload;
//       })
//       .addCase(fetchAttendanceAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
//         state.employees = action.payload;
//       })
//       .addCase(addAttendanceAsync.fulfilled, (state, action) => {
//         state.attendance.push(action.payload);
//       });
//   },
// });

// // Configure store
// const store = configureStore({
//   reducer: {
//     employeeAttendance: employeeAttendanceSlice.reducer,
//   },
// });

// // Attendance Page Component
// const AttendancePage = () => {
//   const dispatch = useDispatch();
//   const { attendance, employees, status, error } = useSelector((state) => state.employeeAttendance);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [attendanceData, setAttendanceData] = useState({
//     date: '',
//     location: '',
//     shift: '',
//   });

//   useEffect(() => {
//     dispatch(fetchAttendanceAsync()).catch(error => console.error('Error fetching attendance:', error));
//     dispatch(fetchEmployeesAsync()).catch(error => console.error('Error fetching employees:', error));
//   }, [dispatch]);

//   const handleSave = () => {
//     if (selectedEmployee && attendanceData.date && attendanceData.location && attendanceData.shift) {
//       const newAttendance = {
//         employeeId: selectedEmployee,
//         ...attendanceData,
//       };
//       dispatch(addAttendanceAsync(newAttendance)).catch(error => console.error('Error adding attendance:', error));
//       setShowModal(false);
//     }
//   };

//   return (
//     <div className="container my-2 p-2">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h1 className="fs-3 mx-4 fw-bold shadow-lg p-0 text-center mb-2 text-white rounded-3">
//           Employee Attendance
//         </h1>
//         <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
//           Add Attendance
//         </Button>
//       </div>
//       <Table bordered responsive hover className="table table-bordered rounded-3 text-center">
//         <thead className="table-dark">
//           <tr>
//             <th>Serial No</th>
//             <th>Date</th>
//             <th>Location</th>
//             <th>Shift</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendance.length > 0 ? (
//             attendance.map((entry, index) => (
//               <tr key={entry.id}>
//                 <td>{index + 1}</td>
//                 <td>{entry.date}</td>
//                 <td>{entry.location}</td>
//                 <td>{entry.shift}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No attendance records found.</td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* Attendance Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Attendance</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formEmployee">
//               <Form.Label>Employee</Form.Label>
//               <Form.Control as="select" value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
//                 <option value="">Select Employee</option>
//                 {employees.map((employee) => (
//                   <option key={employee.id} value={employee.id}>
//                     {employee.name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="formDate">
//               <Form.Label>Date</Form.Label>
//               <Form.Control type="date" value={attendanceData.date} onChange={(e) => setAttendanceData({ ...attendanceData, date: e.target.value })} />
//             </Form.Group>
//             <Form.Group controlId="formLocation">
//               <Form.Label>Location</Form.Label>
//               <Form.Control as="select" value={attendanceData.location} onChange={(e) => setAttendanceData({ ...attendanceData, location: e.target.value })}>
//                 <option value="">Select Location</option>
//                 <option value="WFH">WFH</option>
//                 <option value="DBA">DBA</option>
//                 <option value="Sick Leave">Sick Leave</option>
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="formShift">
//               <Form.Label>Shift</Form.Label>
//               <Form.Control as="select" value={attendanceData.shift} onChange={(e) => setAttendanceData({ ...attendanceData, shift: e.target.value })}>
//                 <option value="">Select Shift</option>
//                 <option value="Morning">Morning</option>
//                 <option value="Evening">Evening</option>
//               </Form.Control>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleSave}>Save</Button>
//         </Modal.Footer>
//       </Modal>

//       {error && (
//         <ToastContainer className="p-3" position="top-center">
//           <Toast>
//             <Toast.Body className="text-danger">{error}</Toast.Body>
//           </Toast>
//         </ToastContainer>
//       )}
//     </div>
//   );
// };

// // Wrapping the page with Redux Provider
// const AttendancePageWithStore = () => (
//   <Provider store={store}>
//     <AttendancePage />
//   </Provider>
// );

// export default AttendancePageWithStore;





// EmployeeAttendanceslice : 





// // redux/slice/employeeAttendanceSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// export const fetchAttendanceAsync = createAsyncThunk(
//   'employeeAttendance/fetchAttendance',
//   async () => {
//     const response = await axios.get('https://localhost:3000/employeeattendance');
//     return response.data;
//   }
// );

// export const fetchEmployeesAsync = createAsyncThunk(
//   'employeeAttendance/fetchEmployees',
//   async () => {
//     const response = await axios.get('https://localhost:3000/employee');
//     return response.data;
//   }
// );

// export const addAttendanceAsync = createAsyncThunk(
//   'employeeAttendance/addAttendance',
//   async (attendanceData) => {
//     const response = await axios.post('https://localhost:3000/employeeattendance', attendanceData);
//     return response.data;
//   }
// );

// const employeeAttendanceSlice = createSlice({
//   name: 'employeeAttendance',
//   initialState: {
//     attendance: [],
//     employees: [],
//     status: 'idle',
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAttendanceAsync.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(fetchAttendanceAsync.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.attendance = action.payload;
//       })
//       .addCase(fetchAttendanceAsync.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(fetchEmployeesAsync.fulfilled, (state, action) => {
//         state.employees = action.payload;
//       })
//       .addCase(addAttendanceAsync.fulfilled, (state, action) => {
//         state.attendance.push(action.payload);
//       });
//   },
// });

// export default employeeAttendanceSlice.reducer;



// Attendance Page 


// "use client";

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAttendanceAsync, fetchEmployeesAsync, addAttendanceAsync } from '@/redux/slice/employeeAttendanceSlice';
// import { Button, Table, Modal, Form, Toast, ToastContainer } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AttendancePage = () => {
//   const dispatch = useDispatch();
//   const { attendance, employees, status, error } = useSelector((state) => state.employeeAttendance);

//   const [showModal, setShowModal] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState('');
//   const [attendanceData, setAttendanceData] = useState({
//     date: '',
//     location: '',
//     shift: '',
//   });

//   useEffect(() => {
//     dispatch(fetchAttendanceAsync()).catch(error => console.error('Error fetching attendance:', error));
//     dispatch(fetchEmployeesAsync()).catch(error => console.error('Error fetching employees:', error));
//   }, [dispatch]);

//   const handleSave = () => {
//     if (selectedEmployee && attendanceData.date && attendanceData.location && attendanceData.shift) {
//       const newAttendance = {
//         employeeId: selectedEmployee,
//         ...attendanceData,
//       };
//       dispatch(addAttendanceAsync(newAttendance)).catch(error => console.error('Error adding attendance:', error));
//       setShowModal(false);
//     }
//   };

//   return (
//     <div className="container my-2 p-2">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h1 className="fs-3 mx-4 fw-bold shadow-lg p-0 text-center mb-2 text-white rounded-3">
//           Employee Attendance
//         </h1>
//         <Button className="btn btn-primary" onClick={() => setShowModal(true)}>
//           Add Attendance
//         </Button>
//       </div>
//       <Table bordered responsive hover className="table table-bordered rounded-3 text-center">
//         <thead className="table-dark">
//           <tr>
//             <th>Serial No</th>
//             <th>Date</th>
//             <th>Location</th>
//             <th>Shift</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendance.length > 0 ? (
//             attendance.map((entry, index) => (
//               <tr key={entry.id}>
//                 <td>{index + 1}</td>
//                 <td>{entry.date}</td>
//                 <td>{entry.location}</td>
//                 <td>{entry.shift}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">No attendance records found.</td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* Attendance Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Attendance</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group controlId="formEmployee">
//               <Form.Label>Employee</Form.Label>
//               <Form.Control as="select" value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
//                 <option value="">Select Employee</option>
//                 {employees.map((employee) => (
//                   <option key={employee.id} value={employee.id}>
//                     {employee.name}
//                   </option>
//                 ))}
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="formDate">
//               <Form.Label>Date</Form.Label>
//               <Form.Control type="date" value={attendanceData.date} onChange={(e) => setAttendanceData({ ...attendanceData, date: e.target.value })} />
//             </Form.Group>
//             <Form.Group controlId="formLocation">
//               <Form.Label>Location</Form.Label>
//               <Form.Control as="select" value={attendanceData.location} onChange={(e) => setAttendanceData({ ...attendanceData, location: e.target.value })}>
//                 <option value="">Select Location</option>
//                 <option value="WFH">WFH</option>
//                 <option value="DBA">DBA</option>
//                 <option value="Sick Leave">Sick Leave</option>
//               </Form.Control>
//             </Form.Group>
//             <Form.Group controlId="formShift">
//               <Form.Label>Shift</Form.Label>
//               <Form.Control as="select" value={attendanceData.shift} onChange={(e) => setAttendanceData({ ...attendanceData, shift: e.target.value })}>
//                 <option value="">Select Shift</option>
//                 <option value="Morning">Morning</option>
//                 <option value="Evening">Evening</option>
//               </Form.Control>
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleSave}>Save</Button>
//         </Modal.Footer>
//       </Modal>

//       {error && (
//         <ToastContainer className="p-3" position="top-center">
//           <Toast>
//             <Toast.Body className="text-danger">{error}</Toast.Body>
//           </Toast>
//         </ToastContainer>
//       )}
    



//   );
// };

// export default AttendancePage;



// Reducer ::: 

// // redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import employeeAttendanceReducer from './slice/employeeAttendanceSlice';

// export const store = configureStore({
//   reducer: {
//     employeeAttendance: employeeAttendanceReducer,
//   },
// });

