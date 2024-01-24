import React from 'react';
import styles from '../components/saveditem.module.css';

export default function SavedItems() {
  return (
    <div>
      <div className={styles.container}>
        <div>
          <img src='/images/paris.jpg' alt="eiffel-tower" style={{ width: '100%', height: 'auto' }} />
        </div>
        <header className={styles.header}>
          <h1>MY LIST</h1>
          <div className={styles.headerContent}>
            <button className={styles.removeBtn}>REMOVE LIST</button>
          </div>
        </header>
        <div className={styles.imageCollage}>
          <div className={styles.imageItem}>
            <img src='/images/Greece.jpg' alt="Greece" 
            className={styles.horizontalImage} />
            <p>Greece</p>
          </div>
          <div className={styles.imageItem}>
            <img src="/images/Cochem.jpg" alt="Cochem" 
            className={styles.horizontalImage}  />
            <p>Cochem</p>
          </div>
          <div className={styles.imageItem}>
            <img src="/images/Amsterdam.jpg" alt="Amsterdam" 
            className={styles.horizontalImage} />
            <p>Amsterdam</p>
          </div>
        </div>
        <aside>
          <h2>All saved items </h2>
        </aside>
      </div>
    </div>
  );
}
