import React from "react";
const Input = ({ name, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="text-capitalize">
        {name}
      </label>
      <input
        name={name}
        {...rest}
        className="form-control text-capitalize"
        id={name}
        placeholder={name}
      ></input>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
