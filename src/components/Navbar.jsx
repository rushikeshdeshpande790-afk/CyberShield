import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    BarChart3,
    FileText,
    BookOpen,
    Info,
    Home,
    LayoutDashboard,
    ShieldCheck,
    LogOut,
    User,
    Menu,
    X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AnimatePresence, motion } from 'framer-motion';
import logo from '../assets/logo.jpg';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

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
            height: 'var(--navbar-height)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginRight: '32px', textDecoration: 'none' }}>
                <img src={logo} alt="CyberShield Logo" style={{ height: '32px', width: 'auto', borderRadius: '4px' }} />
                <span className="desktop-only" style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-accent)', letterSpacing: '-0.02em' }}>CyberShield</span>
            </NavLink>

            {/* Desktop Nav */}
            <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto', flex: 1, height: '100%', scrollbarWidth: 'none', whiteSpace: 'nowrap' }}>
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

            {/* Mobile Menu Toggle */}
            <div style={{ flex: 1 }} className="mobile-only" />
            <button
                className="mobile-only"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{ color: 'var(--text-main)', padding: '8px' }}
            >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* User Section (Desktop) */}
            {isAuthenticated && (
                <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        <User size={16} />
                        <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</span>
                    </div>
                    <button
                        onClick={logout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: 'var(--danger)',
                            fontSize: '0.85rem',
                            fontWeight: 600
                        }}
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            )}

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 'var(--navbar-height)',
                            right: 0,
                            bottom: 0,
                            left: 0,
                            backgroundColor: 'var(--bg-color)',
                            zIndex: 99,
                            padding: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            overflowY: 'auto'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', padding: '0 8px' }}>
                            <img src={logo} alt="CyberShield Logo" style={{ height: '36px', width: 'auto', borderRadius: '4px' }} />
                            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-accent)', letterSpacing: '-0.02em' }}>CyberShield</span>
                        </div>
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                style={({ isActive }) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    backgroundColor: isActive ? 'rgba(0, 255, 136, 0.1)' : 'var(--card-color)',
                                    color: isActive ? 'var(--primary-accent)' : 'var(--text-main)',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    border: `1px solid ${isActive ? 'var(--primary-accent)' : 'var(--border-color)'}`
                                })}
                            >
                                {item.icon}
                                {item.name}
                            </NavLink>
                        ))}

                        {isAuthenticated && (
                            <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', color: 'var(--text-secondary)' }}>
                                    <User size={20} />
                                    <span>{user.email}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '12px',
                                        padding: '16px',
                                        borderRadius: '12px',
                                        backgroundColor: 'rgba(255, 77, 77, 0.1)',
                                        color: 'var(--danger)',
                                        fontWeight: 700,
                                        border: '1px solid var(--danger)'
                                    }}
                                >
                                    <LogOut size={20} /> Logout
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;

