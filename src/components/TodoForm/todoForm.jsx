import React from "react";
import Joi from "joi-browser";
import axios from "axios";
import Form from "../Form/form";
import { createTask, getTask, updateTask } from "../../services/tasks";
class TodoDetails extends Form {
  state = {
    data: {},
    errors: {}
  };

  constructor(props) {
    super(props);
    this.state.data = {
      createdBy: "Jon Doe",
      createdOn: "",
      priority: "",
      isDone: false,
      title: ""
    };
  }

  async componentDidMount() {
    const { match, history } = this.props;

    if (match.params.id === "new") return;

    const data = await getTask(match.params.id);

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

  doSubmit = async () => {
    const { id } = this.props.match.params;

    //Get task
    const task = { ...this.state.data };
    //Update task
    const oldTask = await getTask(id);
    if (oldTask) await updateTask(id, task);
    //Create new task
    else await createTask(task);

    this.props.history.push("/todos");
  };

  showIsDone = () => this.props.match.params.id !== "new";

  render() {
    return (
      <div className="form-container">
        <div className="col-8 card shadow p-4">
          <h2>Task Form</h2>
          <hr />
          <form>
            {this.renderBackButton("/")}
            {this.renderInput("title", "text")}
            {this.renderInput("priority", "number")}
            {this.showIsDone() ? this.renderCheckBox("isDone") : null}
            {this.renderSubmitButton("Submit")}
          </form>
        </div>
      </div>
    );
  }
}

export default TodoDetails;
