import React from 'react';
import { ShieldAlert } from 'lucide-react';

const Footer = () => {
    return (
        <footer style={{
            padding: '24px',
            borderTop: '1px solid var(--border-color)',
            marginTop: 'auto',
            backgroundColor: 'var(--card-color)'
        }}>
            <div style={{
                backgroundColor: 'rgba(255, 77, 77, 0.05)',
                border: '1px solid rgba(255, 77, 77, 0.2)',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '20px'
            }}>
                <ShieldAlert color="var(--danger)" size={24} />
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-main)' }}>
                    <strong>Ethical Disclaimer:</strong> This project is developed strictly for educational and ethical cybersecurity learning purposes only.
                    Misuse of these tools for unauthorized activities is strictly prohibited.
                </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <span>CyberShield Lab – Open Source Educational Simulator</span>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Use</a>
                    <a href="#">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
