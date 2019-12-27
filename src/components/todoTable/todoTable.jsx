import React from "react";
import Todo from "../todo/todo";
const todoTable = ({ todos, onDeleteTodo }) => {
  const displayTodos = () => {
    if (todos.length === 0) return "No todos to display";
    return todos.map(todo => (
      <Todo todo={todo} key={todo.id} onDeleteTodo={onDeleteTodo} />
    ));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>User</th>
          <th></th>
        </tr>
      </thead>
      <tbody>{displayTodos()}</tbody>
    </table>
  );
};

export default todoTable;
