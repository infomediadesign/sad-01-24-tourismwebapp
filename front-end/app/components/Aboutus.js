import React from 'react'
import styles from './aboutus.module.css'
import Image from 'next/image';


function Aboutus() {
  return (
    <div>
        <p className={styles.wanderlust}>Wanderlust</p>
        <p className={styles.wanderlustpara}> Wanderlust</p>
        <p className={styles.paragraph}> We envision a world where every traveler can effortlessly 
        discover and connect with the beauty of 10 Schengen countries in Europe. Whether you're 
        a seasoned explorer or a first-time adventurer, Wanderlust is your gateway 
        to a curated selection of enchanting tourist places, each with its own unique 
        charm and cultural significance. </p>
        <div className={styles.logoContainer}>
        <Image
                    src="/Images/twitter.svg"
                    alt="Description of the first image"
                    width={50}
                    height={50}
                    className="img"
                />

        <Image
                    src="/Images/facebook.svg"
                    alt="Description of the first image"
                    width={50}
                    height={50}
                />

        <Image
                    src="/Images/instagram.svg"
                    alt="Description of the first image"
                    width={50}
                    height={50}
                />

        <Image
                    src="/Images/youtube.svg"
                    alt="Description of the first image"
                    width={50}
                    height={50}
                />
        </div>
       

    </div>
  )
}

export default Aboutus;