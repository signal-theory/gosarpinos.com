'use client'
import { createContext, useEffect, useState } from 'react'
import { checkTime } from '../lib/checkTime';

export const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('day');

  useEffect(() => {
    const isDay = checkTime();
    setTheme(isDay ? 'day' : 'night');
  }, []);

  return <ThemeContext.Provider value={theme}>
    <main className={theme}>

      <div className="nightmode-overlay">
        {children}
      </div>
    </main>
  </ThemeContext.Provider>
};