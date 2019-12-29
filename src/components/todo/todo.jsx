import React from "react";
const todo = ({ todo, onDeleteTodo }) => {
  const { id, title, priority } = todo;

  function getTodoClass() {
    if (priority === 1) return "list-group-item-danger";
    if (priority === 2) return "list-group-item-warning";
    if (priority === 3) return "list-group-item-light";
    if (priority === 4) return "list-group-item-secondary";
  }

  return (
    <li
      className={
        "shadow border rounded m-2 card list-group-item " + getTodoClass()
      }
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <h2> {title} </h2>
        <button className="btn btn-danger" onClick={() => onDeleteTodo(id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default todo;
