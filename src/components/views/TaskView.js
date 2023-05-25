import { Link } from "react-router-dom";

const TaskView = (props) => {
  const { task, employee } = props;
  return (
    <div>
      <h1>{task.description}</h1>
      {task.assigned_to ? (
        <h3>
          Employee: {employee.employee_first_name} {employee.employee_last_name} 
        </h3>
      ) : (
        <h3>Unassigned</h3>
      )}

      <div>
        Status: {task.completion_status ? 'Complete' : 'Incomplete'}
      </div>
      <br/>
      <br/>
      <Link to={`/edittask/${task.id}`}>Edit task information</Link>
      <br/>
      <br/>
      <Link to={`/tasks`}>View all tasks</Link>
      <br/>
      <br/>
      <Link to={`/tasks`}>Previous Page</Link>
      <br/>
      <br/>
      <Link to="/">Home Page</Link>
    </div>
  );

};

export default TaskView;