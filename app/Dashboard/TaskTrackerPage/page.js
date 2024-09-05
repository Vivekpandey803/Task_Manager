"use client";
import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Modal } from 'react-bootstrap';
import SideBar from '@/components/core/SideBar';
import PageNav from '@/components/core/PageNav';
import { useTaskTracker } from '@/hooks/PageHooks/useTaskTrackerHooks';
import { fetchEmployees } from '@/services/employeeAPI';

const TaskTrackerPage = () => {
  const { tasks, addNewTask, updateTask, deleteTask } = useTaskTracker();
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [taskData, setTaskData] = useState({
    assigned_by: "",
    assigned_to: "",
    task_name: "",
    assigned_date: "",
    start_date: "",
    end_date: "",
    status: "",
    comment: "",
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const data = await fetchEmployees();
      setEmployees(data);
    };
    fetchEmployeeData();
  }, []);

  const handleTaskChange = (e) => setTaskData({ ...taskData, [e.target.name]: e.target.value });

  const handleAddNewTask = async () => {
    try {
      await addNewTask(taskData);
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(currentTaskId, taskData);
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  const handleEditTask = (task) => {
    setCurrentTaskId(task.task_id);
    setTaskData(task);
    setEditMode(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setTaskData({
      assigned_by: "",
      assigned_to: "",
      task_name: "",
      assigned_date: "",
      start_date: "",
      end_date: "",
      status: "",
      comment: "",
    });
    setEditMode(false);
    setCurrentTaskId(null);
  };

  return (
    <div>
      <PageNav />
      <div className="d-flex">
        <SideBar />
        <div className="container my-2 p-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h1 className="fs-3 mx-4 fw-bold shadow-lg p-0 text-center mb-2 text-dark rounded-3">
              Task Tracker
            </h1>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Add New Task
            </Button>
          </div>

          <Table bordered responsive hover className="table table-bordered rounded-3 text-center">
            <thead className="table-dark">
              <tr>
                <th>Task Name</th>
                <th>Assigned By</th>
                <th>Assigned To</th>
                <th>Assigned Date</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <tr key={task.task_id}>
                    <td>{task.task_name}</td>
                    <td>{task.assigned_by_name}</td>
                    <td>{task.assigned_to_name}</td>
                    <td>{task.assigned_date}</td>
                    <td>{task.start_date}</td>
                    <td>{task.end_date}</td>
                    <td>{task.status}</td>
                    <td>{task.comment}</td>
                    <td>
                      <Button
                        variant="warning"
                        size="sm mx-1"
                        onClick={() => handleEditTask(task)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteTask(task.task_id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Update Task' : 'Add New Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="assignedBy">
              <Form.Label>Assigned By</Form.Label>
              <Form.Control
                as="select"
                name="assigned_by"
                value={taskData.assigned_by}
                onChange={handleTaskChange}
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.employee_id} value={employee.employee_id}>
                    {employee.employee_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="assignedTo">
              <Form.Label>Assigned To</Form.Label>
              <Form.Control
                as="select"
                name="assigned_to"
                value={taskData.assigned_to}
                onChange={handleTaskChange}
              >
                <option value="">Select Employee</option>
                {employees.map((employee) => (
                  <option key={employee.employee_id} value={employee.employee_id}>
                    {employee.employee_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="taskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                name="task_name"
                value={taskData.task_name}
                onChange={handleTaskChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="assignedDate">
              <Form.Label>Assigned Date</Form.Label>
              <Form.Control
                type="date"
                name="assigned_date"
                value={taskData.assigned_date}
                onChange={handleTaskChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={taskData.start_date}
                onChange={handleTaskChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={taskData.end_date}
                onChange={handleTaskChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={taskData.status}
                onChange={handleTaskChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                name="comment"
                value={taskData.comment}
                onChange={handleTaskChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={editMode ? handleUpdateTask : handleAddNewTask}
          >
            {editMode ? 'Save Changes' : 'Add Task'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskTrackerPage;
