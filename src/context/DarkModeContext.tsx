import { ReactNode, createContext, useContext, useEffect } from 'react';

import { useLocalStorageState } from '../hooks/useLocalStorageState';

interface IDarkModeContext {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<IDarkModeContext | null>(null);

function DarkModeProvider({ children }: { children: ReactNode }) {
  const { value: isDarkMode, setValue: setIsDarkMode } =
    useLocalStorageState<boolean>(
      window.matchMedia('(prefers-color-scheme: dark)').matches,
      'isDarkMode'
    );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(isDark => !isDark);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined || !context)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');

  return context;
}

export { DarkModeProvider, useDarkMode };
