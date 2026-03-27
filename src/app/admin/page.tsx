"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Admin.module.css';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'adminasc' && password === 'apreyna5090') {
            localStorage.setItem('asc_admin_auth', 'true');
            router.push('/admin/dashboard');
        } else {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginCard}>
                <div className={styles.loginHeader}>
                    <h2>AEC Admin Panel</h2>
                    <p>Enter your credentials to manage the portal</p>
                </div>
                <form onSubmit={handleLogin} className={styles.loginForm}>
                    {error && <div className={styles.error}>{error}</div>}
                    <div className={styles.formGroup}>
                        <label>Username</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="username" 
                            required 
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="••••••••" 
                            required 
                        />
                    </div>
                    <button type="submit" className={styles.loginBtn}>Login to Dashboard</button>
                </form>
            </div>
        </div>
    );
}
