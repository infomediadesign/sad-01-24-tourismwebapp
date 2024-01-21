"use client";  
import React from 'react'
import Image from 'next/image'
import styles from './navbar.module.css'

const Navbar = () => {
        
    const [active, setActive] = React.useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <nav className={styles.nav}>
            <div >
                                
                <div className={styles.search}>
                <input className={`input ${active ? 'active' : ''}`}
                    type="text"
                    onFocus={() => setActive(true)}
                    onBlur={() => setActive(false)}/>
                <button className={styles.btn} onClick={handleClick}>
                <Image
                    src="/Images/search-icon.png"
                    alt="Description of the first image"
                    width={20}
                    height={20}
                />
                </button>
                </div>
                <ul>
                    <li>
                        <a href="#">Destination</a>
                        
                    </li>
                    <li>
                        <a href="#">About Us</a>
                    </li>
                    <li>
                        <a href="#">Sign In</a> 
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;