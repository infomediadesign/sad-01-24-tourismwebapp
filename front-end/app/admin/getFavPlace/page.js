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
                                <th>Name</th>
                                <th>Main Img</th>
                                <th>Image1</th>
                                <th>Image2</th>
                                <th>Image3</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>HI</td>
                                <td>Hi</td>
                                <td>HI</td>
                                <td>Hi</td>
                                <td>HI</td>
                                <td>HI</td>
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
