'use client'
import { createContext, useEffect, useState } from 'react'
import { checkTime } from '@/app/lib/checkTime';

export const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('day');

  useEffect(() => {
    const isDay = checkTime();
    setTheme(isDay ? 'day' : 'night');
  }, []);

  return <ThemeContext.Provider value={theme}>
    <main className={theme}>
      {children}
    </main>
  </ThemeContext.Provider>
};