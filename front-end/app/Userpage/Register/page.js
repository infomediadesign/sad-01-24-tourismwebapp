import React from 'react';
import styles from './login.module.css';
import Register from '../../components/Register';
import Navbar from '@/app/components/Navbar';




const Page = ({ handleClosePopup }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <Navbar />
        <h2>Login</h2>
        <Register handleClosePopup={handleClosePopup} />
        <button onClick={handleClosePopup}>Close</button>
      </div>
    </div>
  );
};

export default Page;