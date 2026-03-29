"use client"

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './InquiryModal.module.css';

interface InquiryModalProps {
    isOpen: boolean;
    onClose: () => void;
    serviceTitle?: string;
}

export default function InquiryModal({ isOpen, onClose, serviceTitle }: InquiryModalProps) {
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        stream: '',
        course: '',
        education: '',
        location: '',
        colleges: '',
        inquiry: '',
        goal: serviceTitle || 'Consultation'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    stream: formData.stream,
                    class: formData.education,
                    goal: formData.goal,
                    targetCourse: formData.course,
                    studentLocation: formData.location,
                    interestedColleges: formData.colleges,
                    additionalInfo: formData.inquiry
                })
            });
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({
                    name: '', phone: '', email: '', stream: '', course: '', 
                    education: '', location: '', colleges: '', inquiry: '', 
                    goal: serviceTitle || 'Consultation'
                });
            }, 2500);
        } catch (error) {
            setStatus('idle');
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay} onClick={onClose}>
                    <motion.div 
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
                        
                        {status === 'success' ? (
                            <div className={styles.success}>
                                <h2>🎉 Request Submitted!</h2>
                                <p>Thank you for choosing Aastha. Our experts are reviewing your profile and will contact you shortly.</p>
                            </div>
                        ) : (
                            <>
                                <h2 className={styles.modalTitle}>Consultation Request</h2>
                                <p className={styles.sub}>Fill in your academic profile for personalized guidance.</p>
                                
                                <form onSubmit={handleSubmit} className={styles.formScroller}>
                                    <div className={styles.formGrid}>
                                        <div className={styles.group}>
                                            <label>Full Name</label>
                                            <input type="text" required placeholder="e.g. Rahul Sharma" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                        </div>
                                        <div className={styles.group}>
                                            <label>Phone Number</label>
                                            <input type="tel" required placeholder="+91 00000 00000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                        </div>
                                        <div className={styles.group}>
                                            <label>Email Address</label>
                                            <input type="email" required placeholder="your@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                        </div>
                                        <div className={styles.group}>
                                            <label>Academic Stream</label>
                                            <select required value={formData.stream} onChange={e => setFormData({...formData, stream: e.target.value})}>
                                                <option value="">Select Stream</option>
                                                <option value="Science">Science (PCB/PCM)</option>
                                                <option value="Commerce">Commerce</option>
                                                <option value="Arts">Arts / Humanities</option>
                                                <option value="Engineering">Engineering</option>
                                                <option value="Medical">Medical / Healthcare</option>
                                                <option value="Management">Management / MBA</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                        <div className={styles.group}>
                                            <label>Specific Course</label>
                                            <input type="text" placeholder="e.g. CSE, Cardiology, HR" value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} />
                                        </div>
                                        <div className={styles.group}>
                                            <label>Current Education</label>
                                            <select required value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})}>
                                                <option value="">Select Level</option>
                                                <option value="10th">Class 10th</option>
                                                <option value="12th">Class 12th</option>
                                                <option value="Undergraduate">Undergraduate</option>
                                                <option value="Graduate">Postgraduate</option>
                                            </select>
                                        </div>
                                        <div className={styles.group}>
                                            <label>Your City / Location</label>
                                            <input type="text" placeholder="e.g. Jamshedpur, Ranchi" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                                        </div>
                                        <div className={styles.group}>
                                            <label>Colleges Interested In</label>
                                            <input type="text" placeholder="e.g. SRM, VIT, Manipal, etc." value={formData.colleges} onChange={e => setFormData({...formData, colleges: e.target.value})} />
                                        </div>
                                    </div>
                                    <div className={styles.groupFull}>
                                        <label>Additional Inquiry / Special Request</label>
                                        <textarea rows={3} placeholder="Describe your career goals or specific concerns..." value={formData.inquiry} onChange={e => setFormData({...formData, inquiry: e.target.value})} />
                                    </div>
                                    <button type="submit" className={styles.submit} disabled={status === 'sending'}>
                                        {status === 'sending' ? 'Processing...' : 'Submit Request'}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
