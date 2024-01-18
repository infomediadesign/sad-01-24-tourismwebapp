import Image from 'next/image'
import styles from './page.module.css'
import Navbar from './components/Navbar'



export default function Home() {
  return (
    
    
      
      <div className="overlay-text">
        <Navbar />
       
        <div className={styles.imageContainer}>
       
          <Image
           src="/Images/Pic.jpeg"
            alt="Description of the first image"
            width={1440}
            height={810}
          />
        





  <div className={styles.overlayText}>
    <h1>Explore travel moments worthy of a story to tell.</h1>
  </div>




      </div>
  </div>


  )
}
 