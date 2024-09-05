"use client";

import React from "react";
import { Button, Table, Form } from "react-bootstrap";
import SideBar from "@/components/core/SideBar";
import PageNav from "@/components/core/PageNav";
import AddNewItemModal from "@/components/core/AddNewItemModel";
import useProjectActions from "@/hooks/PageHooks/useProjectHooks";

const ProjectDetailsPage = () => {
  const {
    projects,
    showModal,
    setShowModal,
    newProjectData,
    editData,
    editingRow,
    handleEdit,
    handleDelete,
    handleAddNewProject,
    handleEditSave,
    handleNewProjectChange,
    handleEditChange,
    formatDate,
    setEditingRow,
  } = useProjectActions();

  const formFields = [
    {
      label: "Project Name",
      name: "project",
      placeholder: "Enter project name",
    },
  ];

  return (
    <div>
      <PageNav />
      <div className="d-flex">
        <SideBar />
        <div className="container my-2 p-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h1 className="fs-3 mx-4 fw-bold shadow-lg text-center mb-2 text-dark rounded-3">
              Project Details
            </h1>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Add New Project
            </Button>
          </div>
          <Table bordered responsive hover className="table text-center">
            <thead className="table-dark">
              <tr>
                <th>S. No</th>
                <th>Project</th>
                <th>Created Date</th>
                <th>Updated Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <tr key={project.id}>
                    <td>{index + 1}</td>
                    <td>
                      {editingRow === project.id ? (
                        <Form.Control
                          type="text"
                          name="project"
                          value={editData.project}
                          onChange={handleEditChange}
                        />
                      ) : (
                        project.project
                      )}
                    </td>
                    <td>{formatDate(project.created_at)}</td>
                    <td>{formatDate(project.updated_at)}</td>
                    <td>
                      {editingRow === project.id ? (
                        <>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => handleEditSave(project.id)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setEditingRow(null)}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() => handleEdit(project)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(project.id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No project found.</td>
                </tr>
              )}
            </tbody>
          </Table>

          <AddNewItemModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleAddNewProject}
            title="Add New Project"
            formData={newProjectData}
            onChange={handleNewProjectChange}
            formFields={formFields}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
