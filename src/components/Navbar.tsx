"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const navVariants: any = {
        hidden: { opacity: 0, y: -20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.5, staggerChildren: 0.1 }
        }
    };

    const itemVariants: any = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <motion.nav 
                initial="hidden"
                animate="visible"
                variants={navVariants}
                className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
            >
                <Link href="/" className={styles.logo}>
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={styles.logoWrapper}
                    >
                        <Image 
                            src="/nav_logo.png" 
                            alt="AEC Logo" 
                            width={65} 
                            height={65}
                            className={styles.logoImage}
                            unoptimized={true}
                        />
                    </motion.div>
                    <div className={styles.logoText}>
                        <span className={styles.primaryText}>Aastha Consultancy</span>
                        <span className={styles.secondaryText}>Education</span>
                    </div>
                </Link>

                <ul className={styles.navLinks}>
                    {['Services', 'Courses', 'Counsellors', 'Notices', 'Why', 'Testimonials', 'Contact'].map((item) => (
                        <motion.li key={item} variants={itemVariants}>
                            <Link href={item === 'Counsellors' ? '/counsellors' : `#${item.toLowerCase()}`} className={styles.navLink}>
                                {item === 'Why' ? 'Why Us' : item === 'Courses' ? 'Streams' : item === 'Testimonials' ? 'Reviews' : item === 'Counsellors' ? 'Counselors' : item}
                                {item === 'Notices' && <span className={styles.liveBadge}></span>}
                            </Link>
                        </motion.li>
                    ))}
                </ul>

                <div className={styles.navActions}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href="#contact" className={styles.cta}>Free Counseling</Link>
                    </motion.div>
                    <button 
                        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`} 
                        onClick={toggleMenu}
                        aria-label="Menu"
                    >
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className={`${styles.mobileMenu} ${styles.mobileOpen}`}
                    >
                        <ul>
                            {['Services', 'Courses', 'Counsellors', 'Notices', 'Why', 'Testimonials', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href={item === 'Counsellors' ? '/counsellors' : `#${item.toLowerCase()}`} onClick={closeMenu}>
                                        {item === 'Why' ? 'Why Us' : item === 'Courses' ? 'Streams' : item === 'Testimonials' ? 'Reviews' : item === 'Counsellors' ? 'Counselors' : item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link href="#contact" className={styles.mobCta} onClick={closeMenu}>
                            📞 Book Free Counseling
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
