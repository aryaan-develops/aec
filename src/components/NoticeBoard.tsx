"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './NoticeBoard.module.css';

interface Notice {
    _id: string;
    title: string;
    content: string;
    type: string;
    date: string;
    phone?: string;
    email?: string;
}

const NoticeBoard: React.FC = () => {
    const [notices, setNotices] = useState<Notice[]>([]);

    const [lastUpdated, setLastUpdated] = useState<string>('');

    useEffect(() => {
        setLastUpdated(new Date().toLocaleDateString());
        const fetchNotices = async () => {
            try {
                const res = await fetch('/api/notices');
                const data = await res.json();
                if (data.length > 0) setNotices(data);
                else setNotices([
                    { _id: '0', title: 'Admissions 2024-25 Open', content: 'Direct admissions for top engineering and medical colleges are now open. Limited seats!', type: 'urgent', date: '2024' }
                ]);
            } catch (e) {
                console.error('Failed to fetch notices');
            }
        };
        fetchNotices();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1 }
    };

    return (
        <section id="notices" className={styles.noticeBoardSection}>
            <div className={styles.boardContainer}>
                <div className={styles.boardHeader}>
                    <div className={styles.pin}>📌</div>
                    <h2>Important <span className="em">Notice Board</span></h2>
                    <p>Stay updated with the latest admission alerts and counseling schedules.</p>
                </div>

                <motion.div
                    className={styles.boardBody}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {notices.length === 0 ? (
                        <p className={styles.empty}>No active notices at the moment.</p>
                    ) : (
                        notices.map((notice) => (
                            <motion.div
                                key={notice._id}
                                className={`${styles.noticeCard} ${styles[notice.type] || styles.info}`}
                                variants={itemVariants}
                            >
                                <div className={styles.cardHeader}>
                                    <div className={styles.dateInfo}>
                                        <span className={styles.greenIndicator}></span>
                                        <span className={styles.date}>{notice.date}</span>
                                    </div>
                                    <span className={styles.typeBadge}>{notice.type.toUpperCase()}</span>
                                </div>
                                <h3 className={styles.noticeTitle}>{notice.title}</h3>
                                <p className={styles.noticeText}>{notice.content}</p>
                                {(notice.phone || notice.email) && (
                                    <div className={styles.noticeContact}>
                                        {notice.phone && <a href={`tel:${notice.phone}`} className={styles.noticeCall}>📞 Contact Us</a>}
                                        {notice.email && <a href={`mailto:${notice.email}`} className={styles.noticeEmail}>✉️ Email Us</a>}
                                    </div>
                                )}
                            </motion.div>
                        ))
                    )}
                </motion.div>

                <div className={styles.boardFooter}>
                    <p>Last updated: {lastUpdated}</p>
                </div>
            </div>
        </section>
    );
};

export default NoticeBoard;
