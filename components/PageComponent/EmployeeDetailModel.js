import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeDetailModal = ({ employee }) => {
  const [show, setShow] = useState(false);

console.log('employeemodel')
  return (
    <>
      <button className="btn btn-info" onClick={() => setShow(true)}>View Details</button>
      {employee && (
        <Modal
          show={show}
          onHide={() => setShow(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Employee Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="flex flex-col gap-2 text-[16px]">
              <p><strong>Name:</strong> {employee.employee_name}</p>
              <p><strong>Phone:</strong> {employee.phone}</p>
              <p><strong>Email:</strong> {employee.email}</p>
              <p><strong>Project ID:</strong> {employee.project_id}</p>
              <p><strong>Projects:</strong> {employee.projects}</p>
              <p><strong>Location:</strong> {employee.location }</p>
              <p><strong>Shift:</strong> {employee.shift }</p>
              <p>Task ID : {employee.task_id}</p>
              <p><strong>Task Name:</strong> {employee.task_name}</p>
              <p><strong>Assigned By:</strong> {employee.assignedby}</p>
              <p><strong>Status:</strong> {employee.status}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default EmployeeDetailModal;
