"use client";

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Form } from 'react-bootstrap';
import { useTasks } from '@/hooks/PageHooks/useTasksHook';
import PageNav from '@/components/core/PageNav';
import SideBar from '@/components/core/SideBar';
import AddNewItemModal from '@/components/core/AddNewItemModel';

const TaskListPage = () => {
  const {
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
  } = useTasks();

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <PageNav />
      <div className="d-flex">
        <SideBar />
        <div className="container my-2 p-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h1 className="fs-3 mx-4 fw-bold shadow-lg p-0 text-center mb-2 text-dark rounded-3">
              Task List
            </h1>
            <Button variant="primary" onClick={() => setShowModal(true)}>Add New Task</Button>
          </div>

          <Table bordered responsive hover className="text-center">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Task</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              { tasks.length > 0 ? (
                tasks.map((task,index) => (
                  <tr key={task.id}>
                    <td>{index+1}</td>
                    <td>
                      {editTaskId === task.id ? (
                        <Form.Control type="text" name="taskName" value={editData.taskName} onChange={handleEditChange} />
                      ) : (
                        task.taskName
                      )}
                    </td>
                    <td>
                      {editTaskId === task.id ? (
                        <Form.Control as="textarea" name="description" value={editData.description} onChange={handleEditChange} />
                      ) : (
                        task.description
                      )}
                    </td>
                    <td>{new Date(task.created_at).toLocaleDateString()}</td>
                    <td>{new Date(task.updated_at).toLocaleDateString()}</td>
                    <td>
                      {editTaskId === task.id ? (
                        <>
                          <Button variant="success" size="sm mx-1" onClick={() => handleEditSave(task.id)}>Save</Button>
                          <Button variant="secondary" size="sm" onClick={() => setEditTaskId(null)}>Cancel</Button>
                        </>
                      ) : (
                        <>
                          <Button variant="warning" size="sm mx-1" onClick={() => handleEdit(task)}>Edit</Button>
                          <Button variant="danger" size="sm" onClick={() => handleDelete(task.id)}>Delete</Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6">No tasks found.</td></tr>
              )}
            </tbody>
          </Table>
          <AddNewItemModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSave={() => {
              handleAddNewTask();
              setShowModal(false);
            }}
            title="Add New Task"
            formData={newTask}
            onChange={handleAddTaskChange}
            formFields={[
              { label: 'Task Name', name: 'taskName' },
              { label: 'Description', name: 'description', type: 'textarea' }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;
