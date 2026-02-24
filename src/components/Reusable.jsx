import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, title, subtitle, icon, className = '', style = {} }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            style={{
                backgroundColor: 'var(--card-color)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                padding: '24px',
                ...style
            }}
            className={`card ${className}`}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                    {title && <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{title}</h3>}
                    {subtitle && <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{subtitle}</p>}
                </div>
                {icon && <div style={{ color: 'var(--primary-accent)' }}>{icon}</div>}
            </div>
            {children}
        </motion.div>
    );
};

export const StatCard = ({ label, value, trend, icon, color = 'var(--primary-accent)' }) => {
    return (
        <Card style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: `rgba(${color === 'var(--primary-accent)' ? '0, 255, 136' : '31, 111, 235'}, 0.1)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: color
                }}>
                    {icon}
                </div>
                <div>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{label}</p>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>{value}</h2>
                </div>
            </div>
        </Card>
    );
};
