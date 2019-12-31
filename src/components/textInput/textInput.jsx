import React from "react";
const TextInput = ({ title, data, onChange, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={title} className="text-capitalize">
        {title}
      </label>
      <input
        type="text"
        className="form-control text-capitalize"
        id={title}
        placeholder={title}
        name={title}
        value={data.title}
        onChange={onChange}
      ></input>

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextInput;
