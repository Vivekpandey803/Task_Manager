"use client"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEmployees } from '@/hooks/PageHooks/useEmployeeHooks';
import EmployeeDetailModal from '@/components/PageComponent/EmployeeDetailModel';
import SideBar from '@/components/core/SideBar';
import PageNav from '@/components/core/PageNav';
const EmployeeDetailsPage = () => {
  const {
    employees,
    editingEmployee,
    editedData,
    startEditing,
    cancelEditing,
    handleInputChange,
    saveChanges,
    deleteEmployeeById,
  } = useEmployees();

  return (
    <div>
    <PageNav />
    <div className="d-flex">
      <SideBar />
      <div className="container my-2 p-2">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h1 className="fs-3 mx-4 fw-bold shadow-lg text-center mb-2 text-dark rounded-3">
            Employee Details
          </h1>
        </div>
        <table bordered responsive hover className="table table-bordered rounded-3 text-center">
          <thead className="table-dark">
          <tr className='text-light'>
            <th>S.No</th>
            <th>Employee Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={emp.id}>
              <th scope="row">{index + 1}</th>
              <td>
                {editingEmployee === emp.id ? (
                  <input
                    className="form-control"
                    name="employee_name"
                    value={editedData.employee_name}
                    onChange={handleInputChange}
                  />
                ) : (
                  emp.employee_name
                )}
              </td>
              <td>
                {editingEmployee === emp.id ? (
                  <input
                    className="form-control"
                    name="email"
                    value={editedData.email}
                    onChange={handleInputChange}
                  />
                ) : (
                  emp.email
                )}
              </td>
              <td>
                {editingEmployee === emp.id ? (
                  <input
                    className="form-control"
                    name="phone"
                    value={editedData.phone}
                    onChange={handleInputChange}
                  />
                ) : (
                  emp.phone
                )}
              </td>
              <td>
                {editingEmployee === emp.id ? (
                  <>
                    <button className="btn btn-success me-2 mx-2" onClick={saveChanges}>
                      Save
                    </button>
                    <button className="btn btn-secondary" onClick={cancelEditing}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button className="btn btn-primary mx-2" onClick={() => startEditing(emp)}>
                    Edit
                  </button>
                )}
                <EmployeeDetailModal employee={emp} />


                <button className="btn btn-danger mx-2" onClick={() => deleteEmployeeById(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
    </div>
    </div>
  );
};

export default EmployeeDetailsPage;
