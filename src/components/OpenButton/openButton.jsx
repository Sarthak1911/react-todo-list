import React from "react";

import "./openButton.css";

const openButton = ({ onToggleSidebar }) => {
  return (
    <a
      href="#"
      className="bg-dark floating-btn-open text-light d-flex justify-content-center align-items-center shadow"
      onClick={onToggleSidebar}
    >
      <i className="fa fa-bars" aria-hidden="true"></i>
    </a>
  );
};

export default openButton;
