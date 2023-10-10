import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);


export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuth(false);
  };

  const handleLogin = () => {
    localStorage.getItem('user');
    setIsAuth(true)
  }

  return (
    <AuthContext.Provider value={{ isAuth, handleLogout,handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
