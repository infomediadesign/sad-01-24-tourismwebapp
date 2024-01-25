'use client'
import React from 'react'
import styles from './addplace.module.css'
import { useState } from 'react'

export default function AddCountryPopup({ setOpenPopup, setCountryDetail }) {
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

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:4000/addCountry', {
                method: 'POST',
                body: JSON.stringify({ name, imageMain, image1, image2, image3, description }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if (response.ok) {
                const updatedData = await fetch('http://localhost:4000/getCountry').then(res => res.json());
                setCountryDetail(updatedData);
                setName("");
                setDesc("");
                setMainImg("");
                setImgOne("");
                setImgTwo("");
                setImgThree("");
                setErrMsg("Form submitted successfully!");
            } else {
                setErrMsg(`Error: ${response.statusText}`);
            }
        } catch (error) {
            setErrMsg(`Error: ${error.message}`);
        }
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
                            required
                        />
                    </div>
                </div>
                <div className={styles.formrow}>
                    <div className={styles.inputdata}>
                        <label className={styles.label}>Image1</label>
                        <input type='file'
                            onChange={(e) => setImgTwo(e.target.value)}
                            value={image2}
                            required
                        />
                    </div>
                    <div className={styles.inputdata} >
                        <label className={styles.msg}>Description</label>
                        <textarea
                            onChange={(e) => setDesc(e.target.value)}
                            value={description}
                            required
                        />
                    </div>
                </div>
                <div className={styles.formrow}>
                    <div className={styles.inputdata}>
                        <label className={styles.label}>Image2</label>
                        <input type='file'
                            onChange={(e) => setImgOne(e.target.value)}
                            value={image1}
                            required
                        />
                    </div>
                    <div className={styles.inputdata}>
                        <label className={styles.img}>Image3</label>
                        <input type='file'
                            onChange={(e) => setImgThree(e.target.value)}
                            value={image3}
                            required
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
