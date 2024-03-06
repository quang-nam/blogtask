import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();
// take the state from localstorage
const getFormLocalStorage = () => {
  const value = localStorage.getItem("theme");
  return value || "light";
};
// create context provider
export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return getFormLocalStorage();
  });
  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  // change localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
