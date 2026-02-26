import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                width: '100%'
            }}>
                <main style={{
                    padding: 'clamp(16px, 4vw, 24px)',
                    flex: 1,
                    maxWidth: '1200px',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    width: '100%',
                    overflowX: 'hidden'
                }}>
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
