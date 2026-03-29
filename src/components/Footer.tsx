"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.top}>
                <div className={styles.brand}>
                    <div className={styles.footerLogo}>
                        <Image
                            src="/logo.jpg"
                            alt="Aastha Education Consultancy Logo"
                            width={50}
                            height={50}
                            className={styles.logoImage}
                        />
                        <div className={styles.logoText}>
                            <h3>AASTHA EDUCATION</h3>
                            <span>CONSULTANCY</span>
                        </div>
                    </div>
                    <p>Tiwari Buildings, H.No 53, 3rd Floor, Thakurbari Road, Sakchi. Empowering students with informed decision-making and top college admissions.</p>
                </div>
                <div className={styles.col}>
                    <h4>Services</h4>
                    <ul>
                        <li><Link href="#services">Career Counseling</Link></li>
                        <li><Link href="#services">Direct Admission</Link></li>
                        <li><Link href="#services">Study Abroad</Link></li>
                        <li><Link href="#services">Scholarship Help</Link></li>
                    </ul>
                </div>
                <div className={styles.col}>
                    <h4>Streams</h4>
                    <ul>
                        <li><Link href="#courses">Engineering</Link></li>
                        <li><Link href="#courses">Medical</Link></li>
                        <li><Link href="#courses">Management</Link></li>
                        <li><Link href="#courses">Law & Design</Link></li>
                    </ul>
                </div>
                <div className={styles.col}>
                    <h4>Quick Reach</h4>
                    <ul>
                        <li><Link href="https://wa.me/919591394618" target="_blank">💬 WhatsApp Us</Link></li>
                        <li><Link href="https://t.me/919591394618" target="_blank">✈️ Telegram</Link></li>
                        <li><Link href="https://www.instagram.com/aastha_education_?igsh=MTZsaGVoZnYxa251cA==" target="_blank">📸 Instagram</Link></li>
                        <li><a href="tel:+919546083369">📞 Call Us Now</a></li>
                        <li><Link href="mailto:aasthaedu.2017@gmail.com">✉️ Email Us</Link></li>
                        <li><Link href="#">Privacy Policy</Link></li>
                        <li><Link href="/admin">🔐 Admin Dashboard</Link></li>
                    </ul>
                </div>
            </div>
            <div className={styles.bottom}>
                <p>© 2017 <span style={{ color: 'var(--sand)' }}>Aastha Education Consultancy</span>. All Rights Reserved.</p>
                <p>Made with <span className={styles.heart}>♥</span> for the students of Jamshedpur</p>
            </div>
        </footer>
    );
};

export default Footer;
