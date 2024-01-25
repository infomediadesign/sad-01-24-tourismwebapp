'use client'
import React, { useState } from 'react';
import styles from './places.module.css';

export default function Places() {
  const [showMore, setShowMore] = useState(false);

  const toggleContent = () => {
    setShowMore(!showMore);
  };


  return (
    <div className={styles.placesContainer}>
      <img
        src="/image/valleta3.jpg"
        alt="Valletta Banner"
        className={styles.bannerImage}
      />
      <div className={styles.contentContainer}>
        <div className={styles.headingLeft}>
          <h1>Valletta</h1>
          <p className={styles.subHeading}>Malta, Southern Europe</p>
          </div>

          <button className={styles.saveButton}>
            save
          </button>
          <div className={styles.description}>
            <p>
              Malta's capital Valletta is a fortified city located on a hilly
              peninsula between two of the finest natural harbours in the
              Mediterranean. The Siege of Malta in 1565 captured the European
              imagination and mobilised the resources needed to create the new
              city of Valletta, founded soon after, in 1566. The Knights of St
              John, aided by the most respected European military engineers of the
              16th century, conceived and planned the city as a single.
            </p>
          </div>
          {showMore ? (
          <>
            <div className={styles.additionalContent}>
              <p>
                Valletta is located on the north-east coast of the island and is located on the Monte Sciberras headland, 
                which is surrounded by the two largest natural harbors in the Mediterranean, Grand Harbor and Marsamxett Harbour. 
                Valletta borders the neighboring town of Floriana to the southwest. Longitudinally (northeast-southwest), 
                Republic Street (formerly Queen's Street) and the parallel Merchants Street have long been the main commercial streets.
              </p>
              </div>
              <div>
                  <img
                    src="/image/valleta.jpg"
                    alt=" Place "
                    className={styles.horiImage}
                  />
                  
                </div>
                <button className={styles.readMoreButton} onClick={toggleContent}>
              Read Less
            </button>
          </>
        ) : (
          <button className={styles.readMoreButton} onClick={toggleContent}>
            Read More
          </button>
        )}
      </div>
    </div>
  );
}