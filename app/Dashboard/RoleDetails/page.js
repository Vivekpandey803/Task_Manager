"use client";
import React from "react";
import { Table, Button, Form } from "react-bootstrap";
import SideBar from "@/components/core/SideBar";
import PageNav from "@/components/core/PageNav";
import AddNewItemModal from "@/components/core/AddNewItemModel";
import useRoleDetails from "@/hooks/PageHooks/useRoleHooks";

const RoleDetailsPage = () => {
  const {
    roles,
    editingRow,
    editingData,
    showAddRoleModal,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleAddRole,
    handleSave,
    handleEditChange,
    setShowAddRoleModal,
  } = useRoleDetails();

  const formFields = [
    {
      label: "Role Name",
      name: "role",
      placeholder: "Enter role name",
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
              Role Details
            </h1>
            <Button variant="primary" onClick={() => setShowAddRoleModal(true)}>
              Add New Role
            </Button>
          </div>
          <Table
            bordered
            responsive
            hover
            className="table table-bordered rounded-3 text-center"
          >
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.length > 0 ? (
                roles.map((role, index) => (
                  <tr key={role.id}>
                    <td>{index + 1}</td>
                    <td>
                      {editingRow === role.id ? (
                        <Form.Control
                          type="text"
                          name="role"
                          value={editingData.role}
                          onChange={handleEditChange}
                        />
                      ) : (
                        role.role
                      )}
                    </td>
                    <td>
                      {editingRow === role.id ? (
                        <>
                          <Button
                            variant="success"
                            size="sm mx-1"
                            onClick={handleSave}
                          >
                            Save
                          </Button>
                          <Button
                            variant="warning"
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
                            size="sm mx-1"
                            onClick={() => handleEdit(role)}
                          >
                            Update
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(role.id)}
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
                  <td colSpan="3">No roles found.</td>
                </tr>
              )}
            </tbody>
          </Table>
          <AddNewItemModal
            show={showAddRoleModal}
            onClose={() => setShowAddRoleModal(false)}
            onSave={() => handleAddRole(editingData)}
            title="Add New Role"
            formData={editingData}
            onChange={handleEditChange}
            formFields={formFields}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleDetailsPage;
