import React from "react";
import Joi from "joi-browser";
import Form from "../Form/form";
import { todos } from "../../services/fakeTodos";
class TodoDetails extends Form {
  state = {
    data: {},
    errors: {}
  };

  constructor(props) {
    super(props);
    this.state.data = {
      id: "",
      createdBy: "",
      createdOn: "",
      priority: "",
      isDone: "",
      title: ""
    };
  }

  componentDidMount() {
    const data = todos.find(todo => todo.id === this.props.match.params.id);
    if (data) this.setState({ data });
    else this.props.history.replace("/not-found");
  }

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    priority: Joi.number()
      .required()
      .min(1)
      .max(4)
      .label("Priority"),
    isDone: Joi.optional()
  };

  handleCheckboxChange = e => {
    console.log(e.currentTarget.checked);
  };

  doSubmit = () => {
    //Get task
    let task = { ...this.state.data };

    //Find the index of the task
    const index = todos.findIndex(todo => todo.id === task.id);

    //Update the task
    if (index) todos[index] = task;

    this.props.history.push("/");
  };

  render() {
    return (
      <div className="form-container">
        <div className="col-8 card shadow p-4">
          <h2>Edit task</h2>
          <hr />
          <form>
            {this.renderBackButton("/")}
            {this.renderInput("title", "text")}
            {this.renderInput("priority", "number")}
            {this.renderInput("isDone", "checkbox")}
            {this.renderSubmitButton("Submit")}
          </form>
        </div>
      </div>
    );
  }
}

export default TodoDetails;
