
 import Image from 'next/image'
  import styles from './page.module.css'
  import Navbar from './components/Navbar.js'
  import Homepagebody from './components/Homepagebody';
  import Aboutus from './components/Aboutus';  
  import Footer from './components/Footer';

  export default function Home() {
    return (
      <><div >

        <Navbar />
        <div className={styles.imagecontainer}>
          <div className={`${styles.image} ${styles.leftImage}`}></div>
          <div className={`${styles.image} ${styles.centerImage}`}></div>
          <div className={`${styles.image} ${styles.rightImage}`}></div>
        </div>
        <div className={styles.overlaytext}>
          <h1>Explore travel moments worthy of a story to tell.</h1>
        </div>
      </div>
      <div className={styles.text}>
          <h2>Set up your trip.</h2>
          <button className={styles.button}>See all Destination</button>
          <p>Next, where to go?</p>
        <Homepagebody />
        <Aboutus />
        <Footer /> 
        </div>
        </>
  );

}
