import React from "react";
import OpenButton from "./../OpenButton/openButton";
import "./sidebar.css";

const sidebar = ({ children }) => {
  const sidebarRef = React.createRef();

  const handleToggleSidebar = () => {
    const { current: sidebar } = sidebarRef;

    if (sidebar.classList.contains("sidebar-open")) {
      sidebar.classList.remove("sidebar-open");
      sidebar.classList.add("sidebar-close");
      return;
    }

    if (sidebar.classList.contains("sidebar-close")) {
      sidebar.classList.remove("sidebar-close");
      sidebar.classList.add("sidebar-open");
    }
  };

  return (
    <React.Fragment>
      <div
        className="sidebar floating p-4 bg-light sidebar-close"
        ref={sidebarRef}
      >
        <div className="mobile-toggle-btn">
          <div className="d-flex justify-content-end">
            <button
              className="btn text-secondary"
              onClick={handleToggleSidebar}
            >
              <i className="fa fa-chevron-left fa-lg" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <span className="h5 text-uppercase">Filters</span>
        <hr />
        {children}
      </div>
      <OpenButton onToggleSidebar={handleToggleSidebar} />
    </React.Fragment>
  );
};

export default sidebar;
