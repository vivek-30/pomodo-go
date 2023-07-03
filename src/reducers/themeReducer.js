const themeReducer = (state, action) => {
  switch(action.type) {
    case 'SET_THEME': {
      return {
        theme: action.payload
      }
    }
    case 'SET_DEFAULT': {
      return {
        theme: 'light'
      }
    }
    default: {
      return state
    }
  }
}

export default themeReducer;
