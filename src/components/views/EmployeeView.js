import { Link } from "react-router-dom";


const EmployeeView = (props) => {
  const {employee, editTask, allTasks} = props;
  let assignedTasks = allTasks.filter(task => task.assigned_to===employee.id);
  let availableTasks = allTasks.filter(task => task.assigned_to!==employee.id);
  
  return (
    <div>      
      <h1 style={{fontsize: '16px', fontWeight: 'bold', color: 'black'}}>{employee.employee_first_name + " " + employee.employee_last_name}</h1>
      <h3>{employee.department_name}</h3>
      <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
        <div>Assigned tasks:
        {assignedTasks.map( task => {
          return (
            <div key={task.id}>
            <Link to={`/task/${task.id}`}>
              <h4>{task.description}</h4>
            </Link>
            <button onClick={() => {editTask({id:task.id, assigned_to: null}); window.location.reload()}}>x</button>
            </div>
          );
        })}</div>
        <div>Available tasks:
        {availableTasks.map( task => {
          return (
            <div key={task.id}>
            <Link to={`/task/${task.id}`}>
              <h4>{task.description}</h4>
            </Link>
            <button onClick={() => {editTask({id:task.id, assigned_to: employee.id}); window.location.reload()}}>+</button>
            </div>
          );
        })}</div>

      </div>
      
      <br/>
      <br/>
      <Link to={`/editemployee/${employee.id}`}>
        <button>Edit Information</button>
      </Link>
      <br/>
      <br/>
      <Link to={`/employees`}>Previous Page</Link>
      <br/>
      <br/>
      <Link to="/">Home Page</Link>


  
    </div>
  );

};

export default EmployeeView;

// import { Link } from "react-router-dom";


// const EmployeeView = (props) => {
//   const {employee, editTask, allTasks} = props;
//   let assignedTasks = allTasks.filter(task => task.employeeId===employee.id);
//   let availableTasks = allTasks.filter(task => task.employeeId!==employee.id);
  
//   return (
//     <div>      
//       <h1 style={{fontsize: '16px', fontWeight: 'bold', color: 'black'}}>{employee.employee_first_name + " " + employee.employee_last_name}</h1>
//       <h3>{employee.department}</h3>
//       <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
//         <div>Assigned tasks:
//         {assignedTasks.map( task => {
//           return (
//             <div key={task.id}>
//             <Link to={`/task/${task.id}`}>
//               <h4>{task.description}</h4>
//             </Link>
//             <button onClick={() => editTask({id:task.id, employeeId: null})}>x</button>
//             </div>
//           );
//         })}</div>
//         <div>Available tasks:
//         {availableTasks.map( task => {
//           return (
//             <div key={task.id}>
//             <Link to={`/task/${task.id}`}>
//               <h4>{task.description}</h4>
//             </Link>
//             <button onClick={() => editTask({id:task.id, employeeId: employee.id})}>+</button>
//             </div>
//           );
//         })}</div>

//       </div>
      
//       <br/>
//       <br/>
//       <Link to={`/editemployee/${employee.id}`}>
//         <button>Edit Information</button>
//       </Link>
//       <br/>
//       <br/>
//       <Link to={`/employees`}>Previous Page</Link>
//       <br/>
//       <br/>
//       <Link to="/">Home Page</Link>


  
//     </div>
//   );

// };

// export default EmployeeView;