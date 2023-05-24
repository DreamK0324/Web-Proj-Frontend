import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { editEmployeeThunk, fetchEmployeeThunk, fetchAllTasksThunk } from '../../store/thunks';


class EditEmployeeContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          firstname: "", 
          lastname: "",
          department: "",
          redirect: false, 
          redirectId: null,
          error: ""
        };
    }

    componentDidMount() {
        //getting employee ID from url
        this.props.fetchEmployee(this.props.match.params.id);
        this.props.fetchTask();
        this.setState({
            firstname: this.props.employee.firstname, 
            lastname: this.props.employee.lastname,
            department: this.props.employee.department,
        });
      }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    // handleSelectChange = event => {
    //   //handle change for the dropdown menu
    //   //want to set the instructorId based on the selected choice
    //   //when the form gets submitted, this is how we can change
    //   //assigned instructor without having to manually enter in the 
    //   //instructorId like before
    //   if (event.target.value === "assignment") {
    //     this.setState({taskId:null});
    //   } else {
    //     this.setState({taskId: event.target.value})
    //   }
    // }

    handleSubmit = event => {
        event.preventDefault();
        //implementing form validation
        if (this.state.firstname === "" || this.state.lastname=== "") {
          this.setState({error: "Error: First and Last name cannot be empty"});
          return;
        }

        if (this.state.department === "") {
          this.setState({error: "Error: department cannot be empty"});
          return;
        }

        //get new info for course from form input
        let employee = {
            id: this.props.employee.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            department: this.state.department,
        };
        
        this.props.editEmployee(employee);

        this.setState({
          redirect: true, 
          redirectId: this.props.employee.id
        });

    }

    componentWillUnmount() {
        this.setState({redirect: false, redirectId: null});

    }

    render() {
        let { employee } = this.props;
      
        //go to single course view of the edited course
        if(this.state.redirect) {
          return (<Redirect to={`/employee/${this.state.redirectId}`}/>)
        }

        return (
          
        <div>
        <form style={{textAlign: 'center'}} onSubmit={(e) => this.handleSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Firstname: </label>
            <input type="text" name="firstname" value={this.state.firstname || ''} placeholder={employee.firstname} onChange ={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Lastname: </label>
            <input type="text" name="lastname" value={this.state.lastname || ''} placeholder={employee.lastname} onChange={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Department: </label>
            <input type="text" name="department" value={this.state.department || ''} placeholder={employee.department} onChange={(e) => this.handleChange(e)}/>
            <br/>

            {/* <select onChange={(e) => this.handleSelectChange(e)}>
              {employee.task!==null ?
                <option value={employee.taskId}>{employee.task.description+" (current)"}</option>
              : <option value="assignment">Assignment</option>
              }
              {otherTasks.map(task => {
                return (
                  <option value={task.id} key={task.id}>{task.description}</option>
                )
              })}
              {employee.task!==null && <option value="Assignment">Assignment</option>}
            </select> */}
  
            <button type="submit">
              Submit
            </button>

          </form>
          {/* { this.state.error !=="" && <p>{this.state.error}</p> }

          {employee.taskId !== null ?
            <div> Current task:  
            <Link to={`/task/${employee.taskId}`}>{employee.task.description}</Link>
            <button onClick={async () => {await editEmployee({id:employee.id, taskId: null});  fetchEmployee(employee.id)}}>Unassigned work</button>
            </div>
            : <div> No task currently assigned </div>
          }

          <div> Other task:
          {otherTasks.map(task => {
            return (
            <div key={task.id}>
                <Link to={`/task/${task.id}`}>
                  <h4>{task.description}</h4>
                </Link>
                <button onClick={async() => {await editEmployee({id:employee.id, taskId: task.id}); fetchEmployee(employee.id)}}>Assign this task</button>
            </div>
            )})
          }
          </div> */}

          <br/>
          <br/>
          <Link to="/employees">All Employees Page</Link>

          <br/>
          <br/>
          <Link to={`/employee/${employee.id}`}>Previous Page</Link>

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
      employee: state.employee,
    };
  };

const mapDispatch = (dispatch) => {
    return({
        editEmployee: (employee) => dispatch(editEmployeeThunk(employee)),
        fetchEmployee: (id) => dispatch(fetchEmployeeThunk(id)),
        fetchTask: () => dispatch(fetchAllTasksThunk()),

    })
}

export default connect(mapState, mapDispatch)(EditEmployeeContainer);