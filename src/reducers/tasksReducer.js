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
    case 'MARK_COMPLETED': {
      return {
        pendingTasks: state.pendingTasks.filter((task) => task._id !== payload.task._id),
        completedTasks: [ action.payload, ...state.completedTasks ],
        activeTask: state.activeTask
      }
    }
    case 'REMOVE_PENDING_TASK': {
      return {
        ...state,
        pendingTasks: state.pendingTasks.filter((task) => task._id !== payload.task._id),
      }
    }
    case 'REMOVE_COMPLETED_TASK': {
      return {
        ...state,
        completedTasks: state.completedTasks.filter((task) => task._id !== payload.task._id),
      }
    }
    default: {
      return state
    }
  }
}

export default tasksReducer;
