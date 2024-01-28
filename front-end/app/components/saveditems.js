'use client'
import { useState, useEffect } from 'react'
import styles from '../components/saveditem.module.css'




export default function SavedItems() {
  const [imageCount, setImageCount] = useState([]);

  useEffect(() => {
    // Fetch image data from backend
    fetchImageData()
      .then(images => {
        // Calculate the count of images
        const count = images.length;
        setImageCount(count);
      })
      .catch(error => {
        console.error('Error fetching image data:', error);
      });
  }, []);

  const fetchImageData = async () => {
    // Make API call to fetch image data from backend
    const response = await fetch('http://localhost:7000/saveditems');
    if (!response.ok) {
      throw new Error('Failed to fetch image data');
    }
    const data = await response.json();
    return data;
  };
  return (
    <div>
      <div className={styles.container}>
        <div>
          <img src='/images/paris.jpg' alt="eiffel-tower" style={{ width: '100%', height: 'auto' }} />
        </div>
        <header className={styles.header}>

          <h1>MY LIST ({imageCount}) </h1>
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
      
      </div>
    </div>
  );
}
