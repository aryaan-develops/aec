"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

const reviews = [
    { name: 'Rohit Kumar', role: 'B.Tech CSE, VIT Vellore', avatar: 'RK', text: 'Thanks to Aastha, I secured a seat at VIT Vellore through direct admission despite a borderline JEE score. They were honest, efficient, and genuinely cared about my future.' },
    { name: 'Priya Das', role: 'MBBS, KIMS Bhubaneswar', avatar: 'PD', text: 'The career counseling session changed everything for me. I was torn between medicine and engineering. AEC helped me choose confidently — now in 2nd year MBBS and loving it!' },
    { name: 'Sunita Mahato', role: 'Parent — MBA, XLRI Jamshedpur', avatar: 'SM', text: 'As parents, we were overwhelmed by the admission process. Aastha\'s team guided us step by step, handled everything, and our son got into a top MBA college. Absolutely recommend!' }
];

const Testimonials: React.FC = () => {
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch('/api/reviews');
                const data = await res.json();
                if (data.length > 0) setReviews(data);
                else setReviews([
                    { _id: '1', name: 'Rohit Kumar', role: 'B.Tech CSE, VIT Vellore', avatar: '', text: 'Thanks to Aastha, I secured a seat at VIT Vellore through direct admission despite a borderline JEE score. They were honest, efficient, and genuinely cared about my future.' },
                    { _id: '2', name: 'Priya Das', role: 'MBBS, KIMS Bhubaneswar', avatar: '', text: 'The career counseling session changed everything for me. I was torn between medicine and engineering. AEC helped me choose confidently — now in 2nd year MBBS and loving it!' },
                    { _id: '3', name: 'Sunita Mahato', role: 'Parent — MBA, XLRI Jamshedpur', avatar: '', text: 'As parents, we were overwhelmed by the admission process. Aastha\'s team guided us step by step, handled everything, and our son got into a top MBA college. Absolutely recommend!' }
                ]);
            } catch (e) { console.error(e); }
        };
        fetchReviews();
    }, []);

    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const cardVariants: any = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="testimonials" className={styles.testi}>
            <div className={styles.heading}>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="s-label"
                >
                    Student Stories
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="s-title"
                >
                    Real Results, Real <span className="em">Success</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="s-sub"
                >
                    Hear from students and parents who trusted Aastha with their most important decision.
                </motion.p>
            </div>
            <motion.div 
                className={styles.grid}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {reviews.map((rev, i) => (
                    <motion.div 
                        key={rev._id || i} 
                        className={styles.card}
                        variants={cardVariants}
                        whileHover={{ 
                            y: -10,
                            scale: 1.02,
                            transition: { duration: 0.3 } 
                        }}
                    >
                        <div className={styles.quote}>&quot;</div>
                        <p className={styles.text}>{rev.text}</p>
                        <div className={styles.author}>
                            <motion.div 
                                className={styles.avatar}
                                whileHover={{ rotate: rev.avatar?.startsWith('data:') ? 0 : 360 }}
                                transition={{ duration: 0.8 }}
                                style={{ overflow: 'hidden' }}
                            >
                                {rev.avatar?.startsWith('data:') ? (
                                    <img src={rev.avatar} alt={rev.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    rev.avatar || rev.name.substring(0,2).toUpperCase()
                                )}
                            </motion.div>
                            <div>
                                <div className={styles.name}>{rev.name}</div>
                                <div className={styles.role}>{rev.role}</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Testimonials;
