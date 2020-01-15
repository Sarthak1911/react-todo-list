import React, { Component } from "react";
import axios from "axios";
import firebase from "../../services/firebase/config";
import Todos from "../todos/todos";
import Pagination from "../pagination/pagination";
import Filters from "../filters/filters";
import Sidebar from "../sidebar/sidebar";
import AddButton from "../addButton/addButton";
import { getAllTasks, deleteTask, updateTask } from "../../services/tasks";
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

  async componentDidMount() {
    //Get rid of the magic number
    let pageSize = Math.floor(window.screen.height / 180);

    this.setState({ todos: await getAllTasks(), filters, pageSize });
  }

  filterTodos() {
    const { selectedFilters, todos } = this.state;

    let processedTodos = [];

    if (selectedFilters.length === 0) return todos;

    for (let selectedFilter of selectedFilters) {
      for (let todo of todos) {
        if (parseInt(todo.priority) === selectedFilter.value)
          processedTodos.push(todo);
      }
    }

    return processedTodos;
  }

  //Handle events
  handleDeleteTodo = async id => {
    const {
      pageSize,
      todos: originalTodos,
      currentPage: originalCurrentPage
    } = this.state;

    let { currentPage, todos } = this.state;

    //Delete at client
    //Refresh the list
    todos = todos.filter(todo => todo.id !== id);
    //Change page to previous if the one task on the page was deleted
    if (todos.length % pageSize === 0) --currentPage;
    //Update the state if no errors
    this.setState({ todos: todos, currentPage });

    try {
      //Delete at server
      await deleteTask(id);
    } catch (error) {
      alert("Something went wrong");
      //If errors, revert
      this.setState({ todos: originalTodos, currentPage: originalCurrentPage });
    }
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

  handleDoneTodo = async id => {
    const { todos } = this.state;

    const originalTodos = [...todos];

    //Update the cilent
    let taskId = todos.findIndex(todo => todo.id === id);

    if (taskId < 0) return;

    todos[taskId] = { ...todos[taskId], isDone: !todos[taskId].isDone };

    console.log("new");
    console.log(todos);

    this.setState({ todos });

    try {
      //Update the server
      await updateTask(id, todos[taskId]);
    } catch (error) {
      alert("Something went wrong");
      console.log("old");
      console.log(originalTodos);
      this.setState({ todos: originalTodos });
    }
  };

  handleSearch = async e => {
    this.setState({ todos: await getAllTasks(e.currentTarget.value) });
  };

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
          <div className="form-group m-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={this.handleSearch}
            />
          </div>
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
}

export default Home;
