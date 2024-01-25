'use client'
import NavbarAdmin from '@/app/components/NavbarAdmin'
import { useState, useEffect } from 'react'
import React from 'react'
import styles from '../getCountry/getCountry.module.css'
import AddPlacePopup from '@/app/components/AddPlacePopup'

export default function page() {
    const [openPopup, setOpenPopup] = useState(false);
    const [placeDetails, setPlaceDetails] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9000/getPlaces')
            .then(res => res.json())
            .then(data => {
                setPlaceDetails(data)
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [])

    const handleClick = () => {
        setOpenPopup(true);
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:9000/deletePlace/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Country with ID ${id} deleted successfully`);
                const updatedPlaceDetails = placeDetails.filter(detail => detail._id !== id);
                setCountryDetail(updatedPlaceDetails);
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
                    <h1>Place Details</h1>
                    <div className={styles.buttons}>
                        <button className={styles.add} onClick={handleClick}>Add</button>
                    </div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Main Img</th>
                                <th>Image</th>
                                <th>Country</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {placeDetails.map((detail) => (
                                <tr key={detail._id}>
                                    <td>{detail.name}</td>
                                    <td>
                                        {placeDetails.imageMain && (
                                            <img
                                                src={`../images/${detail.imageMain}`}
                                                height={100}
                                                width={100}
                                            />
                                        )}
                                    </td>
                                    <td>{detail.image && (
                                        <img
                                            src={`../images/${detail.image}`}
                                            height={100}
                                            width={100}
                                        />
                                    )}</td>
                                    <td>{detail.country} </td>
                                    <td>{detail.description} </td>
                                    <td className={styles.buttons}>
                                        <button className={styles.add} onClick={handleClick}>Update</button>
                                        <button className={styles.delete} onClick={(e) => handleDelete(detail._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {openPopup && <AddPlacePopup setOpenPopup={setOpenPopup} setPlaceDetails={setPlaceDetails} />}
            </div>
        </div>
    )
}