"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import styles from './StudyAbroad.module.css';

export default function StudyAbroadPage() {
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
                        Global Education
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={styles.title}
                    >
                        Education Without <span className={styles.gold}>Borders</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={styles.subtitle}
                    >
                        We simplify the complexities of international admissions. Whether it's UK, USA, Canada, or Australia, 
                        your journey to a world-class degree begins here.
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
                        "Unlock global opportunities and experience international excellence in education."
                    </motion.p>
                    
                    <motion.div 
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className={styles.descriptionText}
                    >
                        <p>
                            Transitioning to a foreign university can be overwhelming. From selecting the right course to 
                            navigating visa requirements and financial preparations, we provide complete, end-to-end assistance. 
                            Our counseling covers institutional shortlisting, application filing, and pre-departure briefings.
                        </p>
                        <p style={{ marginTop: '20px' }}>
                            We have tie-ups with numerous international education providers, ensuring our students get 
                            the priority support they need. We help you explore scholarships, coordinate with faculty, 
                            and provide total visa support to ensure a smooth transition to your new global home.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            visible: { opacity: 1, scale: 1, transition: { duration: 1, ease: "easeOut" } }
                        }}
                        className={styles.highlightBox}
                    >
                        <div className={styles.destGrid}>
                            <motion.div className={styles.destItem}>
                                <div className={styles.destIcon}>🇬🇧</div>
                                <h3>United Kingdom</h3>
                                <p>World-renowned universities and 1-year Master's programs.</p>
                            </motion.div>
                            <motion.div className={styles.destItem}>
                                <div className={styles.destIcon}>🇺🇸</div>
                                <h3>United States</h3>
                                <p>Diverse educational landscape and world-class research hubs.</p>
                            </motion.div>
                            <motion.div className={styles.destItem}>
                                <div className={styles.destIcon}>🇨🇦</div>
                                <h3>Canada</h3>
                                <p>Excellent post-study work opportunities and high quality of life.</p>
                            </motion.div>
                            <motion.div className={styles.destItem}>
                                <div className={styles.destIcon}>🇦🇺</div>
                                <h3>Australia</h3>
                                <p>Top-ranked universities and a vibrant student culture.</p>
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
