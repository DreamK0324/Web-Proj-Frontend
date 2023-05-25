import { Link } from "react-router-dom";


const EmployeeView = (props) => {
  const {employee, editTask, allTasks} = props;
  let assignedTasks = allTasks.filter(task => task.assigned_to===employee.id);
  let availableTasks = allTasks.filter(task => task.assigned_to!==employee.id);

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>
        {employee.employee_first_name + ' ' + employee.employee_last_name}
      </h1>
      <h3>{employee.department_name}</h3>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <div>
          Assigned tasks:
          {assignedTasks.length === 0 ? (
            <p>No assigned tasks</p>
          ) : (
            assignedTasks.map(task => (
              <div key={task.id}>
                <Link to={`/task/${task.id}`}>
                  <h4>{task.description}</h4>
                </Link>
                <button onClick={() => { editTask({ id: task.id, assigned_to: null }); window.location.reload(); }}>
                  X
                </button>
              </div>
            ))
          )}
        </div>
        <div>
          Available tasks:
          {availableTasks.map(task => (
            <div key={task.id}>
              <Link to={`/task/${task.id}`}>
                <h4>{task.description}</h4>
              </Link>

        <button
          onClick={() => {
          if (task.assigned_to === null) {
            editTask({ id: task.id, assigned_to: employee.id });
            window.location.reload();
          } else {
            alert("This task is already assigned to another employee.");
          }
        }}
>
  +
</button>
            </div>
          ))}
        </div>
      </div>
  
      <br />
      <br />
      <Link to={`/editemployee/${employee.id}`}>
        <button>Edit Information</button>
      </Link>
      <br />
      <br />
      <Link to={`/employees`}>Previous Page</Link>
      <br />
      <br />
      <Link to="/">Home Page</Link>
    </div>
  );

};

export default EmployeeView;