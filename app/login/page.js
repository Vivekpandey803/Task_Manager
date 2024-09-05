"use client";

import React, { useState } from "react";
import pageRoutes from "@/util/PageRoutes";
import Link from "next/link";
import InputWithLabel from "@/components/core/Input/InputWithLabel"; 

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3000/userLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = pageRoutes.DASHBOARD_PAGE();
      } else {
        setError(data.message || "Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="vh-95 gradient-custom mt-5">
      <div className="container py-3 h-80 mt-5">
        <div className="row d-flex justify-content-center align-items-center h-90">
          <div className="card bg-light bg-opacity-50 col-10 col-md-5 col-lg-5">
            <div className="card-body text-center">
              <h2 className="text-black-100 mb-2 mt-2 fs-1">LOGIN</h2>
              <p className="text-black-100 mb-3">Please enter your login and password!</p>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleLogin}>
                <InputWithLabel
                  fields={{
                    type: "email",
                    label: "Email",
                    placeholder: "Enter your email",
                    name: "email",
                    isRequired: true,
                  }}
                  state={state}
                  onChangeHandler={handleChange}
                />
                <div className="mt-4"></div>
                <InputWithLabel
                  fields={{
                    type: "password",
                    label: "Password",
                    placeholder: "Enter your password",
                    name: "password",
                    isRequired: true,
                  }}
                  state={state}
                  onChangeHandler={handleChange}
                />
                <button type="submit" className="btn btn-primary mt-4">
                  Login
                </button>
                <div>
                  <p className="mt-2">
                    If you don't have an account, please{" "}
                    <Link href={pageRoutes.SIGN_UP_PAGE()}>
                      <button type="button" className="btn btn-link btn-sm p-1 mt-1 mx-1">
                        Create Profile
                      </button>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
