const modeReducer = (state, action) => {
  switch(action.type) {
    case 'SET_MODE': {
      return {
        mode: action.payload
      }
    }
    case 'SET_DEFAULT': {
      return {
        mode: 'focus'
      }
    }
    default: {
      return state
    }
  }
}

export default modeReducer;
