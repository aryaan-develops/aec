"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import styles from './EntrancePrep.module.css';

export default function EntrancePrepPage() {
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
                        Strategic Advantage
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={styles.title}
                    >
                        Mastering the <span className={styles.gold}>Entrance</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={styles.subtitle}
                    >
                        Competitive exams aren't just about hard work; they are about superior strategy, 
                        impeccable preparation, and unyielding support.
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
                        "We don't just teach for exam centers; we prepare you for the highest arenas of excellence."
                    </motion.p>
                    
                    <motion.div 
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className={styles.descriptionText}
                    >
                        <p>
                            Entrance examinations like JEE, NEET, CLAT, and CAT are the gates to India's premier institutions. 
                            Our counseling goes beyond simple course selection; we provide a strategic roadmap for your preparation. 
                            From time management techniques to selecting the optimal coaching environment, we guide your every step.
                        </p>
                        <p style={{ marginTop: '20px' }}>
                            Our expert mentors provide the mental framework and strategic advice necessary to handle the pressure 
                            of competitive environments. We help you prepare, we help you strategize, and we support you 
                            until you secure your seat.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
                        }}
                        className={styles.highlightBox}
                    >
                        <div className={styles.strategyGrid}>
                            <motion.div className={styles.strategyItem}>
                                <div className={styles.statIcon}>🧭</div>
                                <h3>Advice & Strategy</h3>
                                <p>Customized study plans tailored to your specific strengths and weaknesses.</p>
                            </motion.div>
                            <motion.div className={styles.strategyItem}>
                                <div className={styles.statIcon}>📚</div>
                                <h3>Curated Preparation</h3>
                                <p>Guidance on selecting the right resources, literature, and coaching mocks.</p>
                            </motion.div>
                            <motion.div className={styles.strategyItem}>
                                <div className={styles.statIcon}>🤝</div>
                                <h3>Constant Support</h3>
                                <p>Mental conditioning and tactical counseling until the day of your results.</p>
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
