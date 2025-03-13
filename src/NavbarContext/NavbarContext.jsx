import React, { createContext, useState, useContext } from 'react';

// Context create cheyyuka
const AuthContext = createContext();

// Custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};