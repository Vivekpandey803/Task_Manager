"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "@/components/core/SideBar";
import PageNav from "@/components/core/PageNav";
import useEmployeeManagement from "@/hooks/PageHooks/UseEmployeeAttendence";
import { Button, Table, Form } from "react-bootstrap";

import Link from "next/link";
import pageRoutes from "@/util/PageRoutes";
const EmployeeDetailsPage = () => {
  const { employees, selectedEmployee, handleViewDetails } =
    useEmployeeManagement();

  return (
    <div>
      <PageNav />
      <div className="d-flex">
        <SideBar />
        <div className="container my-2 p-2">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h1 className="fs-3 mx-4 fw-bold shadow-lg text-center mb-2 text-black rounded">
              Employee Details
            </h1>
          </div>
          <table className="table table-bordered rounded text-center">
            <thead className="table-dark">
              <tr>
                <th>S.No</th>
                <th>Employee Name</th>
                <th>Email</th>
                <th>Attendance Details</th>
              </tr>
            </thead>
            <tbody>
              {employees.length > 0 ? (
                employees.map((employee, index) => (
                  <tr key={employee.id}>
                    <td>{index + 1}</td>
                    <td>{employee.employee_name}</td>
                    <td>{employee.email}</td>

                    <td>
                      <td>
                        <Link href={pageRoutes.ATTENDANCEDETAIL_PAGE()}>
                          <Button variant="info" size="sm mx-1">
                            Attendance Details
                          </Button>
                        </Link>
                      </td>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;
