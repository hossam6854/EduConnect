import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    role: '',
    username: '',
    userId: '',
  });

  useEffect(() => {
    const stored = localStorage.getItem('loginInfo');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAuth({
          isLoggedIn: true,
          role: parsed.role || '',
          username: parsed.username || '',
          userId: parsed.userId || '',
        });
      } catch (error) {
        console.error('Failed to parse loginInfo:', error);
        localStorage.removeItem('loginInfo');
      }
    }
  }, []);

  const login = useCallback(({ role, username, userId }) => {
    const userData = { role, username, userId };
    setAuth({
      isLoggedIn: true,
      ...userData,
    });
    localStorage.setItem('loginInfo', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setAuth({
      isLoggedIn: false,
      role: '',
      username: '',
      userId: '',
    });
    localStorage.removeItem('loginInfo');
  }, []);

  const value = useMemo(() => ({ auth, login, logout }), [auth, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};