import React from "react";
import Todo from "../todo/todo";
import paginate from "../../utils/paginate";

const todos = ({ todos, currentPage, pageSize, onDeleteTodo, onDoneTodo }) => {
  function displayTodos() {
    if (todos.length === 0)
      return (
        <h2
          className="d-flex justify-content-center align-items-center"
          style={{ height: "98vh" }}
        >
          No todos, Enjoy ;)
        </h2>
      );

    //     let sortedTodos = todos.sort(({ priority: p1 }, { priority: p2 }) => {
    //       p1 = parseInt(p1);
    //       p2 = parseInt(p2);
    //       if (p1 < p2) return -1;
    //       if (p1 > p2) return 1;
    //       return 0;
    //     });

    let paginatedTodos = paginate(todos, currentPage, pageSize);

    return paginatedTodos.map(todo => (
      <Todo
        todo={todo}
        key={todo.id}
        onDeleteTodo={onDeleteTodo}
        onDoneTodo={onDoneTodo}
      />
    ));
  }

  return <ul className="list-group list-group-flush">{displayTodos()}</ul>;
};

export default todos;
