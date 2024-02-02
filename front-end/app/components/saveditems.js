'use client'
import { useEffect, useState } from 'react'
import styles from '../components/saveditem.module.css'

export default function SavedItems() {
  const [saveItems, setSaveItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7000/saveditems')
      .then(res => res.json())
      .then(data => {
        console.log(data.length);
        console.log(data);
        setSaveItems(data);
      })
      .catch(error => {
        console.error('Error fetching image data:', error);
      });
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div>
          <img src='/images/paris.jpg' alt="eiffel-tower" style={{ width: '100%', height: 'auto' }} />
        </div>
        <header className={styles.header}>

          <h1>MY LIST ({saveItems.length}) </h1>
          <div className={styles.headerContent}>
            <button className={styles.removeBtn}>REMOVE LIST</button>
          </div>
        </header>

        <div className={styles.imageCollage}>
          {saveItems.map((item, index) =>
            <div className={styles.imageItem}>
              <img src={`http://localhost:9000/images/${item.image}`} alt={item.place}
                className={styles.horizontalImage} />
              <p>{item.place}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
