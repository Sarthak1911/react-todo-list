import React from "react";
const sidebar = props => {
  return (
    <div className="position-fixed floating sidebar p-4 bg-light">
      {props.children}
    </div>
  );
};

export default sidebar;
