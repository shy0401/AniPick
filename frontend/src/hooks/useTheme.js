import { useCallback, useEffect, useState } from 'react';
import { applyTheme, getInitialTheme, toggleTheme as getNextTheme } from '../utils/theme';

export function useTheme() {
  const [theme, setTheme] = useState(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => applyTheme(getNextTheme(current)));
  }, []);

  const setLightTheme = useCallback(() => {
    setTheme(applyTheme('light'));
  }, []);

  const setDarkTheme = useCallback(() => {
    setTheme(applyTheme('dark'));
  }, []);

  return {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setLightTheme,
    setDarkTheme,
  };
}
