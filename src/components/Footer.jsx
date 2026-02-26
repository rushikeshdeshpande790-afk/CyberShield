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
                padding: 'clamp(12px, 4vw, 16px)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                marginBottom: '24px'
            }}>
                <ShieldAlert color="var(--danger)" size={24} style={{ flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                    <strong>Ethical Disclaimer:</strong> This project is developed strictly for educational and ethical cybersecurity learning purposes only.
                    Misuse of these tools for unauthorized activities is strictly prohibited.
                </p>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '20px',
                color: 'var(--text-secondary)',
                fontSize: '0.875rem',
                textAlign: 'center'
            }}>
                <span style={{ flex: '1 1 300px', textAlign: 'left' }}>CyberShield Lab – Open Source Educational Simulator</span>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a>
                    <a href="#" style={{ color: 'inherit' }}>Terms of Use</a>
                    <a href="#" style={{ color: 'inherit' }}>GitHub</a>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
