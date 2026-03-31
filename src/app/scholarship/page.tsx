"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import styles from './Scholarship.module.css';

export default function ScholarshipPage() {
    return (
        <main className={styles.main}>
            <Navbar />
            
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <motion.span 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.badge}
                    >
                        Educational Equity
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={styles.title}
                    >
                        Merit Beyond <span className={styles.gold}>Means</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={styles.subtitle}
                    >
                        We believe that financial constraints should never extinguish the fire of ambition. 
                        If you have the marks and the merit, we will find the way.
                    </motion.p>
                </div>
            </section>

            <section className={styles.contentSection}>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.3
                            }
                        }
                    }}
                >
                    <motion.p 
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className={styles.visionText}
                    >
                        "Talent is universal, but opportunity is not. Aastha Education bridges this gap."
                    </motion.p>
                    
                    <motion.div 
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className={styles.descriptionText}
                    >
                        <p>
                            Financial hardship should never be a barrier to quality education. We specialize in identifying 
                            meritorious students from underprivileged backgrounds who deserve a seat in India's premier 
                            institutions. If your academic record reflects your dedication, we provide the scholarship 
                            assistance and financial guidance required to navigate the high costs of higher education.
                        </p>
                        <p style={{ marginTop: '20px' }}>
                            Our mission is to ensure that deserving candidates don't just dream of success but achieve it, 
                            regardless of their socio-economic status. We offer end-to-end support in scholarship applications, 
                            fee concession negotiations, and state-sponsored education loan guidance.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            visible: { opacity: 1, scale: 1, rotate: [0, 0.5, 0, -0.5, 0], transition: { duration: 1, ease: "easeInOut" } }
                        }}
                        className={styles.highlightBox}
                    >
                        <div className={styles.supportGrid}>
                            <motion.div className={styles.supportItem}>
                                <h3>Full Fee Waiver</h3>
                                <p>Guidance for 100% scholarship programs in top private universities.</p>
                            </motion.div>
                            <motion.div className={styles.supportItem}>
                                <h3>Government Schemes</h3>
                                <p>Assistance in availing state and central government educational subsidies.</p>
                            </motion.div>
                            <motion.div className={styles.supportItem}>
                                <h3>Corporate CSR</h3>
                                <p>Connecting brilliant minds with corporate-sponsored education initiatives.</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            <Footer />
            <FloatingActions />
        </main>
    );
}
