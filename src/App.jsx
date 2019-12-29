import React, { Component } from "react";
import Todos from "./components/todos/todos";
import Pagination from "./components/pagination/pagination";
import { todos } from "./services/fakeTodos";
class App extends Component {
  state = {
    todos: [],
    pageSize: 7,
    currentPage: 1
  };

  componentDidMount() {
    this.setState({ todos });
  }

  render() {
    const { todos, pageSize, currentPage } = this.state;

    return (
      <React.Fragment>
        <main className="container p-2">
          <Todos
            todos={todos}
            pageSize={pageSize}
            currentPage={currentPage}
            onDeleteTodo={this.handleDeleteTodo}
          />
        </main>
        <Pagination
          itemsCount={todos.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageSelect={this.handlePageSelect}
        />
      </React.Fragment>
    );
  }

  //Handle events
  handleDeleteTodo = id => {
    const { todos, pageSize } = this.state;

    let { currentPage } = this.state;

    let newTodos = todos.filter(todo => todo.id !== id);

    if (newTodos.length % pageSize === 0) --currentPage;

    this.setState({ todos: newTodos, currentPage });
  };

  handlePageSelect = page => {
    this.setState({ currentPage: page });
  };
}

export default App;
