'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  isDark: false,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('rx_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved ? saved === 'dark' : prefersDark;
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('rx_theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
