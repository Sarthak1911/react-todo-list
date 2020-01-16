import React from "react";

import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-grow text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
