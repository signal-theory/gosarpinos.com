'use client'
import { createContext } from 'react'
import { checkTime } from '../lib/checkTime';

export const ThemeContext = createContext({})

export const ThemeProvider = ({ children }) => {
  const isDay = checkTime();
  const theme = isDay ? 'day' : 'night';

  return <ThemeContext.Provider value={theme}>
    <main className={theme}>
      {children}
    </main>
  </ThemeContext.Provider>
};