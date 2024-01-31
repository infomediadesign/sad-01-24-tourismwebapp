import React from 'react';
import styles from './login.module.css';

const page = ({ setOpenPopup, handleClosePopup }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        {/* Popup content */}
        <h2>Login</h2>
        {/* Add your login form or content here */}
        <button onClick={handleClosePopup}>Close</button>
      </div>
    </div>
  );
};

export default page;