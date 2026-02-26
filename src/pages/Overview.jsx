import React from 'react';
import { motion } from 'framer-motion';
import {
    ShieldCheck,
    History,
    AlertTriangle,
    Zap,
    Activity,
    BarChart3
} from 'lucide-react';
import { Card, StatCard } from '../components/Reusable';
import { useSimulation } from '../contexts/SimulationContext';

const Overview = () => {
    const { history } = useSimulation();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
        >
            <header>
                <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>System Overview</h1>
                <p>Comprehensive analytics and simulation history for your security research.</p>
            </header>

            {/* Stats Grid */}
            <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))' }}>
                <StatCard label="Total Simulations" value={history.length} icon={<Zap size={24} />} />
                <StatCard label="Security Level" value="Advanced" color="var(--secondary-accent)" icon={<ShieldCheck size={24} />} />
                <StatCard label="Network Health" value="98%" color="var(--primary-accent)" icon={<Activity size={24} />} />
                <StatCard label="Threat Awareness" value="High" color="var(--danger)" icon={<AlertTriangle size={24} />} />
            </div>

            <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))' }}>
                {/* Full Activity Log */}
                <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginBottom: '0' }}>Complete Activity Stream</h2>
                    <Card style={{ padding: '0', overflow: 'hidden' }}>
                        {history.length > 0 ? (
                            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                {history.map((act, idx) => (
                                    <li key={act.id} style={{
                                        padding: 'clamp(12px, 3vw, 20px)',
                                        borderBottom: idx === history.length - 1 ? 'none' : '1px solid var(--border-color)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'clamp(12px, 3vw, 16px)',
                                        flexWrap: 'wrap'
                                    }}>
                                        <div style={{
                                            padding: '10px',
                                            borderRadius: '10px',
                                            backgroundColor: act.riskLevel === 'Critical' || act.riskLevel === 'High' ? 'rgba(255, 77, 77, 0.1)' : 'var(--bg-color)',
                                            color: act.riskLevel === 'Critical' || act.riskLevel === 'High' ? 'var(--danger)' : 'var(--text-main)'
                                        }}>
                                            <History size={20} />
                                        </div>
                                        <div style={{ flex: '1 1 200px' }}>
                                            <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-main)' }}>{act.type}</p>
                                            <p style={{ margin: 0, fontSize: '0.85rem' }}>{act.details}</p>
                                            <p style={{ margin: '4px 0 0', fontSize: '0.75rem', opacity: 0.6 }}>{act.date}</p>
                                        </div>
                                        <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-accent)', display: 'block' }}>{act.id}</span>
                                            <span style={{
                                                fontSize: '0.65rem',
                                                padding: '2px 6px',
                                                borderRadius: '4px',
                                                backgroundColor: 'var(--bg-color)',
                                                color: act.riskLevel === 'Critical' || act.riskLevel === 'High' ? 'var(--danger)' : 'var(--secondary-accent)'
                                            }}>
                                                {act.riskLevel}
                                            </span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                                <History size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                                <p>No activity logs recorded yet.</p>
                            </div>
                        )}
                    </Card>
                </section>

                {/* Analytics Card */}
                <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h2 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginBottom: '0' }}>Insights</h2>
                    <Card title="Traffic Analysis" icon={<BarChart3 size={20} />}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {[
                                { label: 'Encryption Efficiency', value: '92%' },
                                { label: 'Malware Detection', value: '100%' },
                                { label: 'Network Latency', value: '4ms' }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                                        <span>{stat.label}</span>
                                        <span style={{ color: 'var(--primary-accent)' }}>{stat.value}</span>
                                    </div>
                                    <div style={{ height: '4px', backgroundColor: 'var(--bg-color)', borderRadius: '2px', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: stat.value }}
                                            style={{ height: '100%', backgroundColor: 'var(--primary-accent)' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card title="Security Score" style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 800, color: 'var(--primary-accent)', margin: '10px 0' }}>A+</div>
                        <p style={{ fontSize: '0.85rem' }}>Your current security configuration meets the highest standards.</p>
                    </Card>
                </section>
            </div>

        </motion.div>
    );
};

export default Overview;
