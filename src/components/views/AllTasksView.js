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
      {tasks.map((task) => {
        let description = task.description;
        let priority_level = task.priority_level;
        let completion_status = task.completion_status;
        return (
          <div key={task.id}>
          <Link to={`/task/${task.id}`}>
            <h1>{description}</h1>
          </Link>
          <p>Priority: {priority_level}</p>
          <p>Status: {completion_status ? "Complete" : "Incomplete"}</p>



          <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        );
      }
      )}
      <Link to={`/newtask`}>
        <button>Add New Task</button>
      </Link>
      <br></br>
      <Link to={`/`}>Home Page</Link>
      
    </div>
  );
};


export default AllTasksView;

// import { Link } from "react-router-dom";

// const AllTasksView = (props) => {
//   let {tasks, deleteTask} = props;
//   //tasks = [{id: 300, title: "hello"}]
//   if (!tasks.length) {
//     return (
//     <div>
//       <p>There are no tasks.</p>
//       <Link to={`/newtask`}>
//         <button>Add New Task</button>
//       </Link>
//       <br/>
//       <br/>
//       <Link to="/">Home Page</Link>
//     </div>
//     );
//   }
  
//   return (
//     <div>
//       {tasks.map((task) => {
//         let description = task.description;
//         let priority_level = task.priority_level;
//         let completion_status = task.completion_status;
//         return (
//           <div key={task.id}>
//           <Link to={`/task/${task.id}`}>
//             <h1>{description}</h1>
//           </Link>
//           <p>Priority: {priority_level}</p>
//           <p>Status: {completion_status ? "Complete" : "Incomplete"}</p>



//           <button onClick={() => deleteTask(task.id)}>Delete</button>
//           </div>
//         );
//       }
//       )}
//       <Link to={`/newtask`}>
//         <button>Add New Task</button>
//       </Link>
//       <br></br>
//       <Link to={`/`}>Home Page</Link>
      
//     </div>
//   );
// };


// export default AllTasksView;