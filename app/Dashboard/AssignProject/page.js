import React from 'react';
import { useAssignProject } from './useAssignProject';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssignProjectPage = () => {
    const {
        projects,
        loading,
        error,
        newProject,
        handleInputChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        editingProject,
        resetEditing
    } = useAssignProject();

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Assigned Projects</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            <div className="row">
                <div className="col">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Serial No</th>
                                <th>Employee Name</th>
                                <th>Project</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((proj, index) => (
                                <tr key={proj.id}>
                                    <td>{index + 1}</td>
                                    <td>{proj.employee_name}</td>
                                    <td>{proj.project}</td>
                                    <td>{proj.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm mr-2"
                                            onClick={() => handleEdit(proj)}>
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(proj.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="col-md-4">
                    <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                    <form>
                        <div className="form-group">
                            <label>Employee Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="employee_name"
                                value={newProject.employee_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Project</label>
                            <input
                                type="text"
                                className="form-control"
                                name="project"
                                value={newProject.project}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <input
                                type="text"
                                className="form-control"
                                name="role"
                                value={newProject.role}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-success mt-3"
                            onClick={handleSubmit}>
                            {editingProject ? 'Update Project' : 'Add Project'}
                        </button>
                        {editingProject && (
                            <button
                                type="button"
                                className="btn btn-secondary mt-3 ml-3"
                                onClick={resetEditing}>
                                Cancel Edit
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssignProjectPage;
