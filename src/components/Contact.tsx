"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        stream: '',
        class: '',
        goal: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ name: '', phone: '', email: '', stream: '', class: '', goal: '' });
            }, 3000);
        } catch (e) {
            console.error('Failed to submit form');
        }
    };

    const filledCount = Object.values(formData).filter(v => typeof v === 'string' && v.trim() !== '').length;
    const progressPercent = (filledCount / 6) * 100;

    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.heading}>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="s-label"
                >
                    Get Started Today
                </motion.div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="s-title"
                >
                    Book Your <span className="em2">Free</span> Counseling Session
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className={styles.pIntro}
                >
                    Experience professional career guidance from Jamshedpur&apos;s most trusted academic consultancy.
                </motion.p>
            </div>

            <div className={styles.wrap}>
                <motion.div
                    className={styles.left}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.h3 variants={itemVariants} className={styles.classicSub}>Contact Information</motion.h3>
                    <motion.div className={styles.item} variants={itemVariants}>
                        <div className={styles.iconClassic}>📍</div>
                        <div>
                            <div className={styles.iLabel}>Office Address</div>
                            <div className={styles.iVal}>Aastha Education Consultancy<br />Jamshedpur, Jharkhand — 831001</div>
                        </div>
                    </motion.div>
                    <motion.div className={styles.item} variants={itemVariants}>
                        <div className={styles.iconClassic}>📞</div>
                        <div>
                            <div className={styles.iLabel}>Direct Helpline</div>
                            <div className={styles.iVal}><a href="tel:+919264199286">+91 92641 99286</a></div>
                        </div>
                    </motion.div>
                    <motion.div className={styles.item} variants={itemVariants}>
                        <div className={styles.iconClassic}>✉️</div>
                        <div>
                            <div className={styles.iLabel}>Official Email</div>
                            <div className={styles.iVal}><a href="mailto:aasthaedu.2017@gmail.com">aasthaedu.2017@gmail.com</a></div>
                        </div>
                    </motion.div>

                    <div className={styles.professionalTrust}>
                        <p>TRUSTED BY 5,000+ STUDENTS NATIONWIDE</p>
                        <div className={styles.divider}></div>
                        <ul>
                            <li>Expert Academic Counselors</li>
                            <li>Verified Admission Records</li>
                            <li>Transparent Fee Structure</li>
                        </ul>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.right}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.formContainer}>
                        <AnimatePresence mode="wait">
                            {!submitted ? (
                                <motion.form
                                    key="form"
                                    className={styles.form}
                                    onSubmit={handleSubmit}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <h4 className={styles.formTitle}>Consultation Request</h4>

                                    <div className={styles.fGroup}>
                                        <label>Full Name</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Rahul Sharma" required />
                                    </div>

                                    <div className={styles.fRow}>
                                        <div className={styles.fGroup}>
                                            <label>Phone Number</label>
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 00000 00000" required />
                                        </div>
                                        <div className={styles.fGroup}>
                                            <label>Email Address</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                                        </div>
                                    </div>

                                    <div className={styles.fRow}>
                                        <div className={styles.fGroup}>
                                            <label>Academic Stream</label>
                                            <select name="stream" value={formData.stream} onChange={handleChange} required>
                                                <option value="" disabled>Select Stream</option>
                                                <option>Engineering (B.Tech)</option>
                                                <option>Medical (MBBS/BDS)</option>
                                                <option>Management (MBA/BBA)</option>
                                                <option>Law & Humanities</option>
                                                <option>Study Abroad</option>
                                            </select>
                                        </div>
                                        <div className={styles.fGroup}>
                                            <label>Current Status</label>
                                            <select name="class" value={formData.class} onChange={handleChange}>
                                                <option value="" disabled>Select Level</option>
                                                <option>10th Grade</option>
                                                <option>11th Grade</option>
                                                <option>12th Grade / Passed</option>
                                                <option>Graduate</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.fGroup}>
                                        <label>Specific Inquiry / Goal</label>
                                        <textarea name="goal" value={formData.goal} onChange={handleChange} placeholder="Describe your career goals or specific concerns..." rows={3}></textarea>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        className={styles.classicSubmit}
                                        whileHover={{ backgroundColor: 'var(--uv3)' }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Submit Request
                                    </motion.button>
                                    <p className={styles.securityText}>🔒 All information is kept strictly confidential</p>
                                </motion.form>
                            ) : (
                                <motion.div
                                    key="success"
                                    className={styles.successMessage}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <div className={styles.successIcon}>✓</div>
                                    <h3>Request Received</h3>
                                    <p>Our senior counselor will contact you within the next 24 hours.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
