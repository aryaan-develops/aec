"use client"


import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import styles from './Counsellors.module.css';

export default function CounsellorsPage() {
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
                        Success Architecture
                    </motion.span>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={styles.title}
                    >
                        Elite <span className={styles.gold}>Career Mentors</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={styles.subtitle}
                    >
                        Connect with our panel of experts who have successfully guided thousands of students to the premier educational hubs of India.
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
                        "Empowering aspirations through precision guidance and a decade of educational excellence."
                    </motion.p>
                    
                    <motion.div 
                        variants={{
                            hidden: { opacity: 0, y: 30 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        className={styles.descriptionText}
                    >
                        <p>
                            At Aastha Education Consultancy, we believe that career counseling is an art of architecting futures. 
                            Our council of seasoned mentors brings together decades of experience in the Indian educational landscape, 
                            offering students a roadmap that transcends traditional admission support. We focus on identifying the 
                            unique strengths of every aspirant, aligning them with the premier institutions that foster growth, 
                            innovation, and leadership.
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            visible: { opacity: 1, scale: 1, rotate: [0, 1, 0, -1, 0], transition: { duration: 1, ease: "easeInOut" } }
                        }}
                        className={styles.highlightBox}
                    >
                        <div className={styles.statsGridNew}>
                            <motion.div 
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                }}
                                className={styles.statItem}
                            >
                                <span className={styles.statNumber}>10+</span>
                                <span className={styles.statLabel}>Years of Excellence</span>
                            </motion.div>
                            <motion.div 
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                }}
                                className={styles.statItem}
                            >
                                <span className={styles.statNumber}>5000+</span>
                                <span className={styles.statLabel}>Success Stories</span>
                            </motion.div>
                            <motion.div 
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                }}
                                className={styles.statItem}
                            >
                                <span className={styles.statNumber}>200+</span>
                                <span className={styles.statLabel}>Partner Institutions</span>
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
