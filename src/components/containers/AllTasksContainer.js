import { useEffect } from 'react';
import { connect } from 'react-redux';

import {
  fetchAllTasksThunk,
  deleteTaskThunk
} from '../../store/thunks';

import AllTasksView from '../views/AllTasksView';
import { fetchAllTasks } from '../../store/actions/actionCreators';

const AllTasksContainer = ({ fetchAllTasks, allTasks, deleteTask }) => {
  useEffect(() => {
    fetchAllTasks();
  }, [fetchAllTasks]);

  return (
    <div>
      <AllTasksView
        tasks={allTasks}
        deleteTask={deleteTask}
      />
    </div>
  );
};

// Map state to props;
const mapState = (state) => {
  return {
    allTasks: state.allTasks,
  };
};

// Map dispatch to props;
const mapDispatch = (dispatch) => {
  return {
    fetchAllTasks: () => dispatch(fetchAllTasksThunk()),
    deleteTask: (taskId) => dispatch(deleteTaskThunk(taskId)),
  };
};

export default connect(mapState, mapDispatch)(AllTasksContainer);


