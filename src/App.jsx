import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Done from "./components/done/done";
import TodoDetails from "./components/todoDetails/todoDetails";
import NotFound from "./components/notFound/notFound";
import CreateTodoForm from "./components/CreateTodoForm/createTodoForm";
import "./App.css";

class App extends Component {
  state = {};

  render() {
    return (
      <div className="content container p-2">
        {/* From most specific to most generic */}
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/done" exact component={Done} />
          <Route path="/todos/:id" exact component={TodoDetails} />
          <Route path="/not-found" exact component={NotFound} />
          <Route path="/new-todo" exact component={CreateTodoForm} />
          <Route path="/" exact component={Home} />
          <Redirect to={"/not-found"} />
        </Switch>
      </div>
    );
  }
}

export default App;
