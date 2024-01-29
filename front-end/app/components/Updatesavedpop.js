'use client'
import React from 'react'
import styles from './addplace.module.css'
import { useState, useEffect } from 'react'
import { format } from 'date-fns';

export default function Updatesavedpop({ setOpenPopup, setCountryDetail }) {
    
    const [saveditems, setCountries] = useState([]);
    const handleClick = () => {
        setOpenPopup(false);
    }
    function getCurrentDate() {
        return format(new Date(), 'yyyy-MM-dd');
      };

    useEffect(() => {
        fetch('http://localhost:4000/getCountry')
            .then((res) => res.json())
            .then((data) => {
                setCountries(data);
                // setLoading(false);
            })




            .catch((error) => {
                console.error('Error fetching country data:', error);
                // setLoading(false);
            });
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault()
        
    }
    const currentDate = getCurrentDate();

    return (

        <div className={styles.container}>
            <div className={styles.text}>
                Update Saveditems
            </div>
            <form onSubmit={onSubmit}>

                {saveditems.map((save, index) => (

                    <><div className={styles.formrow} key={index}>
                        <div className={styles.inputdata}>
                            <label className={styles.label}>Customer mail</label>
                            <input type='text' 
                                
                                value={save.name}
                                required />
                        </div>
                        <div className={styles.inputdata}>
                        <label className={styles.label}>Country</label>
                        <input type='file'
                                    disabled />
                                    {save.image1 && <span>{save.image1}</span>}
                        </div>
                    </div><div className={styles.formrow}  key={index}>
                            <div className={styles.inputdata}>
                                <label className={styles.label}>place</label>
                                <input type='file'
                                    disabled />
                                    {save.image1 && <span>{save.image1}</span>}
                            </div>
                            <div className={styles.inputdata}>
                                <label className={styles.msg}>Description</label>
                                <p>{currentDate}</p>
                            </div>
                        </div>
                        <button type="submit" className={styles.btn}>Submit</button>
                            <button className={styles.cnl} onClick={handleClick}>Cancel</button>
                        </>
                    
                ))}

            </form>
            
        </div>
    )
}
