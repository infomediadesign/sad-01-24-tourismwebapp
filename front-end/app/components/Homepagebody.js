import styles from './homepagebody.module.css';
import { Content } from 'next/font/google';
import Image from 'next/image';

const Homepagebody = () => {
  return (
   
      <><div className={styles.container}>


      <div className={`${styles.panel} ${styles.Austria}`}>
        <h1 className={styles.text}>Austria</h1>

      </div>

      <div className={`${styles.panel} ${styles.Finland}`}>
        <h1 className={styles.text}>Finland</h1>

      </div>

      <div className={`${styles.panel} ${styles.Greece}`}>
        <h1 className={styles.text}>Greece</h1>
      </div>
    </div>
    <div>
        <p className={styles.wanderlust}>
          Wanderlust
        </p>
        <p className={styles.wanderlustpara}>Wanderlust</p>
        <p className={styles.paragraph}>
        We envision a world where every traveler can effortlessly discover and 
        connect with the beauty of 10 Schengen countries in Europe. Whether you're 
        a seasoned explorer or a first-time adventurer, Wanderlust is your gateway 
        to a curated selection of enchanting tourist places, each with its own unique 
        charm and cultural significance.
        </p>
        <div className={styles.logoContainer}>
        <Image
                    src="/Images/twitter.svg"
                    alt="Description of the first image"
                    width={20}
                    height={20}
                />

</div>
      </div>
      </>
  );
};

export default Homepagebody;