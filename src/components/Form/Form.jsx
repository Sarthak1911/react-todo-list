import { Component } from "react";
import Joi from "joi-browser";
class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };

    const errors = {};

    const result = Joi.validate(this.state.data, this.schema, options);

    if (!result.error) return null;

    for (let error of result.error.details)
      errors[error["path"][0]] = error.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const { data } = this.state;

    const { type, name, value } = input;

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    if (type === "number") data[name] = parseInt(value);
    else data[name] = value;

    this.setState({ data, errors });
  };
}

export default Form;
