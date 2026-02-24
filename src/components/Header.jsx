import React from 'react';
import { Search, Bell, User, Github, Menu } from 'lucide-react';

const Header = () => {
    return (
        <header style={{
            height: 'var(--header-height)',
            backgroundColor: 'var(--card-color)',
            borderBottom: '1px solid var(--border-color)',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            right: 0,
            left: 0,
            zIndex: 90
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'var(--bg-color)', padding: '8px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', minWidth: window.innerWidth > 1024 ? '300px' : '200px' }}>
                    <Search size={18} color="var(--text-secondary)" />
                    <input
                        type="text"
                        placeholder="Search labs, docs..."
                        style={{ background: 'none', border: 'none', color: 'var(--text-main)', marginLeft: '12px', outline: 'none', width: '100%' }}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>
                    <Github size={20} />
                </a>
                <button style={{ color: 'var(--text-secondary)' }}>
                    <Bell size={20} />
                </button>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '4px 12px', borderRadius: '20px', backgroundColor: 'rgba(31, 111, 235, 0.1)', border: '1px solid var(--secondary-accent)' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--secondary-accent)' }}>Guest Explorer</span>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--secondary-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={16} color="white" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
