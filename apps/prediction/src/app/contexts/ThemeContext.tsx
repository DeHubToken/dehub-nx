import { dark } from '@dehub/react/pcsuikit';
import React, { PropsWithChildren, useState } from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

const CACHE_KEY = 'IS_DARK';

const ThemeContext = React.createContext({
  isDark: null,
  toggleTheme: () => null,
});

const ThemeContextProvider: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(() => {
    const isDarkUserSetting = localStorage.getItem(CACHE_KEY);
    return isDarkUserSetting ? JSON.parse(isDarkUserSetting) : false;
  });

  const toggleTheme = () => {
    setIsDark((prevState: string) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(!prevState));
      return !prevState;
    });
  };

  return (
    <ThemeContext.Provider
      value={{ isDark, toggleTheme: toggleTheme as () => null }}
    >
      <SCThemeProvider theme={dark}>{children}</SCThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeContextProvider };
