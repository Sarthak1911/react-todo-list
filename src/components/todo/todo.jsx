import React from "react";
const todo = ({ todo, onDeleteTodo }) => {
  const { id, title, createdBy, priority } = todo;

  //User defined functions
  function getTodoClass() {
    if (priority === 1) return "table-danger";
    if (priority === 2) return "table-warning";
    if (priority === 3) return "table-info";
    if (priority === 4) return "table-primary";
  }

  return (
    <tr className={getTodoClass()}>
      <td>
        <span className="font-weight-bold"> {title} </span>
      </td>
      <td>{createdBy}</td>
      <td>
        <button className="btn btn-danger" onClick={() => onDeleteTodo(id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default todo;
