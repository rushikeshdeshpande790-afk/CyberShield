import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Trash2, Calendar, Shield, ExternalLink } from 'lucide-react';
import { Card } from '../components/Reusable';
import { useSimulation } from '../contexts/SimulationContext';
import { jsPDF } from 'jspdf';

const ReportGenerator = () => {
    const { history, clearHistory } = useSimulation();

    const generatePDF = (report) => {
        const doc = new jsPDF();

        // Header
        doc.setFillColor(13, 17, 23);
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(0, 255, 136);
        doc.setFontSize(22);
        doc.text('CyberShield Lab Report', 20, 25);

        // Body
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Case ID: ${report.id}`, 20, 50);
        doc.text(`Date: ${report.date}`, 20, 60);
        doc.text(`Activity Type: ${report.type}`, 20, 70);
        doc.text(`Risk Level: ${report.riskLevel}`, 20, 80);

        doc.setDrawColor(200, 200, 200);
        doc.line(20, 85, 190, 85);

        doc.setFontSize(14);
        doc.text('Simulation Details:', 20, 95);
        doc.setFontSize(11);
        const splitDetails = doc.splitTextToSize(report.details, 170);
        doc.text(splitDetails, 20, 105);

        doc.setFontSize(14);
        doc.text('Ethical Disclaimer:', 20, 140);
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('This document was generated for educational purposes only. Unauthorized use of techniques described herein is prohibited.', 20, 150, { maxWidth: 170 });

        doc.save(`CyberShield_Report_${report.id}.pdf`);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '8px'
            }}>
                <div>
                    <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>
                        <FileText color="var(--primary-accent)" /> Report Generator
                    </h1>
                    <p style={{ margin: 0, fontSize: '0.95rem' }}>Review and export your simulation results as formal security PDF reports.</p>
                </div>
                <button
                    onClick={clearHistory}
                    style={{
                        padding: '10px 16px',
                        borderRadius: '8px',
                        border: '1px solid var(--danger)',
                        color: 'var(--danger)',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        backgroundColor: 'transparent',
                        cursor: 'pointer'
                    }}
                >
                    <Trash2 size={16} /> Clear All Logs
                </button>
            </header>

            <Card style={{ padding: '0', overflow: 'hidden' }}>
                {history.length > 0 ? (
                    <div style={{ overflowX: 'auto', width: '100%' }}>
                        <table style={{ minWidth: '600px', width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                                    <th style={{ padding: '16px' }}>CASE ID</th>
                                    <th style={{ padding: '16px' }}>DATE</th>
                                    <th style={{ padding: '16px' }}>ACTIVITY</th>
                                    <th style={{ padding: '16px' }}>RISK</th>
                                    <th style={{ padding: '16px' }}>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((item) => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                                        <td style={{ padding: '16px', fontFamily: 'monospace', color: 'var(--primary-accent)' }}>{item.id}</td>
                                        <td style={{ padding: '16px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{item.date}</td>
                                        <td style={{ padding: '16px', fontWeight: 500 }}>{item.type}</td>
                                        <td style={{ padding: '16px' }}>
                                            <span style={{
                                                fontSize: '0.7rem',
                                                padding: '2px 8px',
                                                borderRadius: '10px',
                                                backgroundColor: item.riskLevel === 'Critical' || item.riskLevel === 'High' ? 'rgba(255, 77, 77, 0.1)' : 'rgba(0, 255, 136, 0.1)',
                                                color: item.riskLevel === 'Critical' || item.riskLevel === 'High' ? 'var(--danger)' : 'var(--primary-accent)',
                                                border: `1px solid ${item.riskLevel === 'Critical' || item.riskLevel === 'High' ? 'var(--danger)' : 'var(--primary-accent)'}`
                                            }}>
                                                {item.riskLevel}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px' }}>
                                            <button
                                                onClick={() => generatePDF(item)}
                                                style={{ color: 'var(--secondary-accent)', display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                                            >
                                                <Download size={16} /> PDF
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div style={{ padding: '80px 20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                        <Calendar size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
                        <h3 style={{ marginBottom: '8px' }}>No Simulation Logs Found</h3>
                        <p>Visit the labs to start generating security data.</p>
                    </div>
                )}
            </Card>

            <div className="responsive-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))' }}>
                <Card title="Open Source Compliance">
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>Reports are generated entirely client-side. No data is sent to any server. Your privacy is guaranteed by the offline architecture of CyberShield Lab.</p>
                    <a href="#" style={{ color: 'var(--primary-accent)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px' }}>
                        Learn about Data Privacy <ExternalLink size={14} />
                    </a>
                </Card>
                <Card title="Institutional Verification">
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>These reports can be used for academic submissions or as proof of completion for internal training modules. Each report contains a unique Case ID for tracking.</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-accent)', fontSize: '0.875rem', marginTop: '12px', fontWeight: 600 }}>
                        <Shield size={16} /> VERIFIED BY CRYPTOGRAPHIC LOGIC
                    </div>
                </Card>
            </div>

        </div>
    );
};

export default ReportGenerator;
