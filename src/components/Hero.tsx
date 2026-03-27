"use client"

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
    const particlesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!particlesRef.current) return;
        const pc = particlesRef.current;
        pc.innerHTML = ''; // Clear for HMR
        const count = 30;
        for (let i = 0; i < count; i++) {
            const p = document.createElement('div');
            p.className = styles.particle;
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDuration = (4 + Math.random() * 8) + 's';
            p.style.animationDelay = (Math.random() * 8) + 's';
            p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
            p.style.opacity = (Math.random() * 0.7).toString();
            pc.appendChild(p);
        }
    }, []);

    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const floatVariants: any = {
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <section className={styles.hero}>
            <div className={styles.bgContainer}>
                <div className={styles.bgImage}></div>
                <div className={styles.bgOverlay}></div>
            </div>
            <div className={`${styles.orb} ${styles.orb1}`}></div>
            <div className={`${styles.orb} ${styles.orb2}`}></div>
            <div className={`${styles.orb} ${styles.orb1}`}></div>
            <div className={`${styles.orb} ${styles.orb2}`}></div>
            <div className={`${styles.orb} ${styles.orb3}`}></div>
            <div className={styles.particles} ref={particlesRef}></div>

            <motion.div 
                className={styles.content}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div className={styles.badge} variants={itemVariants}>
                    <span className={styles.dot}></span> Trusted Education Partner · Jamshedpur
                </motion.div>
                
                <motion.h1 className={styles.title} variants={itemVariants}>
                    Your Dream College<br />
                    Starts with <span className={styles.gold}>Expert</span><br />
                    <span className={styles.accent}>Career Guidance</span>
                </motion.h1>

                <motion.p className={styles.sub} variants={itemVariants}>
                    Aastha Education Consultancy — specialists in career counseling and direct admission to
                    India&apos;s top colleges. 15+ years of turning student dreams into reality.
                </motion.p>

                <motion.div className={styles.btns} variants={itemVariants}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="#contact" className={styles.btnGlow}>Book Free Session</Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="#courses" className={styles.btnGhost}>Explore Streams →</Link>
                    </motion.div>
                </motion.div>

                <motion.div className={styles.stats} variants={itemVariants}>
                    <div className={styles.stat}>
                        <div className={styles.statNum}>5000+</div>
                        <div className={styles.statLabel}>Students Placed</div>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.stat}>
                        <div className={styles.statNum}>200+</div>
                        <div className={styles.statLabel}>Partner Colleges</div>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.stat}>
                        <div className={styles.statNum}>15+</div>
                        <div className={styles.statLabel}>Years of Excellence</div>
                    </div>
                </motion.div>
            </motion.div>

            <div className={styles.floatArea}>
                <motion.div 
                    className={styles.floatCard}
                    variants={floatVariants}
                    animate="animate"
                >
                    <div className={styles.fLabel}>2024–25 Admission Success</div>
                    <div className={styles.fTitle}>Stream Performance</div>
                    <div className={styles.prow}><span>Engineering</span><span style={{ color: 'var(--sand)' }}>96%</span></div>
                    <div className={styles.pWrap}><motion.div initial={{ width: 0 }} animate={{ width: '96%' }} transition={{ duration: 1.5, delay: 1 }} className={styles.pBar}></motion.div></div>
                    <div className={styles.prow}><span>Medical</span><span style={{ color: 'var(--sand)' }}>91%</span></div>
                    <div className={styles.pWrap}><motion.div initial={{ width: 0 }} animate={{ width: '91%' }} transition={{ duration: 1.5, delay: 1.2 }} className={styles.pBar}></motion.div></div>
                    <div className={styles.prow}><span>Management</span><span style={{ color: 'var(--sand)' }}>89%</span></div>
                    <div className={styles.pWrap} style={{ marginBottom: 0 }}><motion.div initial={{ width: 0 }} animate={{ width: '89%' }} transition={{ duration: 1.5, delay: 1.4 }} className={styles.pBar}></motion.div></div>
                </motion.div>
                
                <motion.div 
                    className={`${styles.floatCard} ${styles.ratingCard}`}
                    variants={floatVariants}
                    animate="animate"
                    transition={{ delay: 0.5 }}
                >
                    <div>
                        <div className={styles.rBig}>4.9</div>
                        <div className={styles.rStars}>★★★★★</div>
                        <div className={styles.rSub}>Student Rating</div>
                    </div>
                    <div className={styles.rInfo}>
                        <div style={{ color: 'var(--sand)', fontWeight: 700, marginBottom: '4px' }}>Top Rated</div>
                        Education Consultancy<br />in Jharkhand
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
