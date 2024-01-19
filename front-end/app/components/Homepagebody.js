"use client";  
import React, { useRef } from 'react';
import styles from './homepagebody.module.css';
import { Content } from 'next/font/google';

const Homepagebody = () => {
   




  return (
    <>
      <div className={styles.Container}>
        
      <div className={styles.Container}>
            <div className={`${styles.panel} ${styles.leftImage}`}></div>
            <h3>Sweden</h3>
          <div className={`${styles.panel} ${styles.centerImage}`}></div>
          <h3>Sweden</h3>
          <div className={`${styles.panel} ${styles.rightImage}`}></div>
          <h3>Sweden</h3>
          

          </div>
      </div>

      
     
    </>
  );
};

export default Homepagebody;