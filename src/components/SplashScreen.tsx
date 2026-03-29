"use client"

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './SplashScreen.module.css';

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [step, setStep] = React.useState(0);

    React.useEffect(() => {
        // Step 1: After 2 seconds, show company name
        const t1 = setTimeout(() => setStep(1), 2000);
        
        // Step 2: After 4 seconds total, show Welcome
        const t2 = setTimeout(() => setStep(2), 4000);

        // Final: Complete 2s after Welcome (total 6 seconds)
        const t3 = setTimeout(() => onComplete(), 6000);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, [onComplete]);

    return (
        <div className={styles.splashMain}>
            <div className={styles.movingGradient}>
                <div className={styles.orb1}></div>
                <div className={styles.orb2}></div>
                <div className={styles.orb3}></div>
                
                <div className={`${styles.shapeSquare} ${styles.sq1}`}></div>
                <div className={`${styles.shapeSquare} ${styles.sq2}`}></div>
                <div className={`${styles.shapeSquare} ${styles.sq3}`}></div>
                
                <div className={`${styles.shapeTri} ${styles.tri1}`}></div>
                <div className={`${styles.shapeTri} ${styles.tri2}`}></div>
                
                <div className={`${styles.shapeBeam} ${styles.bm1}`}></div>
                <div className={`${styles.shapeBeam} ${styles.bm2}`}></div>
                <div className={`${styles.shapeBeam} ${styles.bm3}`}></div>
                <div className={`${styles.shapeBeam} ${styles.bm4}`}></div>

                <div className={styles.shine}></div>
                <div className={styles.noise}></div>
            </div>
            
            <AnimatePresence mode="wait">
                {step === 0 && (
                    <motion.div
                        key="logo"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ duration: 1 }}
                        className={styles.logoSlot}
                    >
                        <Image src="/logo.jpg" alt="Logo" width={180} height={180} className={styles.largeLogo} />
                    </motion.div>
                )}

                {step === 1 && (
                    <motion.div
                        key="title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.8 }}
                        className={styles.textSlot}
                    >
                        <h1 className={styles.brandTitle}>
                            AASTHA EDUCATION<br/>
                            <span>CONSULTANCY</span>
                        </h1>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="welcome"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.2 }}
                        transition={{ duration: 0.8 }}
                        className={styles.textSlot}
                    >
                        <h2 className={styles.welcomeText}>WELCOME</h2>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SplashScreen;
