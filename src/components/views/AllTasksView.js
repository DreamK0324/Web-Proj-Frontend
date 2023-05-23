import { Link } from "react-router-dom";

const AllTasksView = (props) => {
  let {tasks, deleteTask} = props;
  //tasks = [{id: 300, title: "hello"}]
  if (!tasks.length) {
    return (
    <div>
      <p>There are no tasks.</p>
      <Link to={`/newtask`}>
        <button>Add New Task</button>
      </Link>
    </div>
    );
  }
  
  return (
    <div>
      {tasks.map((task) => {
        let description = task.description;
        let priority = task.priority;
        let isComplete = task.isComplete;
        return (
          <div key={task.id}>
          <Link to={`/task/${task.id}`}>
            <h1>{description}</h1>
          </Link>
          <p>Priority: {priority}</p>
          <p>Status: {isComplete ? "Complete" : "Incomplete"}</p>



          <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        );
      }
      )}
      <Link to={`/newtask`}>
        <button>Add New Task</button>
      </Link>
      <br></br>
      <Link to={`/`}>
        <button>go home</button>
      </Link>
      
    </div>
  );
};


export default AllTasksView;