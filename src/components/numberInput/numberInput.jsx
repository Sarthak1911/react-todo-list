import React from "react";
const NumberInput = ({ title, data, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={title} className="text-capitalize">
        {title}
      </label>
      <input
        id={title}
        type="number"
        className="form-control text-capitalize"
        name={title}
        value={data.priority}
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default NumberInput;
