import React from 'react';
import { motion } from 'framer-motion';
import { Info, ShieldCheck, Mail, Globe, Github, Scale } from 'lucide-react';
import { Card } from '../components/Reusable';

const About = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <header>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Info color="var(--primary-accent)" /> About CyberShield Lab
                </h1>
                <p>The mission behind the project and our commitment to ethical education.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repat(auto-fit, minmax(400px, 1fr))', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Card title="Our Mission">
                        <p style={{ lineHeight: '1.8' }}>
                            CyberShield Lab was founded on the belief that cyber security education should be accessible, interactive, and safe.
                            As the digital landscape becomes increasingly complex, understanding the basic building blocks of security—hiding information,
                            encrypting data, and identifying vulnerabilities—is essential for every aspiring technology professional.
                        </p>
                        <p style={{ lineHeight: '1.8' }}>
                            Our platform provides a "sandbox" environment where students can experiment with cryptographic algorithms and attack simulations
                            without any risk to real-world systems.
                        </p>
                    </Card>

                    <Card title="Ethical Guidelines" icon={<Scale size={20} color="var(--danger)" />}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(255, 77, 77, 0.05)', borderLeft: '4px solid var(--danger)' }}>
                                <p style={{ margin: 0, fontWeight: 600, color: 'var(--danger)', marginBottom: '4px' }}>Strictly Educational</p>
                                <p style={{ margin: 0, fontSize: '0.875rem' }}>All tools and simulations provided here are for learning defensive and offensive patterns in a controlled environment.</p>
                            </div>
                            <div style={{ padding: '16px', borderRadius: '8px', backgroundColor: 'rgba(31, 111, 235, 0.05)', borderLeft: '4px solid var(--secondary-accent)' }}>
                                <p style={{ margin: 0, fontWeight: 600, color: 'var(--secondary-accent)', marginBottom: '4px' }}>Defensive Mindset</p>
                                <p style={{ margin: 0, fontSize: '0.875rem' }}>We encourage a "Blue Team" perspective—understanding attacks to build better defenses.</p>
                            </div>
                        </div>
                    </Card>
                </section>

                <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <Card title="Connect With Us">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
                                <Github size={20} /> github.com/cybershield
                            </a>
                            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
                                <Globe size={20} /> cybershield-lab.io
                            </a>
                            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
                                <Mail size={20} /> contact@cybershield.io
                            </a>
                        </div>
                    </Card>

                    <Card style={{ backgroundColor: 'var(--primary-accent)', color: '#000' }}>
                        <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Want to Join?</h3>
                        <p style={{ color: '#000', opacity: 0.8, fontSize: '0.875rem', marginTop: '8px' }}>
                            Join our community of ethical hackers and security researchers.
                        </p>
                        <button style={{
                            marginTop: '16px',
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#000',
                            color: 'var(--primary-accent)',
                            borderRadius: '8px',
                            fontWeight: 700
                        }}>
                            Join Discord
                        </button>
                    </Card>
                </section>
            </div>
        </div>
    );
};

export default About;
