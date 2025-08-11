import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on app start
        const initAuth = () => {
            const storedToken = localStorage.getItem('token');
            const storedUser = localStorage.getItem('user');
            
            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8081/api/auth/login', {
                username,
                password
            });

            // Backend returns: { token, username, role }
            const { token: authToken, username: usernameData, role } = response.data;
            
            // Create user object from the response
            const userData = {
                username: usernameData,
                role: role
            };
            
            // Store user data and token
            setUser(userData);
            setToken(authToken);
            localStorage.setItem('token', authToken);
            localStorage.setItem('user', JSON.stringify(userData));
            
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const register = async (username, password, role = 'USER') => {
        try {
            const response = await axios.post('http://localhost:8081/api/auth/signup', {
                username,
                password,
                role
            });

            // Backend returns: { token, username, role }
            const { token: authToken, username: usernameData, role: userRole } = response.data;
            
            // Create user object from the response
            const userData = {
                username: usernameData,
                role: userRole
            };
            
            // Store user data and token
            setUser(userData);
            setToken(authToken);
            localStorage.setItem('token', authToken);
            localStorage.setItem('user', JSON.stringify(userData));
            
            return response.data;
        } catch (error) {
            console.error('Register error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const isAuthenticated = () => {
        return !!token && !!user;
    };

    const isAdmin = () => {
        return user && user.role === 'ADMIN';
    };

    const isUser = () => {
        return user && user.role === 'USER';
    };

    const value = {
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
        isAdmin,
        isUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};






