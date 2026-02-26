import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Download, Eye, EyeOff, ShieldCheck, Info } from 'lucide-react';
import { Card } from '../components/Reusable';
import { encodeMessage, decodeMessage, getCapacity } from '../utils/steganography';
import { useSimulation } from '../contexts/SimulationContext';

const SteganographyLab = () => {
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState('');
    const [encodedImage, setEncodedImage] = useState(null);
    const [decodedMessage, setDecodedMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef(null);
    const { addResult } = useSimulation();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target.result);
                setEncodedImage(null);
                setDecodedMessage('');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEncode = () => {
        if (!image || !message) return;
        setLoading(true);

        const img = new Image();
        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            try {
                const encodedData = encodeMessage(imageData, message);
                ctx.putImageData(encodedData, 0, 0);
                setEncodedImage(canvas.toDataURL());
                addResult({
                    type: 'Steganography Encoding',
                    details: `Message hidden in ${img.width}x${img.height} image`,
                    riskLevel: 'Low'
                });
            } catch (err) {
                alert(err.message);
            }
            setLoading(false);
        };
        img.src = image;
    };

    const handleDecode = () => {
        if (!image && !encodedImage) return;
        setLoading(true);

        const img = new Image();
        img.onload = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const msg = decodeMessage(imageData);
            setDecodedMessage(msg || 'No hidden message found.');

            addResult({
                type: 'Steganography Decoding',
                details: 'Extracted message from image',
                riskLevel: 'Low'
            });
            setLoading(false);
        };
        img.src = encodedImage || image;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <header>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShieldCheck color="var(--primary-accent)" /> Steganography Lab
                </h1>
                <p>Learn how to conceal secret messages within ordinary images using Least Significant Bit (LSB) encoding.</p>
            </header>

            <div className="responsive-grid">
                {/* Encoding Section */}
                <Card title="Encode Secrets">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div
                            onClick={() => document.getElementById('imageInput').click()}
                            style={{
                                border: '2px dashed var(--border-color)',
                                borderRadius: '8px',
                                padding: 'clamp(20px, 5vw, 40px)',
                                textAlign: 'center',
                                cursor: 'pointer',
                                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <input type="file" id="imageInput" hidden accept="image/*" onChange={handleImageUpload} />
                            {image ? (
                                <img src={image} style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px' }} alt="Preview" />
                            ) : (
                                <>
                                    <Upload size={32} style={{ marginBottom: '12px', color: 'var(--text-secondary)' }} />
                                    <p>Click or drag image to upload</p>
                                </>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.875rem' }}>Secret Message</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Enter message to hide..."
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    backgroundColor: 'var(--bg-color)',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '8px',
                                    color: 'var(--text-main)',
                                    minHeight: '100px',
                                    outline: 'none',
                                    fontSize: '1rem'
                                }}
                            />
                        </div>

                        <button
                            onClick={handleEncode}
                            disabled={!image || !message || loading}
                            style={{
                                padding: '14px',
                                backgroundColor: 'var(--primary-accent)',
                                color: 'black',
                                fontWeight: 600,
                                borderRadius: '8px',
                                opacity: (!image || !message || loading) ? 0.5 : 1,
                                fontSize: '1rem'
                            }}
                        >
                            {loading ? 'Processing...' : 'Generate Stego Image'}
                        </button>
                    </div>
                </Card>

                {/* Results / Decoding Section */}
                <Card title="Analysis & Decoding">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{
                            backgroundColor: 'var(--bg-color)',
                            borderRadius: '8px',
                            padding: '24px',
                            textAlign: 'center',
                            minHeight: '200px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            border: '1px solid var(--border-color)'
                        }}>
                            {encodedImage ? (
                                <>
                                    <img src={encodedImage} style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '4px', marginBottom: '16px' }} alt="Encoded" />
                                    <a href={encodedImage} download="stego_image.png" style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '8px',
                                        color: 'var(--primary-accent)',
                                        fontSize: '0.875rem'
                                    }}>
                                        <Download size={16} /> Download Encoded Image
                                    </a>
                                </>
                            ) : (
                                <p style={{ color: 'var(--text-secondary)' }}>No encoded image yet.</p>
                            )}
                        </div>

                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button
                                onClick={handleDecode}
                                disabled={(!image && !encodedImage) || loading}
                                style={{
                                    flex: 1,
                                    padding: '14px',
                                    backgroundColor: 'transparent',
                                    border: '1px solid var(--secondary-accent)',
                                    color: 'var(--secondary-accent)',
                                    fontWeight: 600,
                                    borderRadius: '8px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    fontSize: '1rem'
                                }}
                            >
                                <Eye size={18} /> Decode Message
                            </button>
                        </div>

                        {decodedMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={{
                                    padding: '16px',
                                    backgroundColor: 'rgba(0, 255, 136, 0.05)',
                                    border: '1px solid var(--primary-accent)',
                                    borderRadius: '8px'
                                }}
                            >
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.875rem', color: 'var(--primary-accent)' }}>Extracted Secret:</h4>
                                <p style={{ margin: 0, color: 'var(--text-main)', wordBreak: 'break-all' }}>{decodedMessage}</p>
                            </motion.div>
                        )}
                    </div>
                </Card>
            </div>

            {/* Explanation Section */}
            <div className="responsive-grid">
                <Card title="Concept Overview" icon={<Info size={20} />}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginBottom: '8px' }}>What is Steganography?</h3>
                        <p>Steganography is the practice of concealing a file, message, image, or video within another file. Unlike encryption, which makes a message unreadable, steganography hides the <strong>existence</strong> of the message itself.</p>

                        <h3 style={{ color: 'var(--text-main)', fontSize: '1.1rem', marginTop: '16px', marginBottom: '8px' }}>Security Relevance</h3>
                        <ul style={{ paddingLeft: '20px', listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li><strong>Covert Communication:</strong> Sending sensitive data without alerting censors or surveillance systems.</li>
                            <li><strong>Digital Watermarking:</strong> Embedding copyright information or serial numbers to track intellectual property and prevent piracy.</li>
                            <li><strong>Malware Delivery:</strong> Attackers often use steganography to hide malicious payloads within harmless images to bypass security scanners.</li>
                        </ul>
                    </div>
                </Card>

                <Card title="How it Works (LSB)" icon={<ShieldCheck size={20} />}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                        <p>In this lab, we use <strong>Least Significant Bit (LSB)</strong> insertion. Every color in a pixel is represented by 8 bits (e.g., 00000001).</p>
                        <p>By changing the final bit, we only shift the color value by 1 unit out of 255—a change invisible to the human eye. This allows us to store 3 bits of data per pixel.</p>
                        <div style={{ marginTop: '12px', padding: '12px', backgroundColor: 'var(--bg-color)', borderRadius: '8px', borderLeft: '4px solid var(--primary-accent)' }}>
                            <span style={{ color: 'var(--primary-accent)', fontWeight: 'bold' }}>Formula:</span> Capacity ≈ (Width × Height × 3) / 8 bytes
                        </div>
                    </div>
                </Card>
            </div>


            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
    );
};

export default SteganographyLab;
