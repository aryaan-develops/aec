"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Courses.module.css';

const Courses: React.FC = () => {
    const [colleges, setColleges] = useState<any[]>([]);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const res = await fetch('/api/colleges');
                const data = await res.json();
                if (data.length > 0) setColleges(data);
                else setColleges([
                    { _id: '1', name: 'Engineering & Technology', excellence: 'B.Tech/B.E. across all specializations. JEE counseling, state quota, direct and NRI admissions.', tags: 'Science, JEE, VITEEE', color: 'linear-gradient(135deg,#3D1A6E,#6B1A2A)' },
                    { _id: '2', name: 'MBBS, BDS & Allied Health', excellence: 'NEET counseling, management quota, deemed universities, and international MBBS placements.', tags: 'Medical, NEET, Abroad', color: 'linear-gradient(135deg,#5B2D8E,#4A0F1A)' },
                    { _id: '3', name: 'MBA & BBA Programs', excellence: 'Top B-school admissions, CAT/MAT coaching, lateral entry for working professionals.', tags: 'Management, CAT, MAT', color: 'linear-gradient(135deg,#7A2A0A,#3D1A6E)' }
                ]);
            } catch (e) { console.error(e); }
        };
        fetchColleges();
    }, []);

    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants: any = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section id="courses" className={styles.courses}>
            <div className={styles.heading}>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="s-label" 
                    style={{ color: 'var(--sand)' }}
                >
                    Admission Streams
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="s-title" 
                    style={{ color: '#fff' }}
                >
                    We Cover <span className="em" style={{ color: 'var(--lem)' }}>Every Stream</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="s-sub" 
                    style={{ color: 'rgba(255,250,205,0.65)' }}
                >
                    From science to management to the arts — expert guidance across all major educational paths.
                </motion.p>
            </div>
            <motion.div 
                className={styles.grid}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {colleges.map((stream, i) => (
                    <motion.div 
                        key={stream._id || i} 
                        className={styles.card}
                        variants={cardVariants}
                        whileHover={{ y: -10, transition: { duration: 0.3 } }}
                    >
                        <div className={styles.top} style={{ background: stream.color || 'var(--uv)' }}>
                            <div className={styles.tag}>{stream.tags.split(',')[0]}</div>
                            <h3>{stream.name}</h3>
                        </div>
                        <div className={styles.body}>
                            <p className={styles.desc}>{stream.excellence}</p>
                            <div className={styles.meta} style={{ marginTop: '15px' }}>
                                {stream.tags.split(',').map((tag: string, j: number) => (
                                    <span key={j} style={{ fontSize:'0.7rem', background:'#f0f0f0', padding:'2px 8px', borderRadius:'10px', marginRight:'5px' }}>{tag.trim()}</span>
                                ))}
                            </div>
                            <Link href="#contact" className={styles.link} style={{ marginTop: '20px' }}>Enquire Now →</Link>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Courses;
