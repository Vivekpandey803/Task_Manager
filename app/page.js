"use client";

import React from "react";
import Header from "@/components/core/Header";
import "bootstrap/dist/css/bootstrap.min.css";
const Home = () => {
  return (<>
            <Header/>

  
    <div className="text-center mt-5 pt-5">
    <div className="text-center mt-5 ">

      <h1 className="Welcome fs-1 fw-bold shadow-lg p-4 mb-5 text-center bg-blue text-dark rounded">
        Welcome to Task Tracker Application

      </h1>
    </div>
    </div>
    </>
  );
};

export default Home;