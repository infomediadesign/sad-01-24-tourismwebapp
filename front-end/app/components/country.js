// Country.js
'use client'

import React, { useState } from 'react';
import styles from './country.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Country = () =>{
  const [showMore, setShowMore] = useState(true);

  const handleShowMore = () => {
    setShowMore(false);
  };

  const handleScrollLeft = () => {
    console.log('Scrolling left');
  };

  const handleScrollRight = () => {
    console.log('Scrolling right');
  };

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
          <div className={styles.scrollContainer}>
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

            {showMore && (
              <button className={styles.viewMoreButton} onClick={handleShowMore}>
                View more attractions
              </button>
            )}

            {!showMore && (
              <>
                {/* Add more images here */}
                <div className={styles.imageWithCaption}>
                  <img
                    src="/image/St.Julian's.jpg"
                    alt="Another Place 1"
                    className={styles.horizontalImage}
                  />
                  <p className={styles.imageName}>St. Julian's</p>
                </div>

                <div className={styles.imageWithCaption}>
                  <img
                    src="/image/Popeye_Village.jpg"
                    alt="Another Place 2"
                    className={styles.horizontalImage}
                  />
                  <p className={styles.imageName}>Popeye Village</p>
                </div>

                <div className={styles.imageWithCaption}>
                  <img
                    src="/image/golden-bay.jpg"
                    alt="Another Place 3"
                    className={styles.horizontalImage}
                  />
                  <p className={styles.imageName}>Golden bay</p>
                </div>
              </>
            )}
          </div>
          <div className={styles.scrollButtons}>
            <button className={styles.scrollButton} onClick={handleScrollLeft}>
              <FaAngleLeft />
            </button>
            <button className={styles.scrollButton} onClick={handleScrollRight}>
              <FaAngleRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/*export default Country;*/
