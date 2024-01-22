import React from 'react';
import styles from './country.module.css' 

export default function Country() {
  return (
    <div className={styles.countryContainer}>
      <img
        src="/image/malta.jpg"
        alt="Malta Banner"
        className={styles.bannerImage}
      />

      <div className={styles.contentContainer}>
        <h1>MALTA</h1>
        <p>Malta offers many diverse types of activities to suit the entire family. From walking around Valletta, the walled capital and a UNESCO World Heritage Site, to the famous beaches, boating, and historic sites, there's a great deal to see and do on the islands.</p>
        <div className={styles.imageContainer}>

        <div className={styles.imageWithCaption}>
          <img
            src="/image/valleta3.jpg"
            alt="valleta"
            className={styles.horizontalImage}
          />
           <p className={styles.imageName}>Valletta</p>
          </div>

          <div className={styles.imageWithCaption}>
          <img
            src="/image/Gozo.jpg"
            alt="Gozo"
            className={styles.horizontalImage}
          />
           <p className={styles.imageName}>Gozo</p>
           </div>

           <div className={styles.imageWithCaption}>
          <img
            src="/image/Mdina-Malta-.jpg"
            alt="Mdina"
            className={styles.horizontalImage}
           />
           <p className={styles.imageName}>Mdina</p>
        </div>
        </div>
      
         
          <button className={styles.viewMoreButton}>View more attractions</button>
        
      </div>
    </div>
  );
}
