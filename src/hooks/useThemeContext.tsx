import React, { useContext, useEffect, useState } from 'react'
import useLocalStorage from './useLocalStorage'
import type { ThemeContextType } from '../types'

const ThemeContext = React.createContext<ThemeContextType>(undefined as any)
const THEME_LOCAL_NAME = "selected-theme"
const ThemeProvider: any = ({ children }: { children: React.ReactNode }) => {
  const [ getLocalTheme ] = useLocalStorage(THEME_LOCAL_NAME, 'default');
  let val = 'default';
  

  const initialTheme = getLocalTheme(val) || val;
  const [theme, setTheme] = useState(initialTheme);
  const t= typeof theme === 'string' ? theme : ''
  return (
    <ThemeContext.Provider value={{ theme: t, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => {
  const [getLocalTheme,  setLocalTheme,  removeLocalTheme] = useLocalStorage(THEME_LOCAL_NAME, 'default');
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = (t:string | null)=>{
    switch(t){
      case 'light':
      case 'dark':
        setLocalTheme(t);
        setTheme(t);
        break;
      default:
        try{
          removeLocalTheme(THEME_LOCAL_NAME);
        } catch(err){console.log('error',err);};
        
        setTheme('default')
        break;
    }
  }

  useEffect(()=>{
    console.log("theme changed", theme)
  },[theme])


  return { theme, setTheme: handleThemeChange }
}

export { ThemeProvider, useTheme }
