import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, ShieldAlert, Play, RotateCcw, ShieldCheck, Bug, Activity, Info } from 'lucide-react';
import { Card } from '../components/Reusable';
import { useSimulation } from '../contexts/SimulationContext';

const EthicalHackingLab = () => {
    const [activeAttack, setActiveAttack] = useState(null);
    const [logs, setLogs] = useState([]);
    const [isSimulating, setIsSimulating] = useState(false);
    const terminalRef = useRef(null);
    const { addResult } = useSimulation();

    const attacks = [
        {
            id: 'scan',
            name: 'Port Scanning',
            description: 'Identifying open ports and services on a target system.',
            risk: 'Medium',
            mitigation: 'Use firewalls to block unused ports and implement Intrusion Detection Systems (IDS).',
            logSteps: [
                'Starting Nmap scan on 192.168.1.1...',
                'Scanning 1000 ports...',
                'Discovered open port: 80 (HTTP) - Apache httpd 2.4.41',
                'Discovered open port: 22 (SSH) - OpenSSH 8.2p1',
                'Discovered open port: 443 (HTTPS) - OpenSSL 1.1.1f',
                'Scan complete. 3 services detected.'
            ]
        },
        {
            id: 'dos',
            name: 'DoS Simulation',
            description: 'Denial of Service attack aimed at making a server unavailable.',
            risk: 'High',
            mitigation: 'Implement rate limiting and use a Content Delivery Network (CDN) with DDoS protection.',
            logSteps: [
                'Initializing high-frequency request flood...',
                'Target: commerce-api.local (10.0.0.5)',
                'RPS: 50,000 requests per second',
                'Server latency increasing: 200ms...',
                'Server latency increasing: 1500ms...',
                'ERROR: 503 Service Unavailable',
                'Target server has crashed.'
            ]
        },
        {
            id: 'phish',
            name: 'Phishing Awareness',
            description: 'Social engineering to deceive users into giving sensitive info.',
            risk: 'Critical',
            mitigation: 'Enable Multi-Factor Authentication (MFA) and train users to recognize suspicious emails.',
            logSteps: [
                'Generating spoofed login page: account-verify.net',
                'Deploying phishing email to target database...',
                'User "john_doe" clicked link.',
                'Credentials intercepted: user/password-1234',
                'Bypassing simple auth patterns...',
                'Unauthorized access granted to Finance DB.'
            ]
        }
    ];

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [logs]);

    const startSimulation = (attack) => {
        setActiveAttack(attack);
        setLogs([]);
        setIsSimulating(true);

        let currentStep = 0;
        const interval = setInterval(() => {
            if (currentStep < attack.logSteps.length) {
                setLogs(prev => [...prev, { text: attack.logSteps[currentStep], type: 'info', id: Date.now() + currentStep }]);
                currentStep++;
            } else {
                clearInterval(interval);
                setIsSimulating(false);
                addResult({
                    type: attack.name,
                    details: `Simulated ${attack.name} and reviewed mitigation strategy.`,
                    riskLevel: attack.risk
                });
            }
        }, 1000);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--danger)', marginBottom: '8px' }}>
                    <ShieldAlert size={24} />
                    <h4 style={{ margin: 0 }}>OFFENSE SIMULATION</h4>
                </div>
                <h1>Ethical Hacking Lab</h1>
                <p>Simulation environment to understand cyber attack vectors and their corresponding defensive strategies.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '24px' }}>
                {/* Attack Selector */}
                <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h2 style={{ fontSize: '1.25rem' }}>Select Attack Vector</h2>
                    {attacks.map(attack => (
                        <div
                            key={attack.id}
                            onClick={() => !isSimulating && setActiveAttack(attack)}
                            style={{
                                padding: '20px',
                                borderRadius: '12px',
                                backgroundColor: activeAttack?.id === attack.id ? 'rgba(31, 111, 235, 0.1)' : 'var(--card-color)',
                                border: `1px solid ${activeAttack?.id === attack.id ? 'var(--secondary-accent)' : 'var(--border-color)'}`,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{attack.name}</h3>
                                <span style={{
                                    fontSize: '0.75rem',
                                    padding: '2px 8px',
                                    borderRadius: '10px',
                                    backgroundColor: attack.risk === 'Critical' || attack.risk === 'High' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(0, 255, 136, 0.1)',
                                    color: attack.risk === 'Critical' || attack.risk === 'High' ? 'var(--danger)' : 'var(--primary-accent)',
                                    border: `1px solid ${attack.risk === 'Critical' || attack.risk === 'High' ? 'var(--danger)' : 'var(--primary-accent)'}`
                                }}>
                                    {attack.risk} Risk
                                </span>
                            </div>
                            <p style={{ fontSize: '0.85rem', marginBottom: 0 }}>{attack.description}</p>
                        </div>
                    ))}
                </section>

                {/* Terminal/Simulation */}
                <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{
                        backgroundColor: '#000',
                        borderRadius: '12px',
                        border: '1px solid var(--border-color)',
                        height: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}>
                        <div style={{ padding: '12px 20px', backgroundColor: '#161b22', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>cyber-terminal v2.4</span>
                        </div>

                        <div
                            ref={terminalRef}
                            style={{
                                flex: 1,
                                padding: '20px',
                                fontFamily: '"JetBrains Mono", monospace',
                                fontSize: '0.9rem',
                                color: '#fff',
                                overflowY: 'auto'
                            }}
                        >
                            {logs.length === 0 && <p style={{ color: '#555' }}>[ SYSTEM IDLE - SELECT VECTOR TO START ]</p>}
                            {logs.map(log => (
                                <div key={log.id} style={{ marginBottom: '8px', display: 'flex', gap: '8px' }}>
                                    <span style={{ color: 'var(--primary-accent)' }}>{'>'}</span>
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        {log.text}
                                    </motion.span>
                                </div>
                            ))}
                            {isSimulating && (
                                <motion.span
                                    animate={{ opacity: [0, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    style={{ display: 'inline-block', width: '8px', height: '16px', backgroundColor: 'var(--primary-accent)' }}
                                />
                            )}
                        </div>

                        <div style={{ padding: '12px 20px', borderTop: '1px solid var(--border-color)', textAlign: 'right' }}>
                            <button
                                onClick={() => startSimulation(activeAttack)}
                                disabled={!activeAttack || isSimulating}
                                style={{
                                    backgroundColor: 'var(--primary-accent)',
                                    color: '#000',
                                    padding: '6px 16px',
                                    borderRadius: '4px',
                                    fontWeight: 600,
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    opacity: (!activeAttack || isSimulating) ? 0.5 : 1
                                }}
                            >
                                <Play size={16} fill="black" /> Execute Payload
                            </button>
                        </div>
                    </div>

                    {activeAttack && !isSimulating && logs.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Card title="Mitigation Strategy" icon={<ShieldCheck size={20} />}>
                                <p style={{ color: 'var(--text-main)', marginBottom: '12px' }}>{activeAttack.mitigation}</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(0, 255, 136, 0.05)', border: '1px solid rgba(0, 255, 136, 0.2)' }}>
                                        <h5 style={{ margin: '0 0 4px 0', color: 'var(--primary-accent)', fontSize: '0.8rem' }}>THREAT DETECTED</h5>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Bug size={14} />
                                            <span style={{ fontSize: '0.9rem' }}>Exploit Neutralized</span>
                                        </div>
                                    </div>
                                    <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'rgba(31, 111, 235, 0.05)', border: '1px solid rgba(31, 111, 235, 0.2)' }}>
                                        <h5 style={{ margin: '0 0 4px 0', color: 'var(--secondary-accent)', fontSize: '0.8rem' }}>SURVEILLANCE</h5>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Activity size={14} />
                                            <span style={{ fontSize: '0.9rem' }}>Logs Generated</span>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </section>
            </div>

            {/* Educational Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                <Card title="Concept Overview" icon={<Info size={20} />}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '8px' }}>What is Ethical Hacking?</h3>
                        <p>Ethical hacking (or penetration testing) is the legal and authorized practice of finding vulnerabilities in an application or infrastructure. Unlike malicious hacking, ethical hackers work with permission to improve security.</p>

                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginTop: '16px', marginBottom: '8px' }}>Security Relevance</h3>
                        <ul style={{ paddingLeft: '20px', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li><strong>Vulnerability Management:</strong> Identifying and patching security holes before they can be exploited by real threat actors.</li>
                            <li><strong>Risk Assessment:</strong> Helping organizations understand their security posture and prioritize defensive investments.</li>
                            <li><strong>Incident Response:</strong> Training security teams to recognize attack patterns and respond effectively to real-world breaches.</li>
                        </ul>
                    </div>
                </Card>

                <Card title="Lab Insights" icon={<Activity size={20} />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <h4 style={{ color: 'var(--danger)', marginBottom: '4px' }}>Red Teaming (Offense)</h4>
                            <p style={{ fontSize: '0.875rem' }}>Simulates the mindset of an attacker. By using the same tools and techniques as adversaries, we can uncover hidden weaknesses.</p>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--primary-accent)', marginBottom: '4px' }}>Blue Teaming (Defense)</h4>
                            <p style={{ fontSize: '0.875rem' }}>Focuses on the defensive measures—mitigations, firewalls, and detection systems that neutralize the simulated threats.</p>
                        </div>
                        <div style={{ padding: '12px', backgroundColor: 'rgba(31, 111, 235, 0.05)', border: '1px dashed var(--secondary-accent)', borderRadius: '8px' }}>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--secondary-accent)' }}><strong>DISCLAIMER:</strong> Ethical hacking requires strict adherence to legal and ethical guidelines. Never test systems you do not own or have explicit permission to audit.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default EthicalHackingLab;
