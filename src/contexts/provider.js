'use client';
import ThemeContextProvider from '@/contexts/themeContext';
import ModeContextProvider from '@/contexts/modeContext';

const ContextProvider = ({ children }) => {
  return (
    <ThemeContextProvider>
      <ModeContextProvider>
        { children }
      </ModeContextProvider>
    </ThemeContextProvider>
  );
}

export default ContextProvider;
