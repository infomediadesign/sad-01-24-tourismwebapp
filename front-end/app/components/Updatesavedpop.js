'use client'
import React from 'react'
import styles from './addplace.module.css'
import { useState, useEffect } from 'react'
import { format } from 'date-fns';

export default function Updatesavedpop({ setOpenPopup, updatedSaveditemsDetails, saveditemsId }) {
    const [description, setName] = useState("");
    const [country, setCountry] = useState("");
    const [place, setPlace] = useState("");
    const [date, setDate] = useState("");
    const [errmsg, setErrMsg] = useState("");

    const handleClick = () => {
        setOpenPopup(false);
    }

    // const handleImgChange = (e) => {
    //     setPlace(e.target.files[0]);
    // };



    // function getCurrentDate() {
    //     return format(new Date(), 'yyyy-MM-dd');
    // };

    useEffect(() => {
        if (saveditemsId) {
            console.log(saveditemsId);
            fetch(`http://localhost:8000/saveditems/getSavedItems/${saveditemsId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setName(data.description);
                    setCountry(data.country);
                    setPlace(data.place);
                    setDate(data.date);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [saveditemsId]);

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('description', description);
        formData.append('country', country);
        formData.append('place', place);
        formData.append('date', date);
        fetch(`http://localhost:8000/saveditems/update/${saveditemsId}`, {
            method: 'PUT',
            body: formData,
        }).then(response => response.json())
            .then(data => {
                setErrMsg(data.message);
                // setOpenPopup(false);
                console.log(data.message);
                updatedSaveditemsDetails();
            })
            .catch((error) => {
                setErrMsg(error.message);
            });
    }
    // const currentDate = getCurrentDate();

    return (

        <div className={styles.container}>
            <div className={styles.text}>
                Update Saveditems
            </div>
            <form onSubmit={onSubmit}>



                <><div className={styles.formrow} >
                    <div className={styles.inputdata}>
                        <label className={styles.label}>Customer mail</label>
                        <input type='text'

                            onChange={(e) => setName(e.target.value)}
                            value={description}
                            required />
                    </div>
                    <div className={styles.inputdata}>
                        <label className={styles.labelimg}>Country</label>
                        <input type='text'
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}


                            required />

                    </div>
                </div><div className={styles.formrow} >
                        <div className={styles.inputdata}>
                            <label >place</label>
                            <input type='text'
                                onChange={(e) => setPlace(e.target.value)}
                                value={place}


                                required />

                        </div>
                        <div className={styles.inputdata}>
                            <label className={styles.date}>Date</label>
                            <input type='text'
                                onChange={(e) => setDate(e.target.value)}
                                value={date}


                                required />
                        </div>
                    </div></>




                <button type="submit" className={styles.btn}>Submit</button>
                <button className={styles.cnl} onClick={handleClick}>Cancel</button>
            </form>

        </div>
    )
}
