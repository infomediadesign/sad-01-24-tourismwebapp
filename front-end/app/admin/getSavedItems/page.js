'use client'
import NavbarAdmin from '@/app/components/NavbarAdmin'
import React, { useState, useEffect } from 'react'
import styles from '../getCountry/getCountry.module.css'
import { useRouter } from 'next/navigation';
import Updatesavedpop from '@/app/components/Updatesavedpop';

export default function page() {
    const [openPopup, setOpenPopup] = useState(false);
    const [updatePopup, setUpdatePopup] = useState(false);
    const [countrydetails, setCountryDetail] = useState([]);
    const [countryId, setCountryId] = useState('');
    const router = useRouter();

 const handleUpdate = (id) => () => {
    // router.push(`/admin/updateCountry/${id}`)
    setUpdatePopup(true);
    setCountryId(id);
  }

  const updatedCountry = () => {
    fetch('http://localhost:4000/countries')
      .then(res => res.json())
      .then(data => {
        setCountryDetail(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/countries/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Country with ID ${id} deleted successfully`);
        const updatedCountryDetails = countrydetails.filter(detail => detail._id !== id);
        setCountryDetail(updatedCountryDetails);
      }
    } catch (error) {
      console.error('Error during deletion:', error.message);
    }
  };






    return (
        <div>
            <NavbarAdmin />
            <div className={styles.countrydetails}>
                <div>
                    <h1>Favorite Details</h1>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Customer mail</th>
                                <th>Country</th>
                                <th>Place</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                        {countrydetails.map((detail) => (
                            <tr  key={detail._id}>
                                <td> {detail.name}</td>
                                <td> {detail.name}</td>
                                <td> {detail.name}</td>
                                <td className={styles.buttons}>
                                    <button className={styles.add}  onClick={handleUpdate(detail._id)}>Update</button>
                                    <button className={styles.delete}  onClick={(e) => handleDelete(detail._id)}>Delete</button>
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {openPopup && <AddCountryPopup setOpenPopup={setOpenPopup} setCountryDetail={setCountryDetail} countryId={countryId} />}
      {updatePopup && <UpdateCountryPopup setOpenPopup={setUpdatePopup} countryId={countryId} updatedCountryDetails = {updatedCountry} />}
        </div>
    )
}
