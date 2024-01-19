import NavbarAdmin from '@/app/components/NavbarAdmin'
import React from 'react'
import styles from './getCountry.module.css'

export default function page() {
  return (
    <div>
      <NavbarAdmin />
      <div className={styles.countrydetails}>
        <p className={styles.test}>HI country</p>
      </div>
    </div>
  )
}
