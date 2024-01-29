'use client'
import NavbarAdmin from '@/app/components/NavbarAdmin'
import { useState, useEffect } from 'react'
import React from 'react'
import styles from '../getCountry/getCountry.module.css'
import AddPlacePopup from '@/app/components/AddPlacePopup'
import Link from 'next/link'
import UpdatePlacePopup from '@/app/components/UpdatePlacePopup'

export default function page() {
    const [openPopup, setOpenPopup] = useState(false);
    const [openUpdatePopup, setUpdatePopup] = useState(false);
    const [placeDetails, setPlaceDetails] = useState([]);
    const [placeId, setPlaceId] = useState("");

    useEffect(() => {
        fetch('http://localhost:7000/places/getPlaces')
            .then(res => res.json())
            .then(data => {
                setPlaceDetails(data)
                console.log(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [])

    const handleClick = () => {
        setOpenPopup(true);
    }

    const handleUpdateClick = (id) => { 
        // console.log(id);
        setPlaceId(id);
        setUpdatePopup(true);
    }

    const updatePlaceDetails = () => {
        fetch('http://localhost:7000/places/getPlaces')
            .then(res => res.json())
            .then(data => {
                setPlaceDetails(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:7000/places/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Place with ID ${id} deleted successfully`);
                const updatedPlaceDetails = placeDetails.filter(detail => detail._id !== id);
                setPlaceDetails(updatedPlaceDetails);
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
                    <br />
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
                                        {detail.imageMain && (
                                            <img
                                                src={`http://localhost:9000/images/${detail.imageMain}`}
                                                height={100}
                                                width={100}
                                            />
                                        )}
                                    </td>
                                    <td>{detail.image && (
                                        <img
                                            src={`http://localhost:9000/images/${detail.image}`}
                                            height={100}
                                            width={100}
                                        />
                                    )}</td>
                                    <td>{detail.country} </td>
                                    <td>{detail.description} </td>
                                    <td className={styles.buttons}>
                                        <button className={styles.add} onClick={(e) => handleUpdateClick(detail._id)}>Update</button>
                                        <button className={styles.delete} onClick={(e) => handleDelete(detail._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {openPopup && <AddPlacePopup setOpenPopup={setOpenPopup} setPlaceDetails={setPlaceDetails} />}
                {openUpdatePopup && <UpdatePlacePopup setOpenPopup={setUpdatePopup} placeId={placeId} updatePlaceDetails={updatePlaceDetails} />}
            </div>
        </div>
    )
}