"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../Admin.module.css';

interface Lead {
    _id: string;
    name: string;
    phone: string;
    email: string;
    stream: string;
    class: string;
    goal: string;
    date: string;
}

interface Review {
    _id: string;
    name: string;
    role: string;
    avatar: string;
    text: string;
}

interface Notice {
    _id: string;
    title: string;
    content: string;
    date: string;
    type: string;
    phone?: string;
    email?: string;
}

interface College {
    _id: string;
    name: string;
    excellence: string;
    tags: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('leads');
    const [leads, setLeads] = useState<Lead[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [notices, setNotices] = useState<Notice[]>([]);
    const [colleges, setColleges] = useState<College[]>([]);

    const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isCollegeModalOpen, setIsCollegeModalOpen] = useState(false);

    const [newNotice, setNewNotice] = useState({ title: '', content: '', type: 'info', date: '', phone: '', email: '' });
    const [newReview, setNewReview] = useState({ name: '', role: '', text: '' });
    const [newCollege, setNewCollege] = useState({ name: '', excellence: '', tags: '' });

    const fetchData = async () => {
        try {
            const [l, r, n, c] = await Promise.all([
                fetch('/api/leads').then(res => res.json()),
                fetch('/api/reviews').then(res => res.json()),
                fetch('/api/notices').then(res => res.json()),
                fetch('/api/colleges').then(res => res.json())
            ]);
            setLeads(l);
            setReviews(r);
            setNotices(n);
            setColleges(c);
        } catch (e) {
            console.error('Data sync failed');
        }
    };

    useEffect(() => {
        const auth = localStorage.getItem('asc_admin_auth');
        if (!auth) { router.push('/admin'); return; }
        fetchData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('asc_admin_auth');
        router.push('/admin');
    };

    const addItem = async (endpoint: string, data: any, closeMode: () => void, clearForm: () => void) => {
        await fetch(`/api/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        closeMode();
        clearForm();
        fetchData();
    };

    const deleteItem = async (endpoint: string, id: string) => {
        await fetch(`/api/${endpoint}?id=${id}`, { method: 'DELETE' });
        fetchData();
    };

    return (
        <div className={styles.dashboard}>
            <div className={styles.sidebar}>
                <h2>AEC ADMIN</h2>
                <ul>
                    <li className={activeTab === 'leads' ? styles.activeTab : ''} onClick={() => setActiveTab('leads')}>Inquiries ({leads.length})</li>
                    <li className={activeTab === 'notices' ? styles.activeTab : ''} onClick={() => setActiveTab('notices')}>Notices ({notices.length})</li>
                    <li className={activeTab === 'reviews' ? styles.activeTab : ''} onClick={() => setActiveTab('reviews')}>Stories ({reviews.length})</li>
                    <li className={activeTab === 'colleges' ? styles.activeTab : ''} onClick={() => setActiveTab('colleges')}>Colleges ({colleges.length})</li>
                    <li onClick={handleLogout} style={{ marginTop: '40px', color: '#ff4d4d' }}>Logout</li>
                </ul>
            </div>

            <div className={styles.mainContent}>
                {activeTab === 'leads' && (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}><h2>Student Inquiries</h2></div>
                        <table className={styles.table}>
                            <thead><tr><th>Date</th><th>Student</th><th>Inquiry</th><th>Actions</th></tr></thead>
                            <tbody>
                                {leads.map(lead => (
                                    <tr key={lead._id}>
                                        <td>{lead.date}</td>
                                        <td><strong>{lead.name}</strong><br />{lead.phone}</td>
                                        <td>{lead.stream} — {lead.goal}</td>
                                        <td>
                                            <a href={`tel:${lead.phone}`} className={`${styles.actionsBtn} ${styles.callBtn}`}>Call</a>
                                            {lead.email && <a href={`mailto:${lead.email}`} className={`${styles.actionsBtn} ${styles.emailBtn}`}>Email</a>}
                                            <button className={`${styles.actionsBtn} ${styles.deleteBtn}`} onClick={() => deleteItem('leads', lead._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'notices' && (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Alerts</h2>
                            <button className={styles.addBtn} onClick={() => setIsNoticeModalOpen(true)}>Add Alert</button>
                        </div>
                        <table className={styles.table}>
                            <thead><tr><th>Type</th><th>Date</th><th>Notice</th><th>Actions</th></tr></thead>
                            <tbody>
                                {notices.map(n => (
                                    <tr key={n._id}>
                                        <td><span className={`${styles.status} ${styles.statusNew}`}>{n.type}</span></td>
                                        <td>{n.date}</td>
                                        <td>
                                            <strong>{n.title}</strong><br />{n.content}
                                            {(n.phone || n.email) && (
                                                <div style={{ marginTop: '5px', fontSize: '0.8rem', color: '#64748b' }}>
                                                    {n.phone && <span style={{ marginRight: '10px' }}>📞 {n.phone}</span>}
                                                    {n.email && <span>✉️ {n.email}</span>}
                                                </div>
                                            )}
                                        </td>
                                        <td><button className={`${styles.actionsBtn} ${styles.deleteBtn}`} onClick={() => deleteItem('notices', n._id)}>Remove</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'reviews' && (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Stories</h2>
                            <button className={styles.addBtn} onClick={() => setIsReviewModalOpen(true)}>Add Story</button>
                        </div>
                        <table className={styles.table}>
                            <thead><tr><th>Student</th><th>Story</th><th>Actions</th></tr></thead>
                            <tbody>
                                {reviews.map(r => (
                                    <tr key={r._id}>
                                        <td><strong>{r.name}</strong><br />{r.role}</td>
                                        <td>{r.text.substring(0, 80)}...</td>
                                        <td><button className={`${styles.actionsBtn} ${styles.deleteBtn}`} onClick={() => deleteItem('reviews', r._id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'colleges' && (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Colleges</h2>
                            <button className={styles.addBtn} onClick={() => setIsCollegeModalOpen(true)}>Add College</button>
                        </div>
                        <table className={styles.table}>
                            <thead><tr><th>Name</th><th>Excel</th><th>Tags</th><th>Actions</th></tr></thead>
                            <tbody>
                                {colleges.map(c => (
                                    <tr key={c._id}>
                                        <td><strong>{c.name}</strong></td>
                                        <td>{c.excellence}</td>
                                        <td>{c.tags}</td>
                                        <td><button className={`${styles.actionsBtn} ${styles.deleteBtn}`} onClick={() => deleteItem('colleges', c._id)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modals */}
            {isNoticeModalOpen && (
                <div className={styles.formModal}>
                    <div className={styles.modalContent}>
                        <h3>Add Alert</h3>
                        <div className={styles.formGroup}><label>Title</label><input type="text" value={newNotice.title} onChange={e => setNewNotice({ ...newNotice, title: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Content</label><textarea value={newNotice.content} onChange={e => setNewNotice({ ...newNotice, content: e.target.value })}></textarea></div>
                        <div className={styles.formGroup}><label>Date / Year</label><input type="text" value={newNotice.date} placeholder="e.g. 2024-25" onChange={e => setNewNotice({ ...newNotice, date: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Phone (Optional)</label><input type="text" value={newNotice.phone} onChange={e => setNewNotice({ ...newNotice, phone: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Email (Optional)</label><input type="text" value={newNotice.email} onChange={e => setNewNotice({ ...newNotice, email: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Type</label><select value={newNotice.type} onChange={e => setNewNotice({ ...newNotice, type: e.target.value })}><option value="info">Info</option><option value="urgent">Urgent</option><option value="new">New Update</option></select></div>
                        <button className={styles.addBtn} onClick={() => addItem('notices', newNotice, () => setIsNoticeModalOpen(false), () => setNewNotice({ title: '', content: '', type: 'info', date: '', phone: '', email: '' }))}>Save</button>
                        <button className={styles.actionsBtn} onClick={() => setIsNoticeModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}

            {isReviewModalOpen && (
                <div className={styles.formModal}>
                    <div className={styles.modalContent}>
                        <h3>Add Story</h3>
                        <div className={styles.formGroup}><label>Name</label><input type="text" onChange={e => setNewReview({ ...newReview, name: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Role</label><input type="text" onChange={e => setNewReview({ ...newReview, role: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Text</label><textarea onChange={e => setNewReview({ ...newReview, text: e.target.value })}></textarea></div>
                        <button className={styles.addBtn} onClick={() => addItem('reviews', newReview, () => setIsReviewModalOpen(false), () => setNewReview({ name: '', role: '', text: '' }))}>Save</button>
                        <button className={styles.actionsBtn} onClick={() => setIsReviewModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}

            {isCollegeModalOpen && (
                <div className={styles.formModal}>
                    <div className={styles.modalContent}>
                        <h3>Add College</h3>
                        <div className={styles.formGroup}><label>Name</label><input type="text" onChange={e => setNewCollege({ ...newCollege, name: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Excellence</label><input type="text" onChange={e => setNewCollege({ ...newCollege, excellence: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Tags</label><input type="text" onChange={e => setNewCollege({ ...newCollege, tags: e.target.value })} /></div>
                        <button className={styles.addBtn} onClick={() => addItem('colleges', newCollege, () => setIsCollegeModalOpen(false), () => setNewCollege({ name: '', excellence: '', tags: '' }))}>Save</button>
                        <button className={styles.actionsBtn} onClick={() => setIsCollegeModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
