'use client'
import React, { useState } from 'react';
import styles from './country.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

function Countries() {
  const images = [
    { src: '/image/valleta3.jpg', alt: 'Valletta' },
    { src: '/image/Gozo.jpg', alt: 'Gozo' },
    { src: '/image/Mdina-Malta-.jpg', alt: 'Mdina' },
    { src: '/image/julia3.jpg', alt: 'St.Julia' },
    { src: '/image/Popeye_Village.jpg', alt: 'Popeye Village' },
    { src: '/image/goldenbay.jpg', alt: 'Golden Bay' },
    
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handleScroll = (direction) => {
    const totalImages = images.length;
    const increment = 3;

    if (direction === 'right') {
      const newStartIndex = Math.min(startIndex + increment, totalImages - 1);
      setStartIndex(newStartIndex);
    } else if (direction === 'left') {
      const newStartIndex = Math.max(startIndex - increment, 0);
      setStartIndex(newStartIndex);
    }
  };

  return (
    <>
      <div className={styles.countryContainer}>
        <img
          src="/image/malta.jpg"
          alt="Malta Banner"
          className={styles.bannerImage}
        />
      </div>
      <div className={styles.description}>
        <h1>MALTA</h1>
        <p>
          Malta offers many diverse types of activities to suit the entire
          family. From walking around Valletta, the walled capital and a UNESCO
          World Heritage Site, to the famous beaches, boating, and historic
          sites, there's a great deal to see and do on the islands.
        </p>
      </div>
      <div className={styles.imageContainer}>
        {images.slice(startIndex, startIndex + 3).map((image, index) => (
          <div className={styles.imageWithCaption} key={index}>
            <img
              src={image.src}
              alt={image.alt}
              className={styles.horizontalImage}
            />
            <p className={styles.imageName}>{image.alt}</p>
          </div>
        ))}
     
      <div className={styles.scrollButtons}>
        <button
          className={styles.scrollButton}
          onClick={() => handleScroll('left')}
        >
          <FaAngleLeft />
        </button>
        <div style={{ margin: '0 20px' }}></div>
        <button
          className={styles.scrollButton}
          onClick={() => handleScroll('right')}
        >
          <FaAngleRight />
        </button>
        </div>
      </div>
    </>
  );
}

export default Countries;