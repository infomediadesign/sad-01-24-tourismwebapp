
'use client'
import React, { useState, useEffect } from 'react'
import styles from './dropdownitems.module.css'

const Dropdownitems = () => {
  const [countries, setCountries] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/getCountry')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching country data:', error);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!countries || countries.length === 0) return <p>No country data</p>;

  return (
    <div className={styles.dropdownmenu}>
      <ul className={styles.item}>
        {countries.map((country, index) => (
          <li key={index} className={styles.items}>
            {country.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdownitems;
