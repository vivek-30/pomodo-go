import { createContext, useReducer } from 'react';
import themeReducer from '../reducers/themeReducer';

export const ThemeContext = createContext('light');
const initialTheme = {
  theme: 'light'
}
const ThemeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialTheme);

  return (
    <ThemeContext.Provider value={{ state, dispatch }}>
      { children }
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
