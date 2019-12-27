import React, { Component } from "react";
import TodoTable from "./components/todoTable/todoTable";
import { todos } from "./services/fakeTodos";
class App extends Component {
  state = {
    todos: []
  };

  componentDidMount() {
    this.setState({ todos });
  }

  render() {
    const { todos } = this.state;

    return (
      <main className="container">
        <p>Showing {todos.length} number of todos for users</p>
        <TodoTable todos={todos} onDeleteTodo={this.handleDeleteTodo} />
      </main>
    );
  }

  //Handle events
  handleDeleteTodo = id => {
    const { todos } = this.state;

    let newTodos = todos.filter(todo => todo.id !== id);

    this.setState({ todos: newTodos });
  };
}

export default App;
