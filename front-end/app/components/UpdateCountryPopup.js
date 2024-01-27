'use client'
import React, { useEffect } from 'react'
import styles from './addplace.module.css'
import { useState } from 'react'

export default function UpdateCountryPopup({ setOpenPopup, updatedCountryDetails, countryId }) {
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [imageMain, setMainImg] = useState("");
    const [image1, setImgOne] = useState("");
    const [image2, setImgTwo] = useState("");
    const [image3, setImgThree] = useState("");
    const [errmsg, setErrMsg] = useState("");

    const handleClick = () => {
        setOpenPopup(false);
    }

    useEffect(() => {
        if (countryId) {
            console.log(countryId);
            fetch(`http://localhost:7000/countries/getCountry/${countryId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setDesc(data.description);
                    setName(data.name);
                    // setMainImg(data.imageMain);
                    // setImgOne(data.image1);
                    // setImgTwo(data.image2);
                    // setImgThree(data.image3);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [countryId]);

    const onSubmit = async (e) => {
        e.preventDefault()
        fetch(`http://localhost:7000/countries/update/${countryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description, imageMain, image1, image2, image3 }),
        }).then(response => response.json())
            .then(data => {
                setErrMsg(data.message);
                // setOpenPopup(false);
                console.log(data.message);
                updatedCountryDetails();
            })
            .catch((error) => {
                setErrMsg(error.message);
            });
    }

    return (
        <div className={styles.container}>
            <div className={styles.text}>
                Add Country
            </div>
            <form onSubmit={onSubmit}>
                <div className={styles.formrow}>
                    <div className={styles.inputdata}>
                        <label className={styles.label}>Name</label>
                        <input type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
                    <div className={styles.inputdata}>
                        <label className={styles.labelimg}>Main Image</label>
                        <input type='file'
                            onChange={(e) => setMainImg(e.target.value)}
                            value={imageMain}
                        />
                    </div>
                </div>
                <div className={styles.formrow}>
                    <div className={styles.inputdata}>
                        <label className={styles.label}>Image1</label>
                        <input type='file'
                            onChange={(e) => setImgTwo(e.target.value)}
                            value={image2}
                        />
                    </div>
                    <div className={styles.inputdata} >
                        <label className={styles.msg}>Description</label>
                        <textarea
                            onChange={(e) => setDesc(e.target.value)}
                            value={description}
                        />
                    </div>
                </div>
                <div className={styles.formrow}>
                    <div className={styles.inputdata}>
                        <label className={styles.label}>Image2</label>
                        <input type='file'
                            onChange={(e) => setImgOne(e.target.value)}
                            value={image1}
                        />
                    </div>
                    <div className={styles.inputdata}>
                        <label className={styles.img}>Image3</label>
                        <input type='file'
                            onChange={(e) => setImgThree(e.target.value)}
                            value={image3}
                        />
                    </div>
                </div>
                <button type="submit" className={styles.btn}>Submit</button>
                <button className={styles.cnl} onClick={handleClick}>Cancel</button>
            </form>
            <div>{errmsg}</div>
        </div>
    )
}
