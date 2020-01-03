import React from "react";
import Joi from "joi-browser";
import Form from "../Form/form";
import {
  getTask,
  getAllTasks,
  updateTask,
  createTask
} from "../../services/fakeTodos";
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
    const { match, history } = this.props;

    if (match.params.id === "new") return;

    const data = getTask(match.params.id);

    if (data) this.setState({ data });
    else history.replace("/not-found");
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

  doSubmit = () => {
    //Get task
    const task = { ...this.state.data };
    //Update task
    if (task.id !== "") updateTask(task);
    //Create new task
    else createTask(task);

    this.props.history.push("/");
  };

  render() {
    const { id } = this.state.data;

    return (
      <div className="form-container">
        <div className="col-8 card shadow p-4">
          <h2>Task Form</h2>
          <hr />
          <form>
            {this.renderBackButton("/")}
            {this.renderInput("title", "text")}
            {this.renderInput("priority", "number")}
            {id ? this.renderCheckBox("isDone") : null}
            {this.renderSubmitButton("Submit")}
          </form>
        </div>
      </div>
    );
  }
}

export default TodoDetails;
