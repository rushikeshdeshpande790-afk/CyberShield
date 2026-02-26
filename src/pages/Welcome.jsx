import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ShieldCheck, ArrowRight, Lock, Terminal, Image as ImageIcon, Database, Cpu, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Antigravity cursor effect particles
    const Particles = () => {
        const particles = Array.from({ length: 15 });
        return (
            <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
                {particles.map((_, i) => (
                    <FloatingIcon key={i} index={i} mousePosition={mousePosition} />
                ))}
            </div>
        );
    };

    const FloatingIcon = ({ index, mousePosition }) => {
        const icons = [<Lock />, <ShieldCheck />, <Terminal />, <Database />, <Cpu />, <Globe />];
        const icon = icons[index % icons.length];

        // Spring physics for smooth following/reacting
        const x = useSpring(useMotionValue(Math.random() * window.innerWidth), { stiffness: 50 + index * 10, damping: 20 });
        const y = useSpring(useMotionValue(Math.random() * window.innerHeight), { stiffness: 50 + index * 10, damping: 20 });

        useEffect(() => {
            // Calculate distance from mouse
            const dx = mousePosition.x - x.get();
            const dy = mousePosition.y - y.get();
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 300) {
                // "Antigravity" push away effect
                const angle = Math.atan2(dy, dx);
                const force = (300 - dist) / 2;
                x.set(x.get() - Math.cos(angle) * force);
                y.set(y.get() - Math.sin(angle) * force);
            } else {
                // Drift back to random positions or just drift
                x.set(x.get() + (Math.random() - 0.5) * 2);
                y.set(y.get() + (Math.random() - 0.5) * 2);
            }
        }, [mousePosition, x, y]);

        return (
            <motion.div
                style={{
                    position: 'absolute',
                    x,
                    y,
                    opacity: 0.1,
                    color: 'var(--primary-accent)',
                    filter: 'blur(1px)'
                }}
            >
                {React.cloneElement(icon, { size: 20 + (index % 5) * 10 })}
            </motion.div>
        );
    };

    return (
        <div ref={containerRef} style={{
            minHeight: 'calc(100vh - 60px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px 20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Particles />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ zIndex: 1, position: 'relative' }}
            >
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '24px',
                        backgroundColor: 'rgba(0, 255, 136, 0.05)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 32px',
                        border: '1px solid rgba(0, 255, 136, 0.3)',
                        boxShadow: '0 0 40px rgba(0, 255, 136, 0.1)'
                    }}
                >
                    <ShieldCheck size={50} color="var(--primary-accent)" />
                </motion.div>

                <h1 style={{ marginBottom: '20px', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
                    Secure Your <br />
                    <span style={{
                        background: 'linear-gradient(90deg, var(--primary-accent), var(--secondary-accent))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                    }}>Digital Frontier</span>
                </h1>

                <p style={{ fontSize: 'clamp(1rem, 3vw, 1.4rem)', color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 48px', lineHeight: '1.6' }}>
                    Welcome to <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>CyberShield Lab</span>.
                    The next-generation open-source simulator for mastering cybersecurity through immersive, hands-on experience.
                </p>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px', flexWrap: 'wrap' }}>
                    <Link to="/dashboard" style={{ width: 'min(100%, 300px)' }}>
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 136, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                width: '100%',
                                padding: '16px 32px',
                                backgroundColor: 'var(--primary-accent)',
                                color: '#000',
                                borderRadius: '14px',
                                fontWeight: 800,
                                fontSize: '1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Initialize Hub <ArrowRight size={20} />
                        </motion.button>
                    </Link>
                    <Link to="/docs" style={{ width: 'min(100%, 300px)' }}>
                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                width: '100%',
                                padding: '16px 32px',
                                backgroundColor: 'transparent',
                                color: 'var(--text-main)',
                                borderRadius: '14px',
                                border: '1px solid var(--border-color)',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            Documentation
                        </motion.button>
                    </Link>
                </div>
            </motion.div>

            <div className="responsive-grid" style={{ width: '100%', maxWidth: '1100px', position: 'relative', zIndex: 1 }}>
                {[
                    { icon: <ImageIcon size={28} />, title: 'Steganography', desc: 'Conceal critical data within pixel structures with mathematical precision.' },
                    { icon: <Lock size={28} />, title: 'Advanced Crypto', desc: 'Implement industry-standard AES-256 and classical ciphers for data protection.' },
                    { icon: <Terminal size={28} />, title: 'Active Research', desc: 'Analyze attack vectors and defensive countermeasures in a sandbox environment.' }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.8 }}
                        whileHover={{ y: -5, borderColor: 'var(--primary-accent)' }}
                        style={{
                            padding: 'min(36px, 8vw)',
                            backgroundColor: 'var(--card-color)',
                            borderRadius: '24px',
                            border: '1px solid var(--border-color)',
                            textAlign: 'left',
                            transition: 'border-color 0.3s ease'
                        }}
                    >
                        <div style={{ color: 'var(--primary-accent)', marginBottom: '20px' }}>{item.icon}</div>
                        <h3 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>{item.title}</h3>
                        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>{item.desc}</p>
                    </motion.div>
                ))}
            </div>

        </div>
    );
};

export default Welcome;
