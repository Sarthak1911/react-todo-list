import React, { Component } from "react";
import Todos from "../todos/todos";
import Pagination from "../pagination/pagination";
import Filters from "../filters/filters";
import Sidebar from "../sidebar/sidebar";
import AddButton from "../addButton/addButton";
import { getAllTasks, deleteTask } from "../../services/fakeTodos";
import { filters } from "../../services/fakeFilter";

import "./home.css";

class Home extends Component {
  state = {
    todos: [],
    filters: [],
    pageSize: 0,
    currentPage: 1,
    selectedFilters: []
  };

  componentDidMount() {
    //Get rid of the magic number
    let pageSize = Math.floor(window.screen.height / 150);

    this.setState({ todos: getAllTasks(), filters, pageSize });
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
        <Sidebar className="position-fixed floating sidebar p-4 bg-light">
          <Filters
            filters={filters}
            selectedFiltersLength={selectedFilters.length}
            onSelectFilter={this.handleSelectFilter}
            onClearAll={this.handleClearAll}
          />
        </Sidebar>
        <main>
          <Todos
            todos={this.filterTodos(todos)}
            pageSize={pageSize}
            currentPage={currentPage}
            onDeleteTodo={this.handleDeleteTodo}
            onDoneTodo={this.handleDoneTodo}
            selectedFilters={selectedFilters}
          />
        </main>
        <Pagination
          itemsCount={this.filterTodos().length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageSelect={this.handlePageSelect}
        />
        <AddButton />
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
    const { pageSize } = this.state;

    let { currentPage } = this.state;

    deleteTask(id);

    //Refresh the list
    const todos = getAllTasks();

    //Change page to previous if the one task on the page was deleted
    if (todos.length % pageSize === 0) --currentPage;

    this.setState({ todos: todos, currentPage });
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

  handleDoneTodo = id => {
    const { todos } = this.state;

    const todoIndex = todos.findIndex(todo => todo.id === id);

    todos[todoIndex].isDone = !todos[todoIndex].isDone;

    this.setState({ todos });
  };
}

export default Home;
