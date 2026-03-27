"use client"

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Services.module.css';

const services = [
    { icon: '🎯', title: 'Career Counseling', desc: 'Psychometric assessments and personalized one-on-one sessions to map the ideal career path for you.' },
    { icon: '🏫', title: 'Direct Admission', desc: 'Hassle-free direct admission to 200+ reputed engineering, medical, management, and law colleges nationwide.' },
    { icon: '📝', title: 'Application Support', desc: 'End-to-end documentation, entrance exam guidance, college shortlisting, and fee-payment assistance.' },
    { icon: '🏅', title: 'Scholarship Guidance', desc: 'Identify and apply for scholarships and financial aid programs to significantly reduce your educational costs.' },
    { icon: '🌏', title: 'Study Abroad', desc: 'International admissions to universities in UK, USA, Canada, Australia and more — with full visa support.' },
    { icon: '📊', title: 'Entrance Exam Prep', desc: 'Structured guidance and resources for JEE, NEET, CAT, CLAT and all major competitive examinations.' }
];

const Services: React.FC = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <section id="services" className={styles.services}>
            <div className={styles.heading}>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="s-label"
                >
                    What We Offer
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="s-title"
                >
                    Comprehensive <span className="em">Career Services</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="s-sub"
                >
                    Everything you need — from choosing the right stream to securing your dream college seat.
                </motion.p>
            </div>
            <motion.div 
                className={styles.grid}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {services.map((svc, i) => (
                    <motion.div 
                        key={i} 
                        className={styles.card}
                        variants={cardVariants}
                        whileHover={{ 
                            y: -8,
                            transition: { duration: 0.3 }
                        }}
                    >
                        <div className={styles.icon}>{svc.icon}</div>
                        <h3>{svc.title}</h3>
                        <p>{svc.desc}</p>
                        <motion.div 
                            className={styles.arrow}
                            whileHover={{ x: 5 }}
                        >
                            →
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Services;
