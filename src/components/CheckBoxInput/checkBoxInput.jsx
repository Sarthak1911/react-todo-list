import React from "react";
const CheckBoxInput = ({ label, name, value, ...rest }) => {
  return (
    <div>
      <input
        name={name}
        {...rest}
        className="text-capitalize m-1"
        id={name}
        checked={value}
        type="checkbox"
      ></input>
      <label htmlFor={name} className="text-capitalize">
        {label || name}
      </label>
    </div>
  );
};

export default CheckBoxInput;
