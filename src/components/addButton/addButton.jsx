import React from "react";
import { Link } from "react-router-dom";
import "./addButton.css";
const addButton = () => {
  return (
    <Link
      to="/todos/new"
      className="bg-danger text-light floating-btn m-5 d-flex justify-content-center align-items-center shadow"
    >
      <i className="fa fa-plus" aria-hidden="true"></i>
    </Link>
  );
};

export default addButton;
