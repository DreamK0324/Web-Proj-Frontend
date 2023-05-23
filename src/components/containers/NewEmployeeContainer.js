import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewEmployeeView from '../views/NewEmployeeView';
import { addEmployeeThunk } from '../../store/thunks';

const NewEmployeeContainer = ({ addEmployee }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [department, setDepartment] = useState('');
  const [taskId, setTaskId] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [redirectId, setRedirectId] = useState(null);
  const [error, setError] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'firstname') {
      setFirstname(value);
    } else if (name === 'lastname') {
      setLastname(value);
    } else if (name === 'department') {
      setDepartment(value);
    } else if (name === 'taskId') {
      setTaskId(value);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (firstname === '' || lastname === '') {
      setError('First and Last name field are required');
      return;
    }
  

    const employee = {
      firstname,
      lastname,
      department,
      taskId,
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