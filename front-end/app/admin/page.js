import React from 'react';
import styles from './adminlogin.module.css'

export default function Login() {
    return (
        <div className={styles.loginPage}>
            <div className={styles.form}>
                <div className={styles.login}>
                    <div className={styles.loginHeader}>
                        <h3>HI ADMIN !</h3>
                        <p>Please enter your credentials to login.</p>
                    </div>
                </div>
                <form className={styles.loginForm}>
                    <input type="text" placeholder="username" required/>
                    <input type="password" placeholder="password" required/>
                    <button>login</button>
                </form>
            </div>
        </div>
    );
}
