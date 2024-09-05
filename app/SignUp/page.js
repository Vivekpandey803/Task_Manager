"use client";

import React, { useState } from "react";
import InputWithLabel from "@/components/core/Input/InputWithLabel";
import { Modal, Button } from "react-bootstrap";
import pageRoutes from "@/util/PageRoutes";
import Link from "next/link";

export default function SignUp() {
  const [formData, setFormData] = useState({
    employee_name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up. Please try again.");
      }

      const result = await response.json();
      setSuccessMessage("User created successfully!");
      setShowModal(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setShowModal(false);
  return (
    <section className="vh-95 gradient-custom">
      <div className="container py-3 h-80">
        <div className="row d-flex justify-content-center align-items-center h-90">
          <div className="card bg-light bg-opacity-50  col-lg-2 col-xl-5">
            <div className="card-body  text-center ">
              <div className="container text-black-100">
                <h1 className="fs-1 m-1">Sign Up </h1>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleSubmit}>
                  <InputWithLabel
                    fields={{
                      type: "text",
                      label: "Employee Name",
                      placeholder: "Enter your name",
                      name: "employee_name",
                      isRequired: true,
                    }}
                    state={formData}
                    onChangeHandler={handleChange}
                  />

                  <InputWithLabel
                    fields={{
                      type: "text",
                      label: "Phone",
                      placeholder: "Enter your phone number",
                      name: "phone",
                      isRequired: true,
                    }}
                    state={formData}
                    onChangeHandler={handleChange}
                  />

                  <InputWithLabel
                    fields={{
                      type: "email",
                      label: "Email",
                      placeholder: "Enter your email",
                      name: "email",
                      isRequired: true,
                    }}
                    state={formData}
                    onChangeHandler={handleChange}
                  />

                  <InputWithLabel
                    fields={{
                      type: "password",
                      label: "Password",
                      placeholder: "Enter your password",
                      name: "password",
                      isRequired: true,
                    }}
                    state={formData}
                    onChangeHandler={handleChange}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary mt-4"
                    disabled={loading}
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Link href={pageRoutes.SIGN_IN_PAGE()}>
            <Button variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
