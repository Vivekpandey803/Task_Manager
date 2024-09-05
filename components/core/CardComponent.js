// components/CardComponent.js
import React from "react";

const CardComponent = ({ title, count, bgColor }) => {
  return (
    <div className="col-md-3 mb-3 mt-2 ">
      <div className="card shadow-sm mx-3">
        <div className={`card-body ${bgColor} text-white bg-gradient`}>
          <h5 className="card-title fw-bold text-center">{title}</h5>
          <p className="card-text display-3 text-center text-light">{count}</p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
