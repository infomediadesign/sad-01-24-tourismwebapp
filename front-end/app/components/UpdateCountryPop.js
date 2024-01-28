'use client'
import React from 'react'
import styles from './addplace.module.css'
import { useState, useEffect } from 'react'

export default function UpdateCountryPop({ setOpenPopup, setCountryDetail }) {
    // const [name, setName] = useState("");
    // const [description, setDesc] = useState("");
    // const [imageMain, setMainImg] = useState("");
    // const [image1, setImgOne] = useState("");
    // const [image2, setImgTwo] = useState("");
    // const [image3, setImgThree] = useState("");
    // const [errmsg, setErrMsg] = useState("");
    const [countries, setCountries] = useState([]);
    const handleClick = () => {
        setOpenPopup(false);
    }


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

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Update Country
            </div>
            <form onSubmit={onSubmit}>

                {countries.map((country, index) => (

                    <><div className={styles.formrow} key={index}>
                        <div className={styles.inputdata}>
                            <label className={styles.label}>Name</label>
                            <input type='text' 
                                
                                value={country.name}
                                required />
                        </div>
                        <div className={styles.inputdata}>
                            <label className={styles.labelimg}>Main Image</label>
                            <input type='file' 
                              disabled />
                                {country.imageMain && <span>{country.imageMain}</span>}
                        </div>
                    </div><div className={styles.formrow}  key={index}>
                            <div className={styles.inputdata}>
                                <label className={styles.label}>Image1</label>
                                <input type='file'
                                    disabled />
                                    {country.image1 && <span>{country.image1}</span>}
                            </div>
                            <div className={styles.inputdata}>
                                <label className={styles.msg}>Description</label>
                                <textarea  onChange={(e) => setDesc(e.target.value)}
                                    value={country.description}
                                    required />
                            </div>
                        </div><div className={styles.formrow}  key={index}>
                            <div className={styles.inputdata}>
                                <label className={styles.label}>Image2</label>
                                <input type='file'
                                
                                    disabled />
                                    {country.image2 && <span>{country.image2}</span>}
                            </div>
                            <div className={styles.inputdata}>
                                <label className={styles.img}>Image3</label>
                                <input type='file'  disabled />
                                {country.image3 && <span>{country.image3}</span>}
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
