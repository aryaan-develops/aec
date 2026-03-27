"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Notices.module.css';

interface Notice {
    _id: string;
    title: string;
    content: string;
    type: string;
    date: string;
}

const Notices: React.FC = () => {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

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

    useEffect(() => {
        fetchNotices();
    }, []);

    useEffect(() => {
        if (notices.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % notices.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [notices]);

    if (notices.length === 0) return null;

    const currentNotice = notices[currentIndex];

    return (
        <div className={styles.noticeBar}>
            <div className={styles.container}>
                <div className={styles.label}>
                    <span className={styles.pulse}></span>
                    LATEST UPDATES
                </div>
                <div className={styles.contentWrap}>
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={currentIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className={styles.noticeItem}
                        >
                            <span className={`${styles.tag} ${styles[currentNotice.type]}`}>
                                {currentNotice.type.toUpperCase()}
                            </span>
                            <strong>{currentNotice.title}</strong>
                            <p>{currentNotice.content}</p>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <div className={styles.controls}>
                    <span>{currentIndex + 1} / {notices.length}</span>
                </div>
            </div>
        </div>
    );
};

export default Notices;
