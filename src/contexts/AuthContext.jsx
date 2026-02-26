import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('cybershield_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email, password) => {
        // Updated: Allow any valid email address
        if (email && email.includes('@')) {
            const userData = { email, role: 'user' };
            setUser(userData);
            localStorage.setItem('cybershield_user', JSON.stringify(userData));
            return { success: true };
        }
        return { success: false, message: "Please enter a valid email address." };
    };


    const logout = () => {
        setUser(null);
        localStorage.removeItem('cybershield_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};
