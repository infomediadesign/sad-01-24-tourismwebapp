import styles from './homepagebody.module.css';
import { Content } from 'next/font/google';

const Homepagebody = () => {
  return (
   
      <div className={styles.container}>
        
        
            <div className={`${styles.panel} ${styles.Austria}`}>
              <h3>Austria</h3>
           
        </div>
        
          <div className={`${styles.panel} ${styles.Finland}`}>
            <h3>Finland</h3>
          
        </div>
          
            <div className={`${styles.panel} ${styles.Greece}`}>
              <h3>Greece</h3>
            </div>
      </div>
  );
};

export default Homepagebody;