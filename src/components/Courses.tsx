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
                    { _id: '1', name: 'VIT University', location: 'Vellore, TN', excellence: 'Top-tier engineering with A++ NAAC rating. 100% placement record in CSE/IT.', tags: 'Engineering, VITEEE, Top Rated', image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000' },
                    { _id: '2', name: 'KMC Manipal', location: 'Manipal, KA', excellence: 'India\'s premier medical institution. World-class hospital tie-ups and research facilities.', tags: 'MBBS, NEET, Medical', image: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=1000' },
                    { _id: '3', name: 'Symbiosis (SIBM)', location: 'Pune, MH', excellence: 'Renowned for global management exposures and specialized MBA programs.', tags: 'Management, SNAP, MBA', image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=1000' }
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
                        <div 
                            className={styles.top} 
                            style={{ 
                                background: stream.image ? `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url(${stream.image}) center/cover` : (stream.color || 'var(--uv)') 
                            }}
                        >
                            <div className={styles.tag}>{stream.tags.split(',')[0]}</div>
                            <h3>{stream.name}</h3>
                            {stream.location && <div className={styles.location}>📍 {stream.location}</div>}
                        </div>
                        <div className={styles.body}>
                            <p className={styles.desc}>{stream.excellence}</p>
                            <div className={styles.meta}>
                                {stream.tags.split(',').map((tag: string, j: number) => (
                                    <span key={j} className={styles.pill}>{tag.trim()}</span>
                                ))}
                            </div>
                            <div className={styles.actionLinks}>
                                <Link href="#contact" className={styles.link}>Enquire Now →</Link>
                                {stream.link && <a href={stream.link} target="_blank" className={styles.externalLink}>Visit Website ↗</a>}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default Courses;
