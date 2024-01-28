
'use client'
import React, { useState, useEffect } from 'react'
import styles from './dropdownitems.module.css'
import Link from 'next/link'

const Dropdownitems = () => {
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

  // if (isLoading) return <p>Loading...</p>;
  // if (!countries || countries.length === 0) return <p>No country data</p>;

  return (
    <div className={styles.dropdownmenu}>
      <ul className={styles.item}>
        {countries.map((country, index) => (
          <Link href= {`/${country.name}`}  >
            <li key={index} className={styles.items}>
              {country.name}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Dropdownitems;
