import React, { useState } from "react";
import Link from "next/link";
import pageRoutes from "@/util/PageRoutes";
import "@/styles/global.scss";
import icons from "@/env/icons";
import "@/styles/page.styles.scss";

export default function SideBar() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    if (activeButton !== buttonName) {
      setActiveButton(buttonName);
    }
  };

  const buttonClass = (buttonName) =>
    `btn sidebtn m-1 fs-6 w-100 text-start ${
      activeButton === buttonName ? "bg-black text-white" : "bg-white text-dark"
    }`;

  return (
    <div
      className="bg-light border-end"
      style={{ width: "240px", height: "100vh" }}
    >
      <img className="HomeIcons" src={icons.HOME} alt="logo" />

      <span className="p-1 m-2 text-center fs-5">Task Tracker</span>
      <ul className="nav flex-column m-1">
        <li className="nav-item d-flex align-items-center">
          <img className="sideIcons me-2" src={icons.IMGDASH} alt="logo" />
          <Link href={pageRoutes.DASHBOARD_PAGE()}>
            <button
              type="button"
              className={buttonClass("Dashboard")}
              onClick={() => handleButtonClick("Dashboard")}
            >
              Dashboard
            </button>
          </Link>
        </li>
        <li className="nav-item d-flex align-items-center">
          <img className="sideIcons me-2" src={icons.DETAIL} alt="logo" />
          <Link href={pageRoutes.RESOURCE_PAGE()}>
            <button
              type="button"
              className={buttonClass("Employee")}
              onClick={() => handleButtonClick("Employee")}
            >
              Employee
            </button>
          </Link>
        </li>
        <li className="nav-item d-flex align-items-center">
          <img className="sideIcons me-2" src={icons.DETAIL} alt="logo" />
          <Link href={pageRoutes.ROLE_PAGE()}>
            <button
              type="button"
              className={buttonClass("Role")}
              onClick={() => handleButtonClick("Role")}
            >
              Role
            </button>
          </Link>
        </li>
        <li className="nav-item d-flex align-items-center">
          <img className="sideIcons me-2" src={icons.DETAIL} alt="logo" />
          <Link href={pageRoutes.PROJECT_PAGE()}>
            <button
              type="button"
              className={buttonClass("Project")}
              onClick={() => handleButtonClick("Project")}
            >
              Project
            </button>
          </Link>
        </li>
        <li className="nav-item d-flex align-items-center">
          <img className="sideIcons me-2" src={icons.TASK} alt="logo" />
          <Link href={pageRoutes.TASK_LIST_PAGE()}>
            <button
              type="button"
              className={buttonClass("Task List")}
              onClick={() => handleButtonClick("Task List")}
            >
              Task List
            </button>
          </Link>
        </li>
        <li className="nav-item d-flex align-items-center">
          <img className="sideIcons me-2" src={icons.TRACKER} alt="logo" />
          <Link href={pageRoutes.TASK_TRACKER()}>
            <button
              type="button"
              className={buttonClass("Task Track")}
              onClick={() => handleButtonClick("Task Track")}
            >
              Task Track
            </button>
          </Link>
        </li>
        {/* <li className="nav-item d-flex align-items-center">
          <img className="sideIcons me-2" src={icons.TRACKER} alt="logo" />
          <Link href={pageRoutes.ASSIGNPROJECT_PAGE()}>
            <button
              type="button"
              className={buttonClass("Task Track")}
              onClick={() => handleButtonClick("Task Track")}
            >
Assign Project            </button>
          </Link>
        </li> */}
        <li className="nav-item d-flex align-items-center">
          <img className="sideIcons me-2" src={icons.ATTENDANCE} alt="logo" />
          <Link href={pageRoutes.ATTENDANCE_PAGE()}>
            <button
              type="button"
              className={buttonClass("Attendance")}
              onClick={() => handleButtonClick("Attendance")}
            >
              Attendance
            </button>
          </Link>
        </li>
      </ul>
    </div>
  );
}
