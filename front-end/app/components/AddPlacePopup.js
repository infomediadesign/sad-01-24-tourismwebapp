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

    const handleMainImgChange = (e) => {
        setMainImg(e.target.files[0]);
    };
    const handleImgChange = (e) => {
        setImg(e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('imageMain', imageMain);
            formData.append('image', image);
            formData.append('country', country);
            formData.append('description', description);

            const response = await axios.post('http://localhost:7000/places/addPlaces', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 201) {
                console.log(response.data);
                const updatedData = await fetch('http://localhost:7000/places/getPlaces').then(res => res.json());
                setPlaceDetails(updatedData);
                setName("");
                setDesc("");
                setMainImg("");
                setImg("");
                setCountry("");
                setErrMsg(response.data.message);
            } else {
                setErrMsg(error.message);
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
                            onChange={handleMainImgChange}
                            required
                        />
                    </div>
                </div>
                <div className={styles.formrow}>
                    <div className={styles.inputdata}>
                        <label className={styles.label}>Image</label>
                        <input type='file'
                            onChange={handleImgChange}
                            accept='image/*'
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
