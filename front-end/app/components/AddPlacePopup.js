'use client'
import React, { useState, useEffect } from 'react'
import styles from './addplace.module.css'


export default function AddPlacePopup({ setOpenPopup, setPlaceDetails }) {
    const [name, setName] = useState("");
    const [description, setDesc] = useState("");
    const [imageMain, setMainImg] = useState("");
    const [image, setImg] = useState("");
    const [country, setCountry] = useState("");
    const [errmsg, setErrMsg] = useState("");

    const [countries, setCountries] = useState([]);
    // const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch('http://localhost:7000/countries')
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




    const handleClick = () => {
        setOpenPopup(false);
    }

    const handleImageChange = (e) => {
        // console.log(e.target.files[0]);
        // setMainImg(e.target.files[0]);
        // var reader = new FileReader();
        // reader.readAsDataURL(e.target.files[0]);
        // reader.onload = () => {
        //     console.log(reader.result);
        //     setMainImg(reader.result);
        // };
        // reader.onerror = function (error) {
        //     console.log('Error: ', error);
        // };
        setMainImg(e.target.value);
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:7000/places/addPlaces', {
                method: 'POST',
                body: JSON.stringify({ name, imageMain, image, country, description }),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if (response.ok) {
                const updatedData = await fetch('http://localhost:7000/places/getPlaces').then(res => res.json());
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

        <div className={styles.container}>
            <div className={styles.text}>
                Add Places
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
                    {countries.map((country, index) => (

                    <select name="cars" id="cars"
                        onChange={(e) => setCountry(e.target.value)}
                        value={country}
                        required className={styles.option} >
                        <option key={index}  value={country.name}>{country.name}</option>


                        {/* <option value="saab">Saab</option>
                        <option value="opel">Opel</option>
                        <option value="audi">Audi</option> */}
                    </select>

                    
))}

                </div>
                <button type="submit" className={styles.button}>Submit</button>
                <button className={styles.button} onClick={handleClick}>Cancel</button>
            </form>
            <div>{errmsg}</div>
        </div>

    )
}
