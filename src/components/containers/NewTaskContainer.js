import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewTaskView from '../views/NewTaskView';
import { addTaskThunk } from '../../store/thunks';

const NewTaskContainer = ({ addTask }) => {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [redirectId, setRedirectId] = useState(null);
  const [error, setError] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'description') {
      setDescription(value);
    } else if (name === 'priority') {
      setPriority(value);
    } else if (name === 'isComplete') {
      setIsComplete(value === 'true');
    } else if (name === 'employeeId') {
      setEmployeeId(value);
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (description === '') {
      setError('Description field is required');
      return;
    }
  

    const task = {
      description,
      priority,
      isComplete,
      employeeId,
    };

    const newTask = await addTask(task);

    setRedirect(true);
    setRedirectId(newTask.id);
    setError('');
  };

  if (redirect) {
    return <Redirect to={`/task/${redirectId}`} />;
  }

  return (
    <NewTaskView
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
};

const mapDispatch = dispatch => {
  return {
    addTask: task => dispatch(addTaskThunk(task)),
  };
};

export default connect(null, mapDispatch)(NewTaskContainer);
