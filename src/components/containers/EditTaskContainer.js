import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { fetchTaskThunk, editTaskThunk, fetchAllEmployeesThunk  } from '../../store/thunks';

class EditTaskContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          description: "", 
          priority_level: null,
          completion_status: false,
          assigned_to: null, 
          redirect: false, 
          redirectId: null,
          error: ""
        };
    }

    componentDidMount() {
        //getting task ID from url
        this.props.fetchTask(this.props.match.params.id);
        this.props.fetchEmployee();
        this.setState({
            description: this.props.task.description, 
            priority_level: this.props.task.priority_level,
            completion_status: this.props.task.completion_status,
            assigned_to: this.props.task.assigned_to, 
        });
      }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleCheckboxChange = event => {
      this.setState({
        completion_status: event.target.checked
      })
    }

    handleSelectChange = event => {
      //handle change for the dropdown menu
      //want to set the assigned_to based on the selected choice
      //when the form gets submitted, this is how we can change
      //assigned employee without having to manually enter in the 
      //assigned_to like before
      if (event.target.value === "staff") {
        this.setState({assigned_to:null});
      } else {
        this.setState({assigned_to: event.target.value})
      }
    }

    handleSubmit = event => {
        event.preventDefault();
        //implementing form validation
        if (this.state.description === "") {
          this.setState({error: "Error: description cannot be empty"});
          return;
        }

        //get new info for task from form input
        let task = {
            id: this.props.task.id,
            description: this.state.description,
            priority_level: this.state.priority_level,
            completion_status: this.state.completion_status,
            assigned_to: this.state.assigned_to
        };
        
        this.props.editTask(task);

        this.setState({
          redirect: true, 
          redirectId: this.props.task.id
        });

    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});

    }

    render() {
        let { task, allEmployees, editTask, fetchTask} = this.props;
        //let { task } = this.props;
        let assignedEmployee = task.assigned_to;
        let thisEmployee = allEmployees.filter(employee => employee.id === assignedEmployee);
        let otherEmployees = allEmployees.filter(employee => employee.id!==assignedEmployee);
      
        //go to single task view of the edited task
        if(this.state.redirect) {
          return (<Redirect to={`/task/${this.state.redirectId}`}/>)
        }

        return (
        <div>
        <form style={{textAlign: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Description: </label>
            <input type="text" name="description" value={this.state.description || ''} placeholder={task.description} onChange ={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Priority: </label>
            <input type="number" name="priority_level" value={this.state.priority_level || ''} placeholder={task.priority_level} onChange={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Complete Status: </label>
            <input type="checkbox" name="completion_status" checked={this.state.completion_status || ''} placeholder={task.completion_status} onChange={(e) => this.handleCheckboxChange(e)}/>
            <br/>

            <select onChange={(e) => this.handleSelectChange(e)}>
              {task.employee!==null ?
                thisEmployee.map(employee => (<option value={task.assigned_to}>{employee.employee_first_name}{" "}{employee.employee_last_name + " (current)"}</option>))
              : <option value="staff">Employee</option>
              }
              {otherEmployees.map(employee => {
                return (
                  <option value={employee.id} key={employee.id}>{employee.employee_first_name}{" "}{employee.employee_last_name}</option>
                )
              })}
              {task.employee!==null && <option value="staff">Staff</option>}
            </select>
  
            <button type="submit">
              Submit
            </button>

          </form>
          { this.state.error !=="" && <p>{this.state.error}</p> }

          {task.assigned_to !== null ?
            <div> Current employee: 
            {thisEmployee.map(employee => (
              <Link to={`/employee/${task.assigned_to}`}>{employee.employee_first_name}{" "}{employee.employee_last_name}</Link>,
              <button onClick={async () => {await editTask({ id: task.id, assigned_to: null }); fetchTask(task.id);
          }}
        >
          Unassign
        </button>
              

            ))}

            </div> : <div> No employee currently assigned </div>
          }

          <div> Other employees: 
          {otherEmployees.map(employee => {
            return (
            <div key={employee.id}>
                <Link to={`/employee/${employee.id}`}>
                  <h4>{employee.employee_first_name}{" "}{employee.employee_last_name}</h4>
                </Link>
                <button onClick={async() => {await editTask({id:task.id, assigned_to: employee.id}); fetchTask(task.id)}}>Assign this employee</button>
            </div>
            )})
          }
          </div>

          <br/>
          <br/>
          <Link to="/tasks">All Tasks Page</Link>

          <br/>
          <br/>
          <Link to={`/task/${task.id}`}>Previous Page</Link>

          <br/>
          <br/>
          <Link to="/">Home Page</Link>

        </div>
        )
    }
}

// map state to props
const mapState = (state) => {
    return {
      task: state.task,
      allEmployees: state.allEmployees
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editTask: (task) => dispatch(editTaskThunk(task)),
        fetchTask: (id) => dispatch(fetchTaskThunk(id)),
        fetchEmployee: () => dispatch(fetchAllEmployeesThunk()),

    })
}

export default connect(mapState, mapDispatch)(EditTaskContainer);


// import { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect, Link } from 'react-router-dom';

// import { fetchTaskThunk, editTaskThunk, fetchAllEmployeesThunk  } from '../../store/thunks';

// class EditTaskContainer extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//           description: "", 
//           priority_level: null,
//           completion_status: false,
//           employeeId: null, 
//           redirect: false, 
//           redirectId: null,
//           error: ""
//         };
//     }

//     componentDidMount() {
//         //getting task ID from url
//         this.props.fetchTask(this.props.match.params.id);
//         this.props.fetchEmployees();
//         this.setState({
//             description: this.props.task.description, 
//             priority_level: this.props.task.priority_level,
//             completion_status: this.props.task.completion_status,
//             employeeId: this.props.task.employeeId, 
//         });
//       }

//     handleChange = event => {
//       this.setState({
//         [event.target.name]: event.target.value
//       });
//     }

//     handleSelectChange = event => {
//       //handle change for the dropdown menu
//       //want to set the employeeId based on the selected choice
//       //when the form gets submitted, this is how we can change
//       //assigned employee without having to manually enter in the 
//       //employeeId like before
//       if (event.target.value === "staff") {
//         this.setState({employeeId:null});
//       } else {
//         this.setState({employeeId: event.target.value})
//       }
//     }

//     handleSubmit = event => {
//         event.preventDefault();
//         //implementing form validation
//         if (this.state.title === "") {
//           this.setState({error: "Error: title cannot be empty"});
//           return;
//         }

//         //get new info for task from form input
//         let task = {
//             id: this.props.task.id,
//             description: this.state.description,
//             priority_level: this.state.priority_level,
//             completion_status: this.state.completion_status,
//             employeeId: this.state.employeeId
//         };
        
//         this.props.editTask(task);

//         this.setState({
//           redirect: true, 
//           redirectId: this.props.task.id
//         });

//     }

//     componentWillUnmount() {
//         this.setState({redirect: false, redirectId: null});

//     }

//     render() {
//         let { task, allEmployees, editTask, fetchTask} = this.props;
//         let assignedEmployee = task.employeeId;

//         let otherEmployees = allEmployees.filter(employee => employee.id!==assignedEmployee);
      
//         //go to single task view of the edited task
//         if(this.state.redirect) {
//           return (<Redirect to={`/task/${this.state.redirectId}`}/>)
//         }

//         return (
//         <div>
//         <form style={{textAlign: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
//             <label style= {{color:'#11153e', fontWeight: 'bold'}}>Description: </label>
//             <input type="text" name="description" value={this.state.description || ''} placeholder={task.description} onChange ={(e) => this.handleChange(e)}/>
//             <br/>

//             <label style={{color:'#11153e', fontWeight: 'bold'}}>Priority: </label>
//             <input type="number" name="priority_level" value={this.state.priority_level || ''} placeholder={task.priority_level} onChange={(e) => this.handleChange(e)}/>
//             <br/>

//             <label style={{color:'#11153e', fontWeight: 'bold'}}>Complete Status: </label>
//             <input type="checkbox" name="completion_status" value={this.state.completion_status || ''} placeholder={task.completion_status} onChange={(e) => this.handleChange(e)}/>
//             <br/>

//             <select onChange={(e) => this.handleSelectChange(e)}>
//               {task.employee!==null ?
//                 <option value={task.employeeId}>{task.employee.employee_first_name+" (current)"}</option>
//               : <option value="staff">Staff</option>
//               }
//               {otherEmployees.map(employee => {
//                 return (
//                   <option value={employee.id} key={employee.id}>{employee.firstname}</option>
//                 )
//               })}
//               {task.employee!==null && <option value="staff">Staff</option>}
//             </select>
  
//             <button type="submit">
//               Submit
//             </button>

//           </form>
//           { this.state.error !=="" && <p>{this.state.error}</p> }

//           {task.employeeId !== null ?
//             <div> Current employee:  
//             <Link to={`/employee/${task.employeeId}`}>{task.employee.firstname}</Link>
//             <button onClick={async () => {await editTask({id:task.id, employeeId: null});  fetchTask(task.id)}}>Unassign</button>
//             </div>
//             : <div> No employee currently assigned </div>
//           }

//           <div> Other employees: 
//           {otherEmployees.map(employee => {
//             return (
//             <div key={employee.id}>
//                 <Link to={`/employee/${employee.id}`}>
//                   <h4>{employee.firstname}</h4>
//                 </Link>
//                 <button onClick={async() => {await editTask({id:task.id, employeeId: employee.id}); fetchTask(task.id)}}>Assign this employee</button>
//             </div>
//             )})
//           }
//           </div>
//         </div>
//         )
//     }
// }

// // map state to props
// const mapState = (state) => {
//     return {
//       task: state.task,
//       allEmployees: state.allEmployees
//     };
//   };

// const mapDispatch = (dispatch) => {
//     return({
//         editTask: (task) => dispatch(editTaskThunk(task)),
//         fetchTask: (id) => dispatch(fetchTaskThunk(id)),
//         fetchEmployees: () => dispatch(fetchAllEmployeesThunk()),

//     })
// }

// export default connect(mapState, mapDispatch)(EditTaskContainer);