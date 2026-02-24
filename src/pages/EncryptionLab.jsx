import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Hash, Key, RefreshCcw, Info, CheckCircle } from 'lucide-react';
import { Card } from '../components/Reusable';
import {
    caesarCipher,
    vigenereCipher,
    railFenceCipher,
    aesEncrypt,
    aesDecrypt,
    sha256Hash,
    rsaSim
} from '../utils/encryption';
import { useSimulation } from '../contexts/SimulationContext';

const EncryptionLab = () => {
    const [method, setMethod] = useState('caesar');
    const [input, setInput] = useState('');
    const [key, setKey] = useState('');
    const [output, setOutput] = useState('');
    const [isDecrypt, setIsDecrypt] = useState(false);
    const { addResult } = useSimulation();

    const handleProcess = () => {
        let result = '';

        switch (method) {
            case 'caesar':
                result = caesarCipher(input, parseInt(key) || 0, isDecrypt);
                break;
            case 'vigenere':
                result = vigenereCipher(input, key || 'key', isDecrypt);
                break;
            case 'railfence':
                result = railFenceCipher(input, parseInt(key) || 2, isDecrypt);
                break;
            case 'aes':
                result = isDecrypt ? aesDecrypt(input, key) : aesEncrypt(input, key);
                break;
            case 'sha256':
                result = sha256Hash(input);
                break;
            case 'rsa':
                result = isDecrypt ? rsaSim.decrypt(input, key) : rsaSim.encrypt(input, key);
                break;
            default:
                break;
        }

        setOutput(result);
        addResult({
            type: `${method.toUpperCase()} ${isDecrypt ? 'Decryption' : 'Encryption'}`,
            details: `${method} processing of ${input.length} characters`,
            riskLevel: 'Low'
        });
    };

    const methods = [
        { id: 'caesar', name: 'Caesar Cipher', category: 'Classical' },
        { id: 'vigenere', name: 'Vigenère Cipher', category: 'Classical' },
        { id: 'railfence', name: 'Rail Fence', category: 'Classical' },
        { id: 'aes', name: 'AES-256', category: 'Modern' },
        { id: 'sha256', name: 'SHA-256 (Hash)', category: 'Modern' },
        { id: 'rsa', name: 'RSA Simulation', category: 'Modern' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Lock color="var(--primary-accent)" /> Encryption Lab
                </h1>
                <p>Explore the evolution of cryptography from ancient classical ciphers to modern military-grade encryption.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                {/* Configuration Section */}
                <Card title="Configuration">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem' }}>Encryption Method</label>
                            <select
                                value={method}
                                onChange={(e) => {
                                    setMethod(e.target.value);
                                    setOutput('');
                                    if (e.target.value === 'sha256') setIsDecrypt(false);
                                }}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: 'var(--bg-color)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-main)',
                                    outline: 'none'
                                }}
                            >
                                {methods.map(m => (
                                    <option key={m.id} value={m.id}>{m.category}: {m.name}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'flex', backgroundColor: 'var(--bg-color)', borderRadius: '8px', padding: '4px', border: '1px solid var(--border-color)' }}>
                            <button
                                onClick={() => setIsDecrypt(false)}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    borderRadius: '6px',
                                    backgroundColor: !isDecrypt ? 'var(--secondary-accent)' : 'transparent',
                                    color: !isDecrypt ? 'white' : 'var(--text-secondary)',
                                    fontWeight: 600
                                }}
                            >
                                Encrypt
                            </button>
                            <button
                                onClick={() => setIsDecrypt(true)}
                                disabled={method === 'sha256'}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    borderRadius: '6px',
                                    backgroundColor: isDecrypt ? 'var(--secondary-accent)' : 'transparent',
                                    color: isDecrypt ? 'white' : 'var(--text-secondary)',
                                    fontWeight: 600,
                                    opacity: method === 'sha256' ? 0.3 : 1
                                }}
                            >
                                Decrypt
                            </button>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem' }}>
                                {method === 'caesar' ? 'Shift Amount (Number)' :
                                    method === 'railfence' ? 'Number of Rails' :
                                        method === 'sha256' ? 'Hashing (No key needed)' : 'Secret Key'}
                            </label>
                            <input
                                type={method === 'caesar' || method === 'railfence' ? 'number' : 'text'}
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                disabled={method === 'sha256'}
                                placeholder="Enter key..."
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: 'var(--bg-color)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-main)',
                                    outline: 'none',
                                    opacity: method === 'sha256' ? 0.5 : 1
                                }}
                            />
                        </div>
                    </div>
                </Card>

                {/* Input/Output Section */}
                <Card title="Workspace">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem' }}>Input Text</label>
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your text here..."
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: 'var(--bg-color)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-main)',
                                    minHeight: '100px',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <button
                            onClick={handleProcess}
                            style={{
                                padding: '12px',
                                backgroundColor: 'var(--primary-accent)',
                                color: 'black',
                                fontWeight: 600,
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }}
                        >
                            <RefreshCcw size={18} /> Process {method.toUpperCase()}
                        </button>

                        {output && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{
                                    padding: '16px',
                                    backgroundColor: 'rgba(31, 111, 235, 0.05)',
                                    border: '1px solid var(--secondary-accent)',
                                    borderRadius: '8px'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <h4 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--secondary-accent)' }}>Result:</h4>
                                    <CheckCircle size={16} color="var(--primary-accent)" />
                                </div>
                                <p style={{ margin: 0, color: 'var(--text-main)', wordBreak: 'break-all', fontFamily: 'monospace' }}>{output}</p>
                            </motion.div>
                        )}
                    </div>
                </Card>
            </div>

            {/* Info Section */}
            {/* Educational Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
                <Card title="Concept Overview" icon={<Info size={20} />}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '8px' }}>What is Encryption?</h3>
                        <p>Encryption is the process of scrambling information into an unreadable format using a key. Only those with the correct key can decode the data back into its original form.</p>

                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginTop: '16px', marginBottom: '8px' }}>Security Relevance</h3>
                        <ul style={{ paddingLeft: '20px', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li><strong>Confidentiality:</strong> Ensuring that sensitive data like passwords and bank details remain private during transmission.</li>
                            <li><strong>Data Integrity:</strong> Modern encryption protects against unauthorized modifications; if the data is tampered with, the decryption will fail.</li>
                            <li><strong>Authentication:</strong> Verifying the identity of the sender through digital certificates and public-key infrastructure.</li>
                        </ul>
                    </div>
                </Card>

                <Card title="Encryption Insights" icon={<CheckCircle size={20} />}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <h4 style={{ color: 'var(--primary-accent)', marginBottom: '4px' }}>Classical Ciphers</h4>
                            <p style={{ fontSize: '0.875rem' }}>Relies on simple letter shifting or replacement. Vulnerable to frequency analysis and brute force, but fundamental for learning basic crypto logic.</p>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--secondary-accent)', marginBottom: '4px' }}>Modern Standards (AES/RSA)</h4>
                            <p style={{ fontSize: '0.875rem' }}>Uses complex math and large prime numbers. RSA allows for "Asymmetric" communication—where one key encrypts and another decrypts.</p>
                        </div>
                        <div style={{ padding: '12px', backgroundColor: 'rgba(255, 77, 77, 0.05)', border: '1px dashed var(--danger)', borderRadius: '8px' }}>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--danger)' }}><strong>SECURITY TIP:</strong> Never reuse the same key for multiple services. If one key is leaked, all your encrypted data becomes vulnerable.</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default EncryptionLab;
