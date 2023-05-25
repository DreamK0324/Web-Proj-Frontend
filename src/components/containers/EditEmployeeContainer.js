import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { editEmployeeThunk, fetchEmployeeThunk, fetchAllTasksThunk } from '../../store/thunks';


class EditEmployeeContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
          employee_first_name: "", 
          employee_last_name: "",
          department_name: "",
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
            employee_first_name: this.props.employee.employee_first_name, 
            employee_last_name: this.props.employee.employee_last_name,
            department_name: this.props.employee.department_name,
        });
      }

    handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    handleSubmit = event => {
        event.preventDefault();
        //implementing form validation
        if (this.state.employee_first_name === "" || this.state.employee_last_name=== "") {
          this.setState({error: "Error: First and Last name cannot be empty"});
          return;
        }

        if (this.state.department_name === "") {
          this.setState({error: "Error: department cannot be empty"});
          return;
        }

        //get new info for course from form input
        let employee = {
            id: this.props.employee.id,
            employee_first_name: this.state.employee_first_name,
            employee_last_name: this.state.employee_last_name,
            department_name: this.state.department_name,
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
            <input type="text" name="employee_first_name" value={this.state.employee_first_name || ''} placeholder={employee.employee_first_name} onChange ={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Lastname: </label>
            <input type="text" name="employee_last_name" value={this.state.employee_last_name || ''} placeholder={employee.employee_last_name} onChange={(e) => this.handleChange(e)}/>
            <br/>

            <label style={{color:'#11153e', fontWeight: 'bold'}}>Department: </label>
            <input type="text" name="department_name" value={this.state.department_name || ''} placeholder={employee.department_name} onChange={(e) => this.handleChange(e)}/>
            <br/>
  
            <button type="submit">
              Submit
            </button>

          </form>

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