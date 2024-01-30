'use client'
import NavbarAdmin from '@/app/components/NavbarAdmin'
import React, { useState, useEffect } from 'react'
import styles from '../getCountry/getCountry.module.css'
import { useRouter } from 'next/navigation';
import Updatesavedpop from '@/app/components/Updatesavedpop';

export default function page() {
    
    const [updatePopup, setUpdatePopup] = useState(false);
    const [saveditemsdetails, setSaveditemsDetail] = useState([]);
    const [saveditemsId  , setSaveditemsId] = useState('');
    const router = useRouter();

    useEffect(() => {
      fetch('http://localhost:8000/users/saveditems', { credentials: 'include' })
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
      fetch('http://localhost:8000/saveditems')
        .then(res => res.json())
        .then(data => {
          setSaveditemsDetail(data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, [])
  
 const handleUpdate = (id) => () => {
    
    setUpdatePopup(true);
    setSaveditemsId(id);
  }


  const updatedSaveditems = () => {
    fetch('http://localhost:8000/saveditems')
      .then(res => res.json())
      .then(data => {
        setSaveditemsDetail(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/saveditems/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Saveditems with ID ${id} deleted successfully`);
        const updatedSaveditemsDetails = saveditemsdetails.filter(detail => detail._id !== id);
        setSaveditemsDetail(updatedSaveditemsDetails);
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
                        {saveditemsdetails.map((detail) => (
                            <tr  key={detail._id}>
                               <td> {detail.place}</td>
                                 <td> {detail.custid}</td>
                                <td> {detail.country}</td>
                               
                                <td> {detail.date}</td>
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
      {updatePopup && <Updatesavedpop setOpenPopup={setUpdatePopup} saveditemsId={saveditemsId} updatedSaveditemsDetails = {updatedSaveditems} />}
        </div>
    )
}
