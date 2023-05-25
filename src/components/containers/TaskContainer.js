import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEmployeeThunk, fetchTaskThunk } from "../../store/thunks";
import { TaskView } from "../views";

class TaskContainer extends Component {
  componentDidMount() {
    //getting task ID from url
    this.props.fetchTask(this.props.match.params.id);
    this.props.fetchEmployee(this.props.task.assigned_to);
  }

  render() {
    return (
      <TaskView 
        task={this.props.task}
        employee={this.props.employee}
      />
    );
  }
}

// map state to props
const mapState = (state) => {
  return {
    task: state.task,
    employee: state.employee
  };
};

// map dispatch to props
const mapDispatch = (dispatch) => {
  return {
    fetchTask: (id) => dispatch(fetchTaskThunk(id)),
    fetchEmployee: (assigned_to) => dispatch(fetchEmployeeThunk(assigned_to))
  };
};

export default connect(mapState, mapDispatch)(TaskContainer);