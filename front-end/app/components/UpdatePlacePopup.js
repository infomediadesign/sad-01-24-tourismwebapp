'use client'
import React, { useEffect } from 'react'
import styles from './addplace.module.css'
import { useState } from 'react'

export default function UpdatePlacePopup({ setOpenPopup, placeId, updatePlaceDetails }) {
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [imageMain, setMainImg] = useState("");
    const [image, setImg] = useState("");
    const [country, setCountry] = useState("");
    const [errmsg, setErrMsg] = useState("");

    useEffect(() => {
        if (placeId) {
            fetch(`http://localhost:7000/places/getPlaces/${placeId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setCountry(data.country);
                    setDesc(data.description);
                    setName(data.name);
                    // setMainImg(data.imageMain);
                    // setImg(data.image);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [placeId]);

    const handleClick = () => {
        setOpenPopup(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetch(`http://localhost:7000/places/update/${placeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, country, description }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setOpenPopup(false);
            updatePlaceDetails();
        })
        .catch((error) => {
            console.error('Error:', error);
            setErrMsg(error.message);
        });
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

    return (

        <div className={styles.container}>
            <div className={styles.text}>
                Add Places
            </div>
            <form onSubmit={handleSubmit}>
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
                            accept="image/*"
                            onChange={handleImageChange}
                            required
                        />
                    </div>
                </div>
                <div className={styles.formrow}>
                    <div className={styles.inputdata}>
                        <label className={styles.label}>Image</label>
                        <input type='file'
                            onChange={(e) => setImg(e.target.value)}
                            value={image}
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
                <div className={styles.inputdata} >
                    <label className={styles.label}>Country</label>
                    <select name="cars" id="cars"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        required >
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>
                <button type="submit" className={styles.button}>Submit</button>
                <button className={styles.button} onClick={handleClick}>Cancel</button>
            </form>
            <div>{errmsg}</div>
        </div>

    )
}
