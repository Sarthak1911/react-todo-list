import React, { Component } from "react";
import BackButton from "./../backButton/backbutton";
import "./newTodo.css";
class NewTodo extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <BackButton onBackButtonPressed={this.handleBackButtonPressed} />
        <div className="d-flex justify-content-center align-items-center form-container">
          <div className="card shadow p-4 col-8">
            <h2>Create a new task</h2>
            <hr />
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  placeholder="Title"
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="priority">Priority</label>
                <select id="priority" className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
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
}

export default NewTodo;
