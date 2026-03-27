"use client"

import React from 'react';
import { motion } from 'framer-motion';
import styles from './WhyUs.module.css';

const reasons = [
    { num: '01', title: '15+ Years of Expertise', desc: 'Seasoned counselors with deep expertise across engineering, medical, management, law and arts streams.' },
    { num: '02', title: '200+ College Network', desc: 'Strong institutional ties ensure genuine direct admission opportunities across every major stream.' },
    { num: '03', title: 'Fully Personalized', desc: 'Every student is unique. We tailor guidance to your aptitude, interests, location, and budget.' },
    { num: '04', title: '100% Transparent', desc: 'No hidden charges ever. Complete transparency in all services, fees, and admission processes.' },
    { num: '05', title: 'Post-Admission Support', desc: 'We stay with students after admission — hostel guidance, orientation, and smooth college transition.' },
    { num: '06', title: 'Free Initial Consultation', desc: 'Our first session is always free. Come in, talk to us, and leave with clarity — no commitment needed.' }
];

const WhyUs: React.FC = () => {
    const containerVariants: any = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants: any = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <section id="why" className={styles.why}>
            <div className={styles.content}>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="s-label"
                >
                    The Aastha Edge
                </motion.div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="s-title"
                >
                    Why 5,000+ Students <span className="em">Trust Us</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="s-sub"
                >
                    We&apos;re not just consultants — we&apos;re partners who stay with you until your dream is achieved.
                </motion.p>
            </div>
            <motion.div 
                className={styles.grid}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {reasons.map((reason, i) => (
                    <motion.div 
                        key={i} 
                        className={styles.card}
                        variants={cardVariants}
                        whileHover={{ 
                            scale: 1.02,
                            boxShadow: "0 10px 30px rgba(107, 26, 42, 0.15)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        <div className={styles.num}>{reason.num}</div>
                        <div>
                            <h4>{reason.title}</h4>
                            <p>{reason.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default WhyUs;
