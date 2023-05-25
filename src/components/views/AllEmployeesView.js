//import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const AllEmployeesView = (props) => {
  let { employees, deleteEmployee } = props;

  if (!employees.length) {
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
      <h1>All Employees</h1>
      {employees.map((employee) => {
        let name = employee.employee_first_name + " " + employee.employee_last_name;
        return (
          <div key={employee.id}>
          <Link to={`/employee/${employee.id}`}>
            {"   "+name+"   "}
          </Link>
          <button onClick={() => deleteEmployee(employee.id)}>X</button>
          <p>ID: {employee.id}</p>
          <p>Department: {employee.department_name}</p>
          <h3>------------------------</h3>
        </div>
        );
      })}
      <br/>
      <br/>
      <Link to={'/newemployee'}>
          <button>Add New Employee</button>
        </Link>
      <br/>
      <br/>
      <Link to={`/`}>
        Go Home
      </Link>

    </div>
  );
};

// AllEmployeesView.propTypes = {
//   allEmployees: PropTypes.array.isRequired,
// };

export default AllEmployeesView;