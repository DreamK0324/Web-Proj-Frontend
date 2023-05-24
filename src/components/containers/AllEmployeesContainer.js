import React, { useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployeesThunk, deleteEmployeeThunk } from "../../store/thunks";
import { AllEmployeesView } from "../views";
import { connect } from 'react-redux';

const AllEmployeesContainer = ({ fetchAllEmployees, allEmployees, deleteEmployee }) => {
  useEffect(() => {
    fetchAllEmployees()
  }, [fetchAllEmployees]);

  return (
    <div>
      <AllEmployeesView
        employees={allEmployees}
        deleteEmployee={deleteEmployee}
      />
    </div>
  );
};

// Map state to props;
const mapState = (state) => {
  return {
    allEmployees: state.allEmployees,
  };
};

// Map dispatch to props;
const mapDispatch = (dispatch) => {
  return {
    fetchAllEmployees: () => dispatch(fetchAllEmployeesThunk()),
    deleteEmployee: (employeeId) => dispatch(deleteEmployeeThunk(employeeId)),
  };
};

export default connect(mapState, mapDispatch)(AllEmployeesContainer);