import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddAttendanceModal = ({ open, onClose, onSave, employees, formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Modal show={open} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Attendance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formEmployeeName">
            <Form.Label>Employee Name</Form.Label>
            <Form.Select 
              name="employeeName" 
              value={formData.employeeName} 
              onChange={handleChange}
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.employee_name}>
                  {employee.employee_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLocation">
            <Form.Label>Select Location</Form.Label>
            <Form.Select 
              name="location" 
              value={formData.location} 
              onChange={handleChange}
            >
              <option value="">Select Location</option>
              <option value="DBA">DBA</option>
              <option value="WFH">WFH</option>
              <option value="Sick Leave">Sick Leave</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formShift">
            <Form.Label>Select Shift</Form.Label>
            <Form.Select 
              name="shift" 
              value={formData.shift} 
              onChange={handleChange}
            >
              <option value="">Select Shift</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={onSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddAttendanceModal;
