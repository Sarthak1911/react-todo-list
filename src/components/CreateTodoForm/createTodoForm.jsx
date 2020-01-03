import React from "react";
import Joi from "joi-browser";
import Form from "../Form/form";
import { todos } from "../../services/fakeTodos";
class CreateTodoForm extends Form {
  state = {
    data: {},
    errors: {}
  };

  constructor(props) {
    super(props);

    this.state.data = {
      id: "",
      createdBy: "Jon Doe",
      createdOn: "",
      priority: 1,
      isDone: false,
      title: ""
    };
  }

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    priority: Joi.number()
      .required()
      .min(1)
      .max(4)
      .label("Priority")
  };

  doSubmit = () => {
    //Call server after task is created
    const { history } = this.props;
    //Get task
    let { data: task } = { ...this.state };

    //Generate id
    const id = Math.ceil(Math.random() * 10) + "_id";

    //Check if already present
    const isPresent = todos.find(todo => todo.id === id);

    if (isPresent) {
      console.log("Already present");
      history.push("/");
      return;
    }

    //Generate current date
    const createdOn = new Date();

    //Update task with id and date
    task = { ...task, id, createdOn };

    //Add to list
    todos.push(task);

    //Redirect to home
    history.push("/");
  };

  render() {
    return (
      <div className="form-container">
        <div className="col-8 card shadow p-4">
          <h2>Create a task</h2>
          <hr />
          <form>
            {this.renderBackButton("/")}
            {this.renderInput("title", "text")}
            {this.renderInput("priority", "number")}
            {this.renderSubmitButton("Submit")}
          </form>
        </div>
      </div>
    );
  }
}

export default CreateTodoForm;
