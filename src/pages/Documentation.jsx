import React from 'react';
import { Book, Code, Terminal, Rocket, Github, Shield } from 'lucide-react';
import { Card } from '../components/Reusable';

const Documentation = () => {
    const sections = [
        {
            title: 'Project Overview',
            icon: <Shield size={20} color="var(--primary-accent)" />,
            content: 'CyberShield Lab is an open-source educational simulator designed to teach cybersecurity concepts through interactive simulations. Built with React, it operates entirely offline to ensure user privacy and data security.'
        },
        {
            title: 'Core Features',
            icon: <Rocket size={20} color="var(--primary-accent)" />,
            content: [
                'Steganography: LSB encoding/decoding in images.',
                'Encryption: Classical ciphers (Caesar, Vigenère) and Modern AES-256.',
                'Ethical Hacking: Terminal-based attack simulations and mitigation strategy.',
                'Report Generation: Export simulation results as professional PDFs.'
            ]
        },
        {
            title: 'Technologies Used',
            icon: <Code size={20} color="var(--primary-accent)" />,
            content: 'React 18+, Vite, Framer Motion for animations, Crypto-JS for cryptographic logic, jsPDF for report generation, and Lucide React for modern iconography.'
        },
        {
            title: 'How to Run Locally',
            icon: <Terminal size={20} color="var(--primary-accent)" />,
            content: 'Clone the repository, run `npm install`, and then `npm run dev`. The application will be available at http://localhost:5173.'
        }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <header>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Book color="var(--primary-accent)" /> Documentation
                </h1>
                <p>Comprehensive guide to the CyberShield Lab project, its features, and how to contribute.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {sections.map((section, idx) => (
                    <Card key={idx} title={section.title} icon={section.icon}>
                        {Array.isArray(section.content) ? (
                            <ul style={{ paddingLeft: '20px', listStyle: 'disc' }}>
                                {section.content.map((item, i) => (
                                    <li key={i} style={{ marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{section.content}</p>
                        )}
                    </Card>
                ))}
            </div>

            <Card title="Contribution Guide" icon={<Github size={20} />}>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <p>We welcome contributions from the community! To contribute:</p>
                    <ol style={{ paddingLeft: '20px', marginTop: '12px' }}>
                        <li style={{ marginBottom: '8px' }}>Fork the repository on GitHub.</li>
                        <li style={{ marginBottom: '8px' }}>Create a new branch for your feature or bugfix.</li>
                        <li style={{ marginBottom: '8px' }}>Commit your changes with clear, descriptive messages.</li>
                        <li>Submit a Pull Request for review.</li>
                    </ol>
                </div>
            </Card>

            <Card title="License">
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    This project is released under the <strong>MIT License</strong>. You are free to use, modify, and distribute it for educational purposes.
                </p>
            </Card>
        </div>
    );
};

export default Documentation;
