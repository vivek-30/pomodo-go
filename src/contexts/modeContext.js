import { createContext, useReducer } from 'react';
import modeReducer from '../reducers/modeReducer';

export const ModeContext = createContext('focus');
const initialMode = {
  mode: 'focus'
}
const ModeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modeReducer, initialMode);

  return (
    <ModeContext.Provider value={{ state, dispatch }}>
      { children }
    </ModeContext.Provider>
  );
}

export default ModeContextProvider;
