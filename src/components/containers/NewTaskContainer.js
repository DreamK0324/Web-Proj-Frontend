// import React, { useState } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

// import NewTaskView from '../views/NewTaskView';
// import { addTaskThunk } from '../../store/thunks';

// const NewTaskContainer = ({ addTask }) => {
//   const [description, setDescription] = useState('');
//   const [priority_level, setPriority] = useState(null);
//   const [completion_status, setIsComplete] = useState(false);
//   const [assigned_to, setEmployeeId] = useState(null);
//   const [redirect, setRedirect] = useState(false);
//   const [redirectId, setRedirectId] = useState(null);
//   const [error, setError] = useState('');

//   const handleChange = event => {
//     const { name, value } = event.target;
//     if (name === 'description') {
//       setDescription(value);
//     } else if (name === 'priority_level') {
//       setPriority(value);
//     } else if (name === 'completion_status') {
//       setIsComplete(value);
//     } else if (name === 'assigned_to') {
//       setEmployeeId(value);
//     }
//   };

//   const handleSubmit = async event => {
//     event.preventDefault();
//     if (description === '') {
//       setError('Description field is required');
//       return;
//     }
  

//     const task = {
//       description : this.state.description,
//       priority_level : this.state.priority_level,
//       completion_status : this.satet.completion_status,
//       assigned_to : this.state.assigned_to
//     };

//     const newTask = await addTask(task);

//     setRedirect(true);
//     setRedirectId(newTask.id);
//     setError('');
//   };

//   if (redirect) {
//     return <Redirect to={`/task/${redirectId}`} />;
//   }

//   return (
//     <NewTaskView
//       handleChange={handleChange}
//       handleSubmit={handleSubmit}
//       error={error}
//     />
//   );
// };

// const mapDispatch = dispatch => {
//   return {
//     addTask: task => dispatch(addTaskThunk(task)),
//   };
// };

// export default connect(null, mapDispatch)(NewTaskContainer);


// 有问题：无法添加新的task
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewTaskView from '../views/NewTaskView';
import { addTaskThunk } from '../../store/thunks';

const NewTaskContainer = ({ addTask }) => {
  const [description, setDescription] = useState('');
  const [priority_level, setPriority] = useState(null);
  const [completion_status, setIsComplete] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [redirectId, setRedirectId] = useState(null);
  const [error, setError] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === 'description') {
      setDescription(value);
    } else if (name === 'priority_level') {
      setPriority(value);
    } else if (name === 'completion_status') {
      setIsComplete(value);
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
      priority_level,
      completion_status,
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
