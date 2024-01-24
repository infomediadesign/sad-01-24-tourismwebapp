'use client'
import React from 'react';
import styles from './adminlogin.module.css'
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/register', {name, email, password})
        .then(res => {
            alert("user created")
            console.log(res.data);
        }).catch(err => console.log(err))
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.form}>
                <div className={styles.login}>
                    <div className={styles.loginHeader}>
                        <h3>HI ADMIN !</h3>
                        <p>Please enter your credentials to login.</p>
                    </div>
                </div>
                <form className={styles.loginForm} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="username"
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type='submit'>login</button>
                </form>
            </div>
        </div>
    );
}
