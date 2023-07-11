const tasksReducer = (state, action) => {
  switch(action.type) {
    case 'SET_DEFAULT': {
      return {
        pendingTasks: [],
        completedTasks: [],
        activeTask: null
      }
    }
    case 'SET_PENDING_TASKS': {
      return {
        ...state,
        pendingTasks: action.payload
      }
    }
    case 'SET_COMPLETED_TASKS': {
      return {
        ...state,
        completedTasks: action.payload
      }
    }
    case 'SET_TASK': {
      return {
        ...state,
        activeTask: action.payload
      }
    }
    case 'ADD_TASK': {
      return {
        ...state,
        pendingTasks: [ action.payload, ...state.pendingTasks ]
      }
    }
    case 'MODIFY_PENDING_TASK': {
      return {
        ...state,
        pendingTasks: state.pendingTasks.map((task) => {
          if(task._id === action.payload._id) {
            return action.payload;
          }
          return task;
        })
      }
    }
    case 'MODIFY_COMPLETED_TASK': {
      return {
        ...state,
        completedTasks: state.completedTasks.map((task) => {
          if(task._id === action.payload._id) {
            return action.payload;
          }
          return task;
        })
      }
    }
    case 'MARK_COMPLETED': {
      return {
        pendingTasks: state.pendingTasks.filter((task) => task._id !== action.payload._id),
        completedTasks: [ action.payload, ...state.completedTasks ],
        activeTask: null
      }
    }
    case 'REMOVE_PENDING_TASK': {
      return {
        ...state,
        pendingTasks: state.pendingTasks.filter((task) => task._id !== action.payload._id),
      }
    }
    case 'REMOVE_COMPLETED_TASK': {
      return {
        ...state,
        completedTasks: state.completedTasks.filter((task) => task._id !== action.payload._id),
      }
    }
    case 'TOGGLE_IS_PAUSED': {
      return {
        ...state,
        isPaused: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default tasksReducer;
