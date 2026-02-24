import React, { createContext, useContext, useState, useEffect } from 'react';

const SimulationContext = createContext();

export const useSimulation = () => useContext(SimulationContext);

export const SimulationProvider = ({ children }) => {
    const [history, setHistory] = useState(() => {
        const saved = localStorage.getItem('cybershield_history');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('cybershield_history', JSON.stringify(history));
    }, [history]);

    const addResult = (result) => {
        const newResult = {
            id: `CASE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            date: new Date().toLocaleString(),
            ...result
        };
        setHistory(prev => [newResult, ...prev]);
        return newResult;
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return (
        <SimulationContext.Provider value={{ history, addResult, clearHistory }}>
            {children}
        </SimulationContext.Provider>
    );
};
