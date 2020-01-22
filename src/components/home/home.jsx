import React, { Component } from "react";
import Todos from "../todos/todos";
import Pagination from "../pagination/pagination";
import Filters from "../filters/filters";
import Sidebar from "../sidebar/sidebar";
import AddButton from "../addButton/addButton";
import Spinner from "./../Spinner/spinner";
import { getAllTasks, deleteTask, updateTask } from "../../services/tasks";
import { filters } from "../../services/fakeFilter";

import "./home.css";

class Home extends Component {
  state = {
    todos: [],
    filters: [],
    pageSize: 0,
    currentPage: 1,
    selectedFilters: [],
    showSpinner: true
  };

  async componentDidMount() {
    //Get rid of the magic number
    let pageSize = Math.ceil(window.screen.height / 180);

    this.setState({
      todos: await getAllTasks(),
      filters,
      pageSize,
      showSpinner: false
    });
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
    this.setState({ showSpinner: true });

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
    this.setState({ todos: todos, currentPage, showSpinner: false });

    try {
      //Delete at server
      await deleteTask(id);
    } catch (error) {
      alert("Something went wrong");
      //If errors, revert
      this.setState({
        todos: originalTodos,
        currentPage: originalCurrentPage,
        showSpinner: false
      });
    }
  };

  handlePageSelect = page => {
    this.setState({ currentPage: page });
  };

  handleSelectFilter = (filter, e) => {
    this.setState({ showSpinner: true });
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

    this.setState({ selectedFilters, currentPage: 1, showSpinner: false });
  };

  handleClearAll = e => {
    this.setState({ showSpinner: true });
    //Reset the selectedFilters
    //Set currentPage to 1
    const filters = e.target.parentElement.childNodes;

    for (let filter of filters) {
      if (filter.classList.contains("active"))
        filter.classList.remove("active");
    }

    this.setState({ selectedFilters: [], currentPage: 1, showSpinner: false });
  };

  handleDoneTodo = async id => {
    this.setState({ showSpinner: true });

    const { todos } = this.state;

    const originalTodos = [...todos];

    //Update the cilent
    let taskId = todos.findIndex(todo => todo.id === id);

    if (taskId < 0) return;

    todos[taskId] = { ...todos[taskId], isDone: !todos[taskId].isDone };

    this.setState({ todos, showSpinner: false });

    try {
      //Update the server
      await updateTask(id, todos[taskId]);
    } catch (error) {
      alert("Something went wrong");
      this.setState({ todos: originalTodos, showSpinner: false });
    }
  };

  handleSearch = async e => {
    this.setState({ showSpinner: true });
    this.setState({
      todos: await getAllTasks(e.currentTarget.value),
      showSpinner: false
    });
  };

  showContent = () => {
    const {
      todos,
      filters,
      pageSize,
      currentPage,
      selectedFilters,
      showSpinner
    } = this.state;

    return (
      <React.Fragment>
        <Sidebar>
          <Filters
            filters={filters}
            selectedFiltersLength={selectedFilters.length}
            onSelectFilter={this.handleSelectFilter}
            onClearAll={this.handleClearAll}
          />
        </Sidebar>
        <nav
          className="d-flex bg-white justify-content-center navbar navbar-light fixed-top pt-3"
          style={{ zIndex: "99" }}
        >
          <input
            type="text"
            className="form-control col-lg-7 col-md-8 col-sm-10 shadow"
            placeholder="Search..."
            onChange={this.handleSearch}
          />
        </nav>
        <main>
          <div className="d-flex justify-content-center form-group m-2">
            <AddButton />
          </div>
          {showSpinner ? (
            <Spinner />
          ) : (
            <Todos
              todos={this.filterTodos(todos)}
              pageSize={pageSize}
              currentPage={currentPage}
              onDeleteTodo={this.handleDeleteTodo}
              onDoneTodo={this.handleDoneTodo}
              selectedFilters={selectedFilters}
            />
          )}
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
  };

  render() {
    return this.showContent();
  }
}

export default Home;
