import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useDarkMode() {
  const [theme, setTheme] = useState(localStorage.theme || 'light');
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    // do a check if user as a system preference, also add to localstorage so we know what theme the user wants
    if ((!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      if (typeof window !== 'undefined') {
        setTheme('dark');
        localStorage.setItem('theme', 'dark');
      }
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [colorTheme, theme]);

  return [colorTheme, setTheme] as const;
}

export default useDarkMode;
