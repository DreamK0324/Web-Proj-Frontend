import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewEmployeeView from '../views/NewEmployeeView';
import { addEmployeeThunk } from '../../store/thunks';

const NewEmployeeContainer = ({ addEmployee }) => {
  const [employee_first_name, setFirstname] = useState('');
  const [employee_last_name, setLastname] = useState('');
  const [department_name, setDepartment] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [redirectId, setRedirectId] = useState(null);
  const [error, setError] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'employee_first_name') {
      setFirstname(value);
    } else if (name === 'employee_last_name') {
      setLastname(value);
    } else if (name === 'department_name') {
      setDepartment(value);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (employee_first_name === '' || employee_last_name === '') {
      setError('First and Last name field are required');
      return;
    }
    
    if(department_name === '') {
      setError('Department field are required');
      return;
    }
  

    const employee = {
      employee_first_name,
      employee_last_name,
      department_name,
    };

    const newEmployee = await addEmployee(employee);

    setRedirect(true);
    setRedirectId(newEmployee.id);
    setError('');
  };

  if (redirect) {
    return <Redirect to={`/employee/${redirectId}`} />;
  }

  return (
    <NewEmployeeView
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

const mapDispatch = dispatch => {
  return {
    addEmployee: employee => dispatch(addEmployeeThunk(employee)),
  };
};

export default connect(null, mapDispatch)(NewEmployeeContainer);
