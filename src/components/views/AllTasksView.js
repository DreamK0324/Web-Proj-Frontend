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
      <br/>
      <br/>
      <Link to="/">Home Page</Link>
    </div>
    );
  }
  
  return (
    <div>
      <h1>All Tasks</h1>
      {tasks.map((task) => {
        let description = task.description;
        let priority_level = task.priority_level;
        let completion_status = task.completion_status;
        return (
          <div key={task.id}>
          <Link to={`/task/${task.id}`}>
            {"   "+description+"   "}
          </Link>
          <button onClick={() => deleteTask(task.id)}>X</button>
          <p>Priority: {priority_level}</p>
          <p>Status: {completion_status ? "Complete" : "Incomplete"}</p>
          <h3>------------------------</h3>
          </div>
        );
      }
      )}
      <Link to={`/newtask`}>
        <button>Add New Task</button>
      </Link>
      <br></br>
      <br/>
      <Link to={`/`}>Home Page</Link>
      
    </div>
  );
};


export default AllTasksView;