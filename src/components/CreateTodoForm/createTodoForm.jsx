import React from "react";
import BackButton from "../backButton/backbutton";
import TextInput from "../textInput/textInput";
import NumberInput from "../numberInput/numberInput";
import Form from "../Form/Form";
import Joi from "joi-browser";
import "./createTodoForm.css";
class CreateTodoForm extends Form {
  state = {
    data: {
      title: "",
      priority: 1
      //Need to add other fields as well
    },
    errors: {}
  };

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

  render() {
    const { data, errors } = this.state;

    return (
      <React.Fragment>
        <BackButton onBackButtonPressed={this.handleBackButtonPressed} />
        <div className="d-flex justify-content-center align-items-center form-container">
          <div className="card shadow p-4 col-8">
            <h2>Create a new task</h2>
            <hr />
            <form onSubmit={this.handleSubmit}>
              <TextInput
                title="title"
                data={data}
                onChange={this.handleChange}
                error={errors.title}
              />
              <NumberInput
                title="priority"
                data={data}
                onChange={this.handleChange}
                error={errors.priority}
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={this.validate()}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleBackButtonPressed = () => {
    this.props.history.push("/");
  };

  doSubmit() {
    console.log("Submitted");
  }
}

export default CreateTodoForm;
