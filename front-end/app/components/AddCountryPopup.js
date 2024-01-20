'use client'
import React from 'react'
import styles from './AddCountryForn.module.css'
import { useState } from 'react'

export default function AddCountryPopup() {
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [imageMain, setMainImg] = useState("");
    const [image1, setImgOne] = useState("");
    const [image2, setImgTwo] = useState("");
    const [image3, setImgThree] = useState("");
    const [errmsg, setErrMsg] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/addCountry', {
                method: 'POST',
                body: JSON.stringify({ name, imageMain, image1, image2, image3, description }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if (response.ok) {
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
        <div className={styles.formPopup}>
            <h1>Add Country</h1>
            <form onSubmit={onSubmit}>
                <div className={styles.cols}>
                    <div className={styles.firstCol}>
                        <p>Name</p>
                        <input type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <p>Main Image</p>
                        <input type='file'
                            onChange={(e) => setMainImg(e.target.value)}
                            value={imageMain}
                        />
                        <p>Child Image 2</p>
                        <input type='file'
                            onChange={(e) => setImgTwo(e.target.value)}
                            value={image2}
                        />
                    </div>
                    <div className={styles.secondCol}>
                        <p>Description</p>
                        <textarea
                            onChange={(e) => setDesc(e.target.value)}
                            value={description}
                        />
                        <p>Child Image 1</p>
                        <input type='file'
                            onChange={(e) => setImgThree(e.target.value)}
                            value={image1}
                        />
                        <p>Child Image 3</p>
                        <input type='file'
                            onChange={(e) => setImgThree(e.target.value)}
                            value={image3}
                        />
                    </div>
                </div>
                <div className={styles.button}>
                    <button type="submit" className={styles.submit}>Submit</button>
                    <button className={styles.cancel}>Cancel</button>
                </div>
            </form>
            <div className='errMsg'>{errmsg}</div>
        </div>
    )
}
