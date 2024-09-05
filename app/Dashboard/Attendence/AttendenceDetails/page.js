
"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAttendanceAsync, addAttendanceAsync, updateAttendanceAsync, deleteAttendanceAsync } from '@/redux/slice/attendanceSlice';
import { Button, Table, Toast, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from '@/components/core/SideBar';
import PageNav from '@/components/core/PageNav';
import AddAttendanceModal from '@/components/PageComponent/AddAttendanceTable'; 
import useEmployeeManagement from "@/hooks/PageHooks/UseEmployeeAttendence";

const AttendancePage = () => {
  const dispatch = useDispatch();
  const { entries = [], status, error } = useSelector((state) => state.attendance);
  
    const {
      employees,
      selectedEmployee,
      handleViewDetails,
    } = useEmployeeManagement();
  

  const [showModal, setShowModal] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({ id: '', start_date: '', end_date :'', location: 'DBA', shift: 'morning' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAttendanceAsync()).catch(error => console.error('Error fetching attendance:', error));
    }
  }, [status, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEntry({ ...currentEntry, [name]: value });
  };

  const handleAdd = () => {
    setIsEditing(false);
    setCurrentEntry({ id: Date.now().toString(), date: '', employeeName: '', location: 'DBA', shift: 'morning' });
    setShowModal(true);
  };

  const handleEdit = (entry) => {
    setIsEditing(true);
    setCurrentEntry(entry);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (isEditing) {
      dispatch(updateAttendanceAsync({ id: currentEntry.id, data: currentEntry })).catch(error => console.error('Error updating attendance:', error));
    } else {
      dispatch(addAttendanceAsync(currentEntry)).catch(error => console.error('Error adding attendance:', error));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteAttendanceAsync(id)).catch(error => console.error('Error deleting attendance:', error));
  };

  return (
    <div>
      <PageNav />
      <div className='d-flex'>
        <SideBar />
        <div className="container my-2 p-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h1 className="fs-3 mx-4 fw-bold shadow-lg p-0 text-center mb-2 text-white rounded-3">
              Attendance
            </h1>
            <Button className="btn btn-primary mb-3" onClick={handleAdd}>
              Add New Entry
            </Button>
          </div>
          <Table bordered responsive hover className="table table-bordered rounded-3 text-center">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Location</th>
                <th>Shift</th>
              </tr>
            </thead>
            <tbody>
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.date}</td>
                    <td>{entry.location}</td>
                    <td>{entry.shift}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No entries found.</td>
                </tr>
              )}
            </tbody>
          </Table>

          <AddAttendanceModal
            open={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleSubmit}
           employees={[employees]} // Assuming you will pass the list of employees here
            formData={currentEntry}
            setFormData={setCurrentEntry} // Updated prop name
          />

          {error && (
            <ToastContainer className="p-3" position="top-center">
              <Toast>
                <Toast.Body className="text-danger">{error}</Toast.Body>
              </Toast>
            </ToastContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;


