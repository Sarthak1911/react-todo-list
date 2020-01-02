import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "../Form/form";
class CreateTodoForm extends Form {
  state = {
    data: {
      title: "",
      priority: "1"
    },
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    priority: Joi.string()
      .required()
      .label("Priority")
  };

  doSubmit = () => {
    //Call server after task is created
    console.log("Submitted");
  };

  render() {
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("title", "text")}
        {this.renderInput("priority", "number")}
        {this.renderSubmitButton("Submit")}
      </form>
    );
  }
}

export default CreateTodoForm;
