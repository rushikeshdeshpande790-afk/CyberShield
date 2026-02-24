import React from 'react';
import { motion } from 'framer-motion';
import {
    Terminal,
    Image as ImageIcon,
    Lock,
    ChevronRight,
    ShieldCheck,
    Cpu,
    Globe
} from 'lucide-react';
import { Card } from '../components/Reusable';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const labCards = [
        {
            title: 'Steganography Lab',
            desc: 'Conceal secret messages inside digital images using Least Significant Bit (LSB) manipulation.',
            icon: <ImageIcon size={32} />,
            path: '/steganography',
            color: 'var(--primary-accent)'
        },
        {
            title: 'Encryption Lab',
            desc: 'Explore classical ciphers like Caesar & Vigenère alongside modern AES encryption standards.',
            icon: <Lock size={32} />,
            path: '/encryption',
            color: 'var(--secondary-accent)'
        },
        {
            title: 'Ethical Hacking Lab',
            desc: 'Simulate penetration testing scenarios including port scanning and DoS in a safe environment.',
            icon: <Terminal size={32} />,
            path: '/hacking',
            color: 'var(--danger)'
        }
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}
        >
            <header>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <Cpu size={24} color="var(--primary-accent)" />
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--secondary-accent)' }}>OPERATIONAL STATUS: READY</span>
                </div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800 }}>Simulation Hub</h1>
                <p style={{ maxWidth: '600px' }}>Select an active simulation vector to begin your cybersecurity training. Each lab provides a sandbox environment for practical learning.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                {labCards.map((lab, i) => (
                    <Link to={lab.path} key={i}>
                        <motion.div
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            style={{ height: '100%' }}
                        >
                            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    opacity: 0.05,
                                    color: lab.color,
                                    transform: 'rotate(-15deg)'
                                }}>
                                    {cloneElement(lab.icon, { size: 120 })}
                                </div>

                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '16px',
                                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '24px',
                                    color: lab.color,
                                    border: `1px solid rgba(255, 255, 255, 0.1)`
                                }}>
                                    {lab.icon}
                                </div>

                                <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>{lab.title}</h2>
                                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1, marginBottom: '24px' }}>
                                    {lab.desc}
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: lab.color, fontWeight: 700, fontSize: '0.875rem' }}>
                                    Launch Lab <ChevronRight size={16} />
                                </div>
                            </Card>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <div style={{
                marginTop: '20px',
                padding: '30px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(31, 111, 235, 0.1) 0%, rgba(0, 255, 136, 0.05) 100%)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <h3 style={{ marginBottom: '8px' }}>Global Threat Map</h3>
                    <p style={{ margin: 0, fontSize: '0.875rem', opacity: 0.7 }}>Simulated network traffic monitoring is active. No anomalies detected.</p>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-accent)', fontSize: '0.875rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-accent)', boxShadow: '0 0 10px var(--primary-accent)' }} />
                        Secure
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                        <Globe size={16} /> Encrypted
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Helper for icon cloning
const cloneElement = (element, props) => {
    return React.cloneElement(element, props);
};

export default Dashboard;
