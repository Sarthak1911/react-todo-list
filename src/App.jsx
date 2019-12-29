import React, { Component } from "react";
import Todos from "./components/todos/todos";
import Pagination from "./components/pagination/pagination";
import Filters from "./components/filters/filters";
import { todos } from "./services/fakeTodos";
import { filters } from "./services/fakeFilter";
import "./App.css";
class App extends Component {
  state = {
    todos: [],
    filters: [],
    pageSize: 7,
    currentPage: 1,
    selectedFilters: []
  };

  componentDidMount() {
    this.setState({ todos, filters });
  }

  render() {
    const {
      todos,
      filters,
      pageSize,
      currentPage,
      selectedFilters
    } = this.state;

    return (
      <React.Fragment>
        <div className="floating position-fixed m-4">
          <Filters
            filters={filters}
            selectedFiltersLength={selectedFilters.length}
            onSelectFilter={this.handleSelectFilter}
            onClearAll={this.handleClearAll}
          />
        </div>
        <main className="container p-2">
          <Todos
            todos={this.filterTodos(todos)}
            pageSize={pageSize}
            currentPage={currentPage}
            onDeleteTodo={this.handleDeleteTodo}
            selectedFilters={selectedFilters}
          />
        </main>
        <Pagination
          itemsCount={this.filterTodos().length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageSelect={this.handlePageSelect}
        />
      </React.Fragment>
    );
  }

  filterTodos() {
    const { selectedFilters, todos } = this.state;

    let processedTodos = [];

    if (selectedFilters.length === 0) return todos;

    for (let selectedFilter of selectedFilters) {
      for (let todo of todos) {
        if (todo.priority === selectedFilter.value) processedTodos.push(todo);
      }
    }

    return processedTodos;
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

  handleSelectFilter = (filter, e) => {
    let { selectedFilters } = this.state;

    if (e.target.classList.contains("active"))
      e.target.classList.remove("active");

    //Check if the filter is present
    let isPresent = selectedFilters.find(
      selectedFilter => selectedFilter === filter
    );

    //If the filter is absent and there are no selected filters
    if (!isPresent && selectedFilters.length >= 0) {
      selectedFilters = [...selectedFilters, filter];
      e.target.classList.add("active");
    }

    //If the filter is present remove it on button click
    if (isPresent) {
      selectedFilters = selectedFilters.filter(
        selectedFilter => selectedFilter !== isPresent
      );
    }

    this.setState({ selectedFilters, currentPage: 1 });
  };

  handleClearAll = e => {
    //Reset the selectedFilters
    //Set currentPage to 1
    const filters = e.target.parentElement.childNodes;

    for (let filter of filters) {
      if (filter.classList.contains("active"))
        filter.classList.remove("active");
    }

    this.setState({ selectedFilters: [], currentPage: 1 });
  };
}

export default App;
