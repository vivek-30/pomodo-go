'use client';
import ThemeContextProvider from '@contexts/themeContext';
import ModeContextProvider from '@contexts/modeContext';
import TasksContextProvider from '@contexts/tasksContext';

const ContextProvider = ({ children }) => {
  return (
    <ThemeContextProvider>
      <ModeContextProvider>
        <TasksContextProvider>
          { children }
        </TasksContextProvider>
      </ModeContextProvider>
    </ThemeContextProvider>
  );
}

export default ContextProvider;
