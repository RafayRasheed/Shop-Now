import React, {useState, createContext, useEffect } from 'react'
import themes from './themes'
export const ThemeContext = createContext()
export const ThemeContextProvider =({children})=>{
    const[darkMode, setDarkMode] = useState(false);
    const[theme, setTheme] = useState({});
    useEffect(()=>{
        if(darkMode){
            setTheme(themes.dark)
            return
        }
        setTheme(themes.light)
    },[darkMode])

    
    return(
        <ThemeContext.Provider 
            value={{
                theme,
                darkMode,
                setDarkMode,
                }}>
            {children}
        </ThemeContext.Provider>
    )
}

