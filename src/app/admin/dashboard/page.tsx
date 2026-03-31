"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../Admin.module.css';

interface Counsellor {
    _id: string;
    name: string;
    bio: string;
    email: string;
    phone: string;
}

interface Lead {
    _id: string;
    name: string;
    phone: string;
    email: string;
    stream: string;
    class: string;
    goal: string;
    date: string;
    studentLocation?: string;
    targetCourse?: string;
    interestedColleges?: string;
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
    image?: string;
    link?: string;
    location?: string;
}

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('leads');
    const [leads, setLeads] = useState<Lead[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [notices, setNotices] = useState<Notice[]>([]);
    const [colleges, setColleges] = useState<College[]>([]);
    const [counsellors, setCounsellors] = useState<Counsellor[]>([]);

    const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isCollegeModalOpen, setIsCollegeModalOpen] = useState(false);
    const [isCounsellorModalOpen, setIsCounsellorModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    const [newNotice, setNewNotice] = useState({ title: '', content: '', type: 'info', date: '', phone: '', email: '' });
    const [newReview, setNewReview] = useState({ name: '', role: '', text: '', avatar: '' });
    const [newCollege, setNewCollege] = useState({ name: '', excellence: '', tags: '', image: '', link: '', location: '' });
    const [newCounsellor, setNewCounsellor] = useState({ name: '', bio: '', email: '', phone: '' });

    const fetchData = async () => {
        try {
            const [l, r, n, c, s] = await Promise.all([
                fetch('/api/leads').then(res => res.json()),
                fetch('/api/reviews').then(res => res.json()),
                fetch('/api/notices').then(res => res.json()),
                fetch('/api/colleges').then(res => res.json()),
                fetch('/api/counsellors').then(res => res.json())
            ]);
            setLeads(Array.isArray(l) ? l : []);
            setReviews(Array.isArray(r) ? r : []);
            setNotices(Array.isArray(n) ? n : []);
            setColleges(Array.isArray(c) ? c : []);
            setCounsellors(Array.isArray(s) ? s : []);
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

    const saveItem = async (endpoint: string, data: any, closeMode: () => void, clearForm: () => void) => {
        const method = editId ? 'PUT' : 'POST';
        const body = editId ? { ...data, id: editId } : data;
        await fetch(`/api/${endpoint}`, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        setEditId(null);
        closeMode();
        clearForm();
        fetchData();
    };

    const openEdit = (item: any, type: string) => {
        setEditId(item._id);
        if (type === 'notice') {
            setNewNotice({ title: item.title, content: item.content, type: item.type, date: item.date, phone: item.phone || '', email: item.email || '' });
            setIsNoticeModalOpen(true);
        } else if (type === 'review') {
            setNewReview({ name: item.name, role: item.role, text: item.text, avatar: item.avatar || '' });
            setIsReviewModalOpen(true);
        } else if (type === 'college') {
            setNewCollege({ 
                name: item.name, 
                excellence: item.excellence, 
                tags: item.tags, 
                image: item.image || '', 
                link: item.link || '', 
                location: item.location || '' 
            });
            setIsCollegeModalOpen(true);
        } else if (type === 'counsellor') {
            setNewCounsellor({
                name: item.name,
                bio: item.bio,
                email: item.email,
                phone: item.phone || ''
            });
            setIsCounsellorModalOpen(true);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewCollege({ ...newCollege, image: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleReviewImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewReview({ ...newReview, avatar: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };


    const deleteItem = async (endpoint: string, id: string) => {
        if (!confirm('Are you sure?')) return;
        await fetch(`/api/${endpoint}?id=${id}`, { method: 'DELETE' });
        fetchData();
    };

    const exportToExcel = () => {
        const headers = ["Date", "Name", "Phone", "Email", "Stream", "Course", "Class", "Location", "Colleges", "Goal"];
        const rows = leads.map(l => [
            l.date,
            l.name,
            l.phone,
            l.email || "N/A",
            l.stream,
            l.targetCourse || "-",
            l.class,
            l.studentLocation || "-",
            (l.interestedColleges || "-").replace(/,/g, " | "),
            (l.goal || "-").replace(/,/g, " | ")
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(e => e.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Aastha_Leads_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
                    <li className={activeTab === 'counsellors' ? styles.activeTab : ''} onClick={() => setActiveTab('counsellors')}>Experts ({counsellors.length})</li>
                    <li onClick={handleLogout} style={{ color: '#ff4d4d', fontWeight: 'bold' }}>Logout</li>
                </ul>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.statsGrid}>
                    <div className={styles.statCard}>
                        <h3>📩 TOTAL ENQUIRIES</h3>
                        <p>{leads.length}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>🔔 ACTIVE ALERTS</h3>
                        <p>{notices.length}</p>
                    </div>
                    <div className={styles.statCard}>
                        <h3>🎓 PARTNER COLLEGES</h3>
                        <p>{colleges.length}</p>
                    </div>
                </div>

                {activeTab === 'leads' && (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Student Inquiries</h2>
                            <button className={styles.exportBtn} onClick={exportToExcel}>Export to Excel (.csv)</button>
                        </div>
                        <table className={styles.table}>
                            <thead><tr><th>Date</th><th>Student</th><th>Location</th><th>Interest</th><th>Colleges</th><th>Goal</th><th>Actions</th></tr></thead>
                            <tbody>
                                {leads.map(lead => (
                                    <tr key={lead._id}>
                                        <td style={{ fontSize: '0.8rem' }}>{lead.date?.split(',')[0]}</td>
                                        <td>
                                            <div style={{ fontWeight: 600 }}>{lead.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#666' }}>{lead.phone}</div>
                                            <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{lead.email}</div>
                                        </td>
                                        <td>{lead.studentLocation || '-'}</td>
                                        <td>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{lead.stream}</div>
                                            <div style={{ fontSize: '0.75rem', color: '#5b2d8e' }}>{lead.targetCourse}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#666' }}>{lead.class}</div>
                                        </td>
                                        <td style={{ maxWidth: '150px', fontSize: '0.8rem' }}>{lead.interestedColleges}</td>
                                        <td style={{ maxWidth: '200px', fontSize: '0.8rem', opacity: 0.8 }}>{lead.goal}</td>
                                        <td>
                                            <a href={`tel:${lead.phone}`} className={`${styles.actionsBtn} ${styles.callBtn}`}>Call</a>
                                            <a href={`https://wa.me/91${lead.phone.replace(/\D/g, '')}`} target="_blank" className={`${styles.actionsBtn} ${styles.waBtn}`}>WhatsApp</a>
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
                                        <td>
                                            <button className={`${styles.actionsBtn} ${styles.editBtn}`} onClick={() => openEdit(n, 'notice')}>Edit</button>
                                            <button className={`${styles.actionsBtn} ${styles.deleteBtn}`} onClick={() => deleteItem('notices', n._id)}>Remove</button>
                                        </td>
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
                                        <td>
                                            <button className={`${styles.actionsBtn} ${styles.editBtn}`} onClick={() => openEdit(r, 'review')}>Edit</button>
                                            <button className={`${styles.actionsBtn} ${styles.deleteBtn}`} onClick={() => deleteItem('reviews', r._id)}>Delete</button>
                                        </td>
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
                                        <td>
                                            <button className={`${styles.actionsBtn} ${styles.editBtn}`} onClick={() => openEdit(c, 'college')}>Edit</button>
                                            <button className={`${styles.actionsBtn} ${styles.deleteBtn}`} onClick={() => deleteItem('colleges', c._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'counsellors' && (
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h2>Expert Counsellors</h2>
                            <button className={styles.addBtn} onClick={() => setIsCounsellorModalOpen(true)}>Add Expert</button>
                        </div>
                        <table className={styles.table}>
                            <thead><tr><th>Name</th><th>Email / Phone</th><th>Bio</th><th>Actions</th></tr></thead>
                            <tbody>
                                {counsellors.map(c => (
                                    <tr key={c._id}>
                                        <td><strong>{c.name}</strong></td>
                                        <td>
                                            <div>{c.email}</div>
                                            <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{c.phone}</div>
                                        </td>
                                        <td>{c.bio.substring(0, 50)}...</td>
                                        <td>
                                            <button className={`${styles.actionsBtn} ${styles.editBtn}`} onClick={() => openEdit(c, 'counsellor')}>Edit</button>
                                            <button className={`${styles.actionsBtn} ${styles.deleteBtn}`} onClick={() => deleteItem('counsellors', c._id)}>Delete</button>
                                        </td>
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
                        <h3>{editId ? 'Edit Alert' : 'Add Alert'}</h3>
                        <div className={styles.formGroup}><label>Title</label><input type="text" placeholder="e.g. Admissions 2024 Open" value={newNotice.title} onChange={e => setNewNotice({ ...newNotice, title: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Content</label><textarea placeholder="Specify the core details here..." value={newNotice.content} onChange={e => setNewNotice({ ...newNotice, content: e.target.value })}></textarea></div>
                        <div className={styles.formGroup}><label>Date / Year</label><input type="text" value={newNotice.date} placeholder="e.g. 2024-25" onChange={e => setNewNotice({ ...newNotice, date: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Phone (Optional)</label><input type="text" placeholder="+91 00000 00000" value={newNotice.phone} onChange={e => setNewNotice({ ...newNotice, phone: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Email (Optional)</label><input type="text" placeholder="contact@college.com" value={newNotice.email} onChange={e => setNewNotice({ ...newNotice, email: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Type</label><select value={newNotice.type} onChange={e => setNewNotice({ ...newNotice, type: e.target.value })}><option value="info">Info</option><option value="urgent">Urgent</option><option value="new">New Update</option></select></div>
                        <button className={styles.addBtn} style={{ background: '#6366f1', width: '100%', marginBottom: '10px', padding: '14px' }} onClick={() => saveItem('notices', newNotice, () => setIsNoticeModalOpen(false), () => { setNewNotice({ title: '', content: '', type: 'info', date: '', phone: '', email: '' }); setEditId(null); })}>Save Alert Details</button>
                        <button className={styles.actionsBtn} style={{ width: '100%', padding: '12px' }} onClick={() => { setIsNoticeModalOpen(false); setEditId(null); }}>Discard Changes</button>
                    </div>
                </div>
            )}

            {isReviewModalOpen && (
                <div className={styles.formModal}>
                    <div className={styles.modalContent}>
                        <h3>{editId ? 'Edit Story' : 'Add Story'}</h3>
                        <div className={styles.formGroup}><label>Student Name</label><input type="text" placeholder="Rahul Singh" value={newReview.name} onChange={e => setNewReview({ ...newReview, name: e.target.value })} /></div>
                        
                        <div className={styles.formGroup}>
                            <label>Student Photo (Avatar)</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className={styles.fileInput}
                                onChange={handleReviewImageUpload} 
                            />
                            {newReview.avatar && (
                                <img src={newReview.avatar} alt="Student" className={styles.imgPreview} style={{ borderRadius: '50%', width: '80px', height: '80px', margin: '10px auto', display: 'block' }} />
                            )}
                        </div>

                        <div className={styles.formGroup}><label>Role / College</label><input type="text" placeholder="B.Tech Student, VIT" value={newReview.role} onChange={e => setNewReview({ ...newReview, role: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Success Story</label><textarea placeholder="Describe how Aastha Education helped..." value={newReview.text} onChange={e => setNewReview({ ...newReview, text: e.target.value })}></textarea></div>
                        <button className={styles.addBtn} style={{ background: '#6366f1', width: '100%', marginBottom: '10px', padding: '14px' }} onClick={() => saveItem('reviews', newReview, () => setIsReviewModalOpen(false), () => { setNewReview({ name: '', role: '', text: '', avatar: '' }); setEditId(null); })}>Save Story Details</button>
                        <button className={styles.actionsBtn} style={{ width: '100%', padding: '12px' }} onClick={() => { setIsReviewModalOpen(false); setEditId(null); }}>Discard Changes</button>
                    </div>
                </div>
            )}

            {isCollegeModalOpen && (
                <div className={styles.formModal}>
                    <div className={styles.modalContent}>
                        <h3>{editId ? 'Edit College' : 'Add College'}</h3>
                        <div className={styles.formGroup}><label>College Name</label><input type="text" placeholder="e.g. SRM Institute of Technology" value={newCollege.name} onChange={e => setNewCollege({ ...newCollege, name: e.target.value })} /></div>
                        
                        <div className={styles.formGroup}>
                            <label>College Photo (Upload from Device)</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className={styles.fileInput}
                                onChange={handleImageUpload} 
                            />
                            {newCollege.image && (
                                <img src={newCollege.image} alt="Preview" className={styles.imgPreview} />
                            )}
                        </div>

                        <div className={styles.formGroup}><label>Academic Excellence</label><input type="text" placeholder="e.g. A++ Rated, Top 10 NIRF" value={newCollege.excellence} onChange={e => setNewCollege({ ...newCollege, excellence: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Tags (Comma separated)</label><input type="text" placeholder="e.g. Engineering, Medical, Huge Campus" value={newCollege.tags} onChange={e => setNewCollege({ ...newCollege, tags: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Location</label><input type="text" placeholder="e.g. Chennai, Tamil Nadu" value={newCollege.location} onChange={e => setNewCollege({ ...newCollege, location: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Website Link</label><input type="text" placeholder="https://www.srmist.edu.in" value={newCollege.link} onChange={e => setNewCollege({ ...newCollege, link: e.target.value })} /></div>
                        
                        <button className={styles.addBtn} style={{ background: '#6366f1', width: '100%', marginBottom: '10px', padding: '14px' }} onClick={() => saveItem('colleges', newCollege, () => setIsCollegeModalOpen(false), () => { setNewCollege({ name: '', excellence: '', tags: '', image: '', link: '', location: '' }); setEditId(null); })}>Save College Details</button>
                        <button className={styles.actionsBtn} style={{ width: '100%', padding: '12px' }} onClick={() => { setIsCollegeModalOpen(false); setEditId(null); }}>Discard Changes</button>
                    </div>
                </div>
            )}

            {isCounsellorModalOpen && (
                <div className={styles.formModal}>
                    <div className={styles.modalContent}>
                        <h3>{editId ? 'Edit Expert' : 'Add Expert'}</h3>
                        <div className={styles.formGroup}><label>Name</label><input type="text" placeholder="e.g. Dr. Amit Sharma" value={newCounsellor.name} onChange={e => setNewCounsellor({ ...newCounsellor, name: e.target.value })} /></div>
                        

                        <div className={styles.formGroup}><label>Email</label><input type="text" placeholder="amit@aastha.com" value={newCounsellor.email} onChange={e => setNewCounsellor({ ...newCounsellor, email: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Phone</label><input type="text" placeholder="+91 00000 00000" value={newCounsellor.phone} onChange={e => setNewCounsellor({ ...newCounsellor, phone: e.target.value })} /></div>
                        <div className={styles.formGroup}><label>Bio</label><textarea placeholder="Brief history and expertise..." value={newCounsellor.bio} onChange={e => setNewCounsellor({ ...newCounsellor, bio: e.target.value })}></textarea></div>
                        
                        <button className={styles.addBtn} style={{ background: '#6366f1', width: '100%', marginBottom: '10px', padding: '14px' }} onClick={() => saveItem('counsellors', newCounsellor, () => setIsCounsellorModalOpen(false), () => { setNewCounsellor({ name: '', bio: '', email: '', phone: '' }); setEditId(null); })}>Save Expert Details</button>
                        <button className={styles.actionsBtn} style={{ width: '100%', padding: '12px' }} onClick={() => { setIsCounsellorModalOpen(false); setEditId(null); }}>Discard Changes</button>
                    </div>
                </div>
            )}
        </div>
    );
}
