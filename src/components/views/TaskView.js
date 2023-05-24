// import { Link } from "react-router-dom";

// const TaskView = (props) => {
//   const { task, employee } = props;
//   return (
//     <div>
//       <h1>{task.description}</h1>
//       {task.assigned_to ? (<h3>{employee.employee_first_name}</h3>) : (<h3>Unassigned</h3>)}

//       <div>
//         completion_status : {task.completion_status ? 'Complete' : 'Incomplete'}
//       </div>
//       <Link to={`/edittask/${task.id}`}>Edit task information</Link>
//       <br/>
//       <Link to={`/tasks`}>View all tasks</Link>
//       <br/>
//       <Link to={`/tasks`}>Previous Page</Link>
//       <br/>
//       <Link to="/">Home Page</Link>
//     </div>
//   );

// };

// export default TaskView;


//有问题：会有一个Task的single task页面无法显示
import { Link } from "react-router-dom";

const TaskView = (props) => {
  const { task } = props;
  return (
    <div>
      <h1>{task.description}</h1>
      {task.employee ? <h3>{task.employee.firstname + " " + task.employee.lastname}</h3>: <h3>Unassigned</h3>}

      <div>
        completion_status : {task.completion_status ? 'Complete' : 'Incomplete'}
      </div>
      <Link to={`/edittask/${task.id}`}>Edit task information</Link>
      <br/>
      <Link to={`/tasks`}>View all tasks</Link>
      <br/>
      <Link to={`/tasks`}>Previous Page</Link>
      <br/>
      <Link to="/">Home Page</Link>
    </div>
  );

};

export default TaskView;