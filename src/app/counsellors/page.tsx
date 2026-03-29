"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import styles from './Counsellors.module.css';

interface Counsellor {
    _id: string;
    name: string;
    bio: string;
    phone: string;
    email: string;
    photo: string;
}

export default function CounsellorsPage() {
    const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCounsellors = async () => {
            try {
                const res = await fetch('/api/counsellors');
                const data = await res.json();
                if (Array.isArray(data)) setCounsellors(data);
                setLoading(false);
            } catch (e) {
                console.error("Failed to fetch counsellors");
                setLoading(false);
            }
        };
        fetchCounsellors();
    }, []);

    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants: any = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

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

            <section className={styles.gridSection}>
                <div className={styles.container}>
                    {loading ? (
                        <div className={styles.loader}>Synchronizing Expert Panel...</div>
                    ) : (
                        <motion.div 
                            className={styles.counsellorGrid}
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {counsellors.map((c) => (
                                <motion.div 
                                    key={c._id}
                                    className={styles.card}
                                    variants={itemVariants}
                                    whileHover={{ y: -8 }}
                                >
                                    <div className={styles.photoContainer}>
                                        <Image 
                                            src={c.photo || '/default-counselor.jpg'} 
                                            alt={c.name} 
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className={styles.photo} 
                                        />
                                        <div className={styles.overlay}></div>
                                    </div>
                                    <div className={styles.cardInfo}>
                                        <div className={styles.cardHeaderSmall}>
                                            <h3 className={styles.cName}>{c.name}</h3>
                                            <div className={styles.connectIcons}>
                                                <a href={`tel:${c.phone}`} className={styles.iconBtn} title="Call Now">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.21-2.21a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                                </a>
                                                <a href={`mailto:${c.email}`} className={styles.iconBtn} title="Send Email">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                                </a>
                                            </div>
                                        </div>
                                        <div className={styles.cBio}>{c.bio}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            <Footer />
            <FloatingActions />
        </main>
    );
}
