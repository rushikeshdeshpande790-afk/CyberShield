import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    BarChart3,
    FileText,
    BookOpen,
    Info,
    Home,
    LayoutDashboard,
    ShieldCheck
} from 'lucide-react';

const Navbar = () => {
    const navItems = [
        { name: 'Welcome', path: '/', icon: <Home size={18} /> },
        { name: 'Overview', path: '/overview', icon: <BarChart3 size={18} /> },
        { name: 'Lab Hub', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
        { name: 'Reports', path: '/reports', icon: <FileText size={18} /> },
        { name: 'Docs', path: '/docs', icon: <BookOpen size={18} /> },
        { name: 'About', path: '/about', icon: <Info size={18} /> },
    ];

    return (
        <nav style={{
            backgroundColor: 'var(--card-color)',
            borderBottom: '1px solid var(--border-color)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            height: '60px',
            position: 'sticky',
            top: 0,
            zIndex: 80
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginRight: '32px', borderRight: '1px solid var(--border-color)', paddingRight: '24px' }}>
                <ShieldCheck color="var(--primary-accent)" size={28} />
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-accent)', letterSpacing: '-0.02em' }}>CyberShield</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto', flex: 1, height: '100%', scrollbarWidth: 'none', whiteSpace: 'nowrap' }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '0 16px',
                            height: '100%',
                            color: isActive ? 'var(--primary-accent)' : 'var(--text-secondary)',
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            borderBottom: isActive ? '2px solid var(--primary-accent)' : '2px solid transparent',
                            transition: 'all 0.2s ease'
                        })}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
