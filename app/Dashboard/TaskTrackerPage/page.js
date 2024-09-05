"use client"
import React, { useState ,useEffect} from 'react';
import { Button, Form, Table, Modal, Toast, ToastContainer } from 'react-bootstrap';
import SideBar from '@/components/core/SideBar';
import PageNav from '@/components/core/PageNav';
import { useTaskTracker } from '@/hooks/PageHooks/useTaskTrackerHooks';
import { fetchEmployees } from '@/services/employeeAPI';

const TaskTrackerPage = () => {
  const { tasks, addNewTask, updateTask, deleteTask } = useTaskTracker();
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", variant: "" });
  const [editMode, setEditMode] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [newTaskData, setNewTaskData] = useState({
    assigned_by: "",
    assigned_to: "",
    task_name: "",
    assigned_date: "",
    start_date: "",
    end_date: "",
    status: "",
    comment: "",
  });

  const fetchEmployeeData = async () => {
    const data = await fetchEmployees();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const showToast = (message, variant) => {
    setToast({ show: true, message, variant });
    setTimeout(() => setToast({ show: false, message: "", variant: "" }), 3000);
  };

  const handleAddNewTask = async () => {
    try {
      await addNewTask(newTaskData);
      setShowModal(false);
      resetForm();
      showToast("Task added successfully!", "success");
    } catch (error) {
      showToast("Failed to add task.", "danger");
    }
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(currentTaskId, newTaskData);
      setShowModal(false);
      resetForm();
      showToast("Task updated successfully!", "success");
    } catch (error) {
      showToast("Failed to update task.", "danger");
    }
  };

  const handleNewTaskChange = (e) => setNewTaskData({ ...newTaskData, [e.target.name]: e.target.value });

  const handleEditTask = (task) => {
    setCurrentTaskId(task.task_id);
    setNewTaskData({
      assigned_by: task.assigned_by,
      assigned_to: task.assigned_to,
      task_name: task.task_name,
      assigned_date: task.assigned_date,
      start_date: task.start_date,
      end_date: task.end_date,
      status: task.status,
      comment: task.comment,
    });
    setEditMode(true);
    setShowModal(true);
  };

  const resetForm = () => {
    setNewTaskData({
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
                value={newTaskData.assigned_by}
                onChange={handleNewTaskChange}
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
                value={newTaskData.assigned_to}
                onChange={handleNewTaskChange}
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
                value={newTaskData.task_name}
                onChange={handleNewTaskChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="assignedDate">
              <Form.Label>Assigned Date</Form.Label>
              <Form.Control
                type="date"
                name="assigned_date"
                value={newTaskData.assigned_date}
                onChange={handleNewTaskChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={newTaskData.start_date}
                onChange={handleNewTaskChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={newTaskData.end_date}
                onChange={handleNewTaskChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={newTaskData.status}
                onChange={handleNewTaskChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="text"
                name="comment"
                value={newTaskData.comment}
                onChange={handleNewTaskChange}
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

      <ToastContainer position="top-end">
        <Toast show={toast.show} bg={toast.variant}>
          <Toast.Body>{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default TaskTrackerPage;
