import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { editEmployeeThunk } from '../../store/thunks';







const EditTaskContainer = ({ employee, editEmployee }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [department, setDepartment] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');
  };
  

const currChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const currSubmit = async (event) => {
    event.preventDefault(); // prevent the default behavior of an event 
    if (state.firstName === '' || state.department === '') {
      setState((prevState) => ({
        ...prevState,
        error: 'Please check the data'
      }));
      return;
    }
   //  creating a new object that represents the data of an employee
    const newEmployee = { 
      id: employee.id,
      employee_first_name: state.firstName,
      employee_last_name: state.lastName,
      department_name: state.department
    };
  };

  try {
    await editEmployee(newEmployee);
    setState((prevState) => ({ ...prevState, redirect: true, error: '' }));
  } catch (error) {
    console.error(error);
  }

  useEffect(() => {
    return () => {
      setState((prevState) => ({ ...prevState, redirect: false }));
    };
  }, []);
  
  if (state.redirect) {
    return <Navigate to="/employees" />;
  }
  
  return (
    <div>
      <form style={{ textAlign: 'center' }} onSubmit={currSubmit}>
        <label style={{ color: '#4091f5', fontWeight: 'bold' }}>
          Employee First Name:{' '}
        </label>
        <input
          type="text"
          name="firstName"
          value={state.firstName || ''}
          placeholder={employee.employee_first_name}
          onChange={currChange}
        />
        <br />
  
        <label style={{ color: '#4091f5', fontWeight: 'bold' }}>
          Employee Last Name:{' '}
        </label>
        <input
          type="text"
          name="lastName"
          value={state.lastName || ''}
          placeholder={employee.employee_last_name}
          onChange={currChange}
        />
        <br />
  
        <label style={{ color: '#4091f5', fontWeight: 'bold' }}>
          Department Name:{' '}
        </label>
        <input
          type="text"
          name="department"
          value={state.department || ''}
          placeholder={employee.department_name}
          onChange={currChange}
        />
        <br />
  
        <button type="submit">Submit</button>
      </form>
  
      <Link to="/">
        <button>Home Page</button>
      </Link>
    </div>
  );
  
  
  