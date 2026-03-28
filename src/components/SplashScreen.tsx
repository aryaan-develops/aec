"use client"

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import styles from './SplashScreen.module.css';

const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Logo animations
    const logoOpacity = useTransform(smoothProgress, [0, 0.2, 0.35], [1, 1, 0]);
    const logoScale = useTransform(smoothProgress, [0, 0.2], [1, 1.2]);

    // Welcome text animations
    const textOpacity = useTransform(smoothProgress, [0.4, 0.55, 0.75, 0.9], [0, 1, 1, 0]);
    const textY = useTransform(smoothProgress, [0.4, 0.55, 0.9], [40, 0, -40]);

    // Overall splash fade out
    const splashOpacity = useTransform(smoothProgress, [0.9, 1], [1, 0]);
    const splashPointerEvents = useTransform(smoothProgress, (v) => v > 0.98 ? "none" : "auto");

    // Monitor completion
    React.useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (v) => {
            if (v >= 0.99) {
                onComplete();
            }
        });
        return () => unsubscribe();
    }, [smoothProgress, onComplete]);

    return (
        <div ref={containerRef} className={styles.scrollWrapper}>
            <motion.div
                className={styles.splash}
                style={{ opacity: splashOpacity, pointerEvents: splashPointerEvents as any }}
            >
                {/* Step 1: Logo */}
                <motion.div
                    style={{ opacity: logoOpacity, scale: logoScale }}
                    className={styles.logoContainer}
                >
                    <Image src="/logo.jpg" alt="Logo" width={180} height={180} className={styles.logo} />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        className={styles.scrollHint}
                    >
                        Scroll down to begin ➔
                    </motion.p>
                </motion.div>

                {/* Step 2: Welcome/About */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className={styles.textContainer}
                >
                    <h1 className={styles.welcome}>Welcome to <span className={styles.highlight}>Aastha</span></h1>
                    <p className={styles.about}>Empowering your educational journey with 20+ years of expertise and total transparency.</p>
                </motion.div>

                {/* Progress bar */}
                <motion.div className={styles.progressBar} style={{ scaleX: smoothProgress }} />
            </motion.div>
        </div>
    );
};

export default SplashScreen;
