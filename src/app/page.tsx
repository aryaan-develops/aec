"use client"

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import WhyUs from '@/components/WhyUs';
import Courses from '@/components/Courses';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import NoticeBoard from '@/components/NoticeBoard';
import SplashScreen from '@/components/SplashScreen';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Session optimization: Only show splash once per session
    const hasSeenSplash = sessionStorage.getItem('aastha_splash_seen');
    if (hasSeenSplash) {
      setLoading(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Use CSS variables for cursor glow - much smoother performance than React state
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem('aastha_splash_seen', 'true');
    setLoading(false);
  };

  return (
    <main>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen onComplete={handleSplashComplete} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div
            className="cursor-glow"
            style={{ 
              left: 'var(--mouse-x)', 
              top: 'var(--mouse-y)',
              position: 'fixed'
            }}
          ></div>

          <Navbar />

          <Hero />
          <NoticeBoard />
          <Services />
          <WhyUs />
          <Courses />
          <Testimonials />
          <Contact />

          <Footer />
          <FloatingActions />
        </motion.div>
      )}
    </main>
  );
}
