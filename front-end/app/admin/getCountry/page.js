'use client'
import NavbarAdmin from '@/app/components/NavbarAdmin'
import React from 'react'
import styles from './getCountry.module.css'

async function getData() {
  const res = await fetch('http://localhost:5000/getCountry');
  const data = await res.json();
  return data;
}
export default async function page() {
  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const response = await fetch('http://localhost:5000/getCountry');
  //     const data = await response.json()
  //     setCountryDetail(data);
  //     console.log(data);
  //   };
  //   fetchdata();
  // }, [])
  const data = await getData();
  console.log(data);
  return (
    <div>
      <NavbarAdmin />
      <div className={styles.countrydetails}>
        <div>
          <h1>Country Details</h1>
          <table className={styles.table}>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Places</th>
                <th>Image1</th>
                <th>Image2</th>
                <th>Image3</th>
                <th>Image4</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
              <tr>
                <td>Peter</td>
                <td>Griffin</td>
                <td>$100</td>
                <td>$100</td>
                <td>$100</td>
                <td>$100</td>
                <td>$100</td>
                <td className={styles.buttons}>
                  <button className={styles.add}>Add</button>
                  <button className={styles.delete}>Delete</button>
                </td>
              </tr>
              <tr>
                <td>Lois</td>
                <td>Griffin</td>
                <td>Griffin</td>
                <td>Griffin</td>
                <td>Griffin</td>
                <td>Griffin</td>
                <td>$150</td>
              </tr>
              <tr>
                <td>Joe</td>
                <td>Joe</td>
                <td>Joe</td>
                <td>Joe</td>
                <td>Joe</td>
                <td>Swanson</td>
                <td>$300</td>
              </tr>
              <tr>
                <td>Cleveland</td>
                <td>Cleveland</td>
                <td>Cleveland</td>
                <td>Cleveland</td>
                <td>Cleveland</td>
                <td>Brown</td>
                <td>$250</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
