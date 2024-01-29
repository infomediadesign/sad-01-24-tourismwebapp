import NavbarAdmin from '@/app/components/NavbarAdmin'
import React from 'react'
import styles from '../getCountry/getCountry.module.css'

export default function page() {
    return (
        <div>
            <NavbarAdmin />
            <div className={styles.countrydetails}>
                <div>
                    <h1>Favorite Details</h1>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th>City</th>
                                <th>MainImave</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> </td>
                                <td> </td>
                                <td> </td>
                                <td className={styles.buttons}>
                                    <button className={styles.add}>Add</button>
                                    <button className={styles.delete}>Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
