import { useEffect, useState } from 'react';

import { THEME_KEY } from '@/utils/constants';

const useDarkMode = () => {
  const initialTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(initialTheme);

  const handleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  return { theme, toggleTheme: handleTheme };
};

export default useDarkMode;
