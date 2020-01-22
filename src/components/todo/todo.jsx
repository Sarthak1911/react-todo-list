import React from "react";
import { Link } from "react-router-dom";
import "./todo.css";
const todo = ({ todo, onDeleteTodo, onDoneTodo }) => {
  const { id, title, isDone } = todo;
  let { priority } = todo;

  function getTodoClass() {
    priority = parseInt(priority);

    if (priority === 1) return "list-group-item-danger";
    if (priority === 2) return "list-group-item-warning";
    if (priority === 3) return "list-group-item-light";
    if (priority === 4) return "list-group-item-secondary";
  }

  //   function getTodoTextClass() {
  //     if (priority === 1) return "danger";
  //     if (priority === 2) return "warning";
  //     if (priority === 3) return "light";
  //     if (priority === 4) return "secondary";
  //   }

  return (
    <li
      className={
        "shadow border rounded m-2 card list-group-item " + getTodoClass()
      }
    >
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-end">
          {!isDone ? (
            <button className="btn btn-link m-0 pt-0 pb-0">
              <i
                className="fa fa-lg fa-square-o text-dark"
                onClick={() => onDoneTodo(id)}
              ></i>
            </button>
          ) : (
            <button className="btn btn-link m-0 pt-0 pb-0">
              <i className="fa fa-lg fa-check text-dark"></i>
            </button>
          )}
          <span className={isDone ? "line-through" : ""}>
            <Link className="a-link text-dark" to={"/todos/" + id}>
              {title}
            </Link>
          </span>
        </div>
        <button className="btn btn-danger m-1" onClick={() => onDeleteTodo(id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default todo;
