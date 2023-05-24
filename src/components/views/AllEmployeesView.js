import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllEmployeesView = (props) => {
  let { employee, deleteEmployee } = props;

  if (!props.allEmployees.length) {
    return (
      <div>
        <p>There are no employee.</p>
        <Link to={'/newemployee'}>
          <button>Add New Employee</button>
        </Link>
        <br/>
        <br/>
        <Link to="/">Home Page</Link>
      </div>
    );
  }

  return (
    <div>
      {props.allEmployees.map((employee) => {
        let name = employee.employee_first_name + " " + employee.employee_last_name;
        return (
          <div key={employee.id}>
          <Link to={`/employee/${employee.id}`}>
            <h1>{name}</h1>
          </Link>
          <p>ID: {employee.id}</p>
          <p>Department: {employee.department}</p>
        </div>
        );

      })}
      <Link to={`/`}>
        <button>Go Home</button>
      </Link>

      <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
    </div>
  );
};

AllEmployeesView.propTypes = {
  allEmployees: PropTypes.array.isRequired,
};

export default AllEmployeesView;