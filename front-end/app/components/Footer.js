import React from 'react'
import Image from 'next/image'
import styles from './footer.module.css'

function Footer() {
  return (
    <div>
        <Image
                    src="/Images/copyright.svg"
                    alt="Description of the first image"
                    width={10}
                    height={10}
                    
                />
        <p className={styles.para}>
        2024 Wanderlust Company. All rights reserved. 
        No part of this site may be reproduced without 
        our written permission.
        </p>
        <p className={styles.Lang}>
            Language
        </p>
        <select name= "Language" className={styles.button}>
  <option value="E">English</option>
  <option value="D">Deutsch</option>

</select>

    </div>
  )
}

export default Footer