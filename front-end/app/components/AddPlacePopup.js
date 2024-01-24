'use client'
import React from 'react'
import styles from './AddCountryForn.module.css'
import { useState } from 'react'

export default function AddPlacePopup({ setOpenPopup, setPlaceDetails }) {
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [imageMain, setMainImg] = useState("");
    const [image, setImg] = useState("");
    const [country, setCountry] = useState("");
    const [errmsg, setErrMsg] = useState("");

    const handleClick = () => {
        setOpenPopup(false);
    }

    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        setMainImg(e.target.files[0]);
        // var reader = new FileReader();
        // reader.readAsDataURL(e.target.files[0]);
        // reader.onload = () => {
        //     console.log(reader.result);
        //     setMainImg(reader.result);
        // };
        // reader.onerror = function (error) {
        //     console.log('Error: ', error);
        // };
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:9000/addPlaces', {
                method: 'POST',
                body: JSON.stringify({ name, imageMain, image, country, description }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if (response.ok) {
                const updatedData = await fetch('http://localhost:9000/getPlaces').then(res => res.json());
                setPlaceDetails(updatedData);
                setName("");
                setDesc("");
                setMainImg("");
                setImg("");
                setCountry("");
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
            <h1>Add Places</h1>
            <form onSubmit={onSubmit}>
                <div className={styles.cols}>
                    <div className={styles.firstCol}>
                        <p>Name</p>
                        <input type='text'
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                        <p>Main Image</p>
                        <input type='file'
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                        <p>Image</p>
                        <input type='file'
                            onChange={(e) => setImg(e.target.value)}
                            value={image}
                            required
                        />
                    </div>
                    <div className={styles.secondCol}>
                        <p>Description</p>
                        <textarea
                            onChange={(e) => setDesc(e.target.value)}
                            value={description}
                            required
                        />
                        <p>Country</p>
                        <select name="cars" id="cars"
                            onChange={(e) => setCountry(e.target.value)}
                            value={country}
                            required>
                            <option value="volvo">Volvo</option>
                            <option value="saab">Saab</option>
                            <option value="opel">Opel</option>
                            <option value="audi">Audi</option>
                        </select>
                    </div>
                </div>
                <div className={styles.button}>
                    <button type="submit" className={styles.submit}>Submit</button>
                    <button className={styles.cancel} onClick={handleClick}>Cancel</button>
                </div>
            </form>
            <div className='errMsg'>{errmsg}</div>
        </div>
    )
}
