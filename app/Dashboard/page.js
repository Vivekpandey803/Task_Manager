"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import SideBar from "@/components/core/SideBar";
import PageNav from "@/components/core/PageNav";
import Link from "next/link";
import pageRoutes from "@/util/PageRoutes";
import '@/styles/global.scss';

import CardComponent from "@/components/core/CardComponent";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [employeeCount, setEmployeeCount] = useState(0);
  const [taskCount, setTaskCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [roleCount, setRoleCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employees, tasks, projects, roles] = await Promise.all([
          axios.get("http://localhost:3000/employee"),
          axios.get("http://localhost:3000/task"),
          axios.get("http://localhost:3000/project"),
          axios.get("http://localhost:3000/role"),
        ]);

        setEmployeeCount(employees.data.length);
        setTaskCount(tasks.data.length);
        setProjectCount(projects.data.length);
        setRoleCount(roles.data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const barData = {
    labels: ["Employees", "Tasks", "Projects", "Roles"],
    datasets: [
      {
        label: "Overview",
        data: [employeeCount, taskCount, projectCount, roleCount],
        backgroundColor: ["#black", "#82ca9d", "#ffc658", "#d0ed57"],
        borderColor: ["#8884d8", "#82ca9d", "#ffc658", "#d0ed57"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="d-grid flex-column min-vh-90">
      <PageNav />
      <div className="d-flex flex-grow-1">
        <SideBar />
        <div className="container div2  flex-grow-1">
          <div  style={{ display: "ruby-text" }}>
          <Link href={pageRoutes.RESOURCE_PAGE()}>

            <CardComponent title="Total Employees" count={employeeCount} bgColor="bg-primary"/>
            </Link>
            
            <Link href={pageRoutes.TASK_LIST_PAGE()}>

            <CardComponent title="Total Tasks" count={taskCount} bgColor="bg-success" />
            </Link>

            <Link href={pageRoutes.PROJECT_PAGE()}>

            <CardComponent title="Total Projects" count={projectCount} bgColor="bg-danger" />
            </Link>

            <Link href={pageRoutes.ROLE_PAGE()}>

            <CardComponent title="Total Roles" count={roleCount} bgColor="bg-warning" />
            </Link>

          </div>
          <div className="row text-center mx-5">
            <div className="col-md-12  mx-5">
              <div className="card shadow-sm w-75 text-center mx-5 justify-content-center">
                <div className="card-body text-center">
                  <h5 className="card-title text-center">Overview</h5>
                  <div style={{ height: "340px" }}>
                    <Bar className="text-center mx-4" data={barData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
