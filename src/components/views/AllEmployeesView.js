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
            <h1>{name}</h1> 
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


// WSX
// import { Link } from 'react-router-dom';

// const AllEmployeesView = (props) => {
//   let { employees, deleteEmployee } = props;

//   if (!employees.length) {
//     return (
//       <div>
//       <nav className="navbar">
//         <div className="navbar-links">
//         <Link to="/newemployee">
//         <button className="button2">Add New Employee</button>
//       </Link>
//       <Link to="/">
//         <button className="button2">Home Page</button>
//       </Link>
//         </div>
//       </nav>
//       <div className="container">
//         <div className="left">
//           <Link to="/">
//             <button className="button1">Back</button>
//           </Link>
//         </div>
//         <div class="center">
//           <h2>All Employees</h2>
//         </div>
//       </div>
//       <div>
//         <p>There are no Employees</p>
//         <p>Please add Employee to continue</p>
//       </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <nav className="navbar">
//         <div className="navbar-logo">
//         </div>
//         <div className="navbar-links">
//         <Link to="/newemployee">
//         <button className="button2">Add New Employee</button>
//       </Link>
//       <Link to="/">
//         <button className="button2">Home Page</button>
//       </Link>
//         </div>
//       </nav>
//       <div className="container">
//         <div className="left">
//           <Link to="/">
//             <button className="button1">Back</button>
//           </Link>
//         </div>
//         <div class="center">
//           <h2>All Employees</h2>
//         </div>
//       </div>
      
//     <div>
//       {employees.map((employee) => {
//         let first_name = employee.employee_first_name;
//         let id = employee.id;
//         return (
//           <div key={employee.id}>
//             <Link to={`/employees/${employee.id}`} className="link">
//             <div>ID: {id}</div>
//               {first_name}
//             </Link>
//             <button onClick={() => deleteEmployee(employee.id)} className="button1">Delete</button>
//           </div>
//         );
//       })}
//     </div>
//     </div>
//   );
// };

// export default AllEmployeesView;



// New Version
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

// const AllEmployeesView = (props) => {
//   let { employee, deleteEmployee } = props;

//   if (!props.allEmployees.length) {
//     return (
//       <div>
//         <p>There are no employee.</p>
//         <Link to={'/newemployee'}>
//           <button>Add New Employee</button>
//         </Link>
//         <br/>
//         <br/>
//         <Link to="/">Home Page</Link>
//       </div>
//     );
//   }

//   return (
//     <div>
//       {props.allEmployees.map((employee) => {
//         let name = employee.employee_first_name + " " + employee.employee_last_name;
//         return (
//           <div key={employee.id}>
//           <Link to={`/employee/${employee.id}`}>
//             <h1>{name}</h1>
//           </Link>
//           <p>ID: {employee.id}</p>
//           <p>Department: {employee.department_name}</p>
//         </div>
//         );
      
//       })}

//       <Link to={'/newemployee'}>
//           <button>Add New Employee</button>
//         </Link>

//       <Link to={`/`}>
//         <button>Go Home</button>
//       </Link>

//       <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
//     </div>
//   );
// };

// AllEmployeesView.propTypes = {
//   allEmployees: PropTypes.array.isRequired,
// };

// export default AllEmployeesView;