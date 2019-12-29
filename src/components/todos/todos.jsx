import React from "react";
import Todo from "../todo/todo";
import paginate from "../../utils/paginate";

const todos = ({ todos, currentPage, pageSize, onDeleteTodo }) => {
  function displayTodos() {
    if (todos.length === 0) return "No todos to display";

    let paginatedTodos = paginate(todos, currentPage, pageSize);

    return paginatedTodos.map(todo => (
      <Todo todo={todo} key={todo.id} onDeleteTodo={onDeleteTodo} />
    ));
  }

  return <ul className="list-group list-group-flush">{displayTodos()}</ul>;
};

export default todos;
