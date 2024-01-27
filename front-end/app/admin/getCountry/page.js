'use client'
import NavbarAdmin from '@/app/components/NavbarAdmin'
import React, { useState, useEffect } from 'react'
import styles from './getCountry.module.css'
import AddCountryPopup from '@/app/components/AddCountryPopup'
import { useRouter } from 'next/navigation';
import UpdateCountryPopup from '@/app/components/UpdateCountryPopup'

export default function page() {
  const [openPopup, setOpenPopup] = useState(false);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [countrydetails, setCountryDetail] = useState([]);
  const [countryId, setCountryId] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:4000/country', { credentials: 'include' })
      .then(res => res.json())
      .then(data => {
        if (data === "Success") {
          router.push('/admin/getCountry')
        } else {
          router.push('/admin')
        }
      })
      .catch((error) => console.error(error));
  }, [])


  useEffect(() => {
    fetch('http://localhost:5000/getCountry')
      .then(res => res.json())
      .then(data => {
        setCountryDetail(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])

  const handleClick = () => {
    setOpenPopup(true);
  }

  const handleUpdate = (id) => () => {
    // router.push(`/admin/updateCountry/${id}`)
    setUpdatePopup(true);
    setCountryId(id);
  }

  const updatedCountry = () => {
    fetch('http://localhost:5000/getCountry')
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
      const response = await fetch(`http://localhost:5000/deleteCountry/${id}`, {
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

      <br />
      <div className={styles.countrydetails}>
        <div>
          <h1>Country Details</h1>
          <div className={styles.buttons}>
            <button className={styles.add} onClick={handleClick}>Add</button>
          </div>
          <br />
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
              {countrydetails.map((detail) => (
                <tr key={detail._id}>
                  <td>{detail.name}</td>
                  <td>{detail.imageMain} </td>
                  <td>{detail.image1} </td>
                  <td>{detail.image1} </td>
                  <td>{detail.image1} </td>
                  <td>{detail.description} </td>
                  <td className={styles.buttons}>
                    <button className={styles.add} onClick={handleUpdate(detail._id)}>Update</button>
                    <button className={styles.delete} onClick={(e) => handleDelete(detail._id)}>Delete</button>
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
