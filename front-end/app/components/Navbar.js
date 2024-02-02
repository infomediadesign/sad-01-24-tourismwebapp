"use client";
import React from 'react'
import Image from 'next/image'
import styles from './navbar.module.css'
import Dropdownitems from './Dropdownitems';
import { IoSearchSharp } from "react-icons/io5";
import Link from 'next/link'
import Login from './Login';
import { useState } from 'react';

const Navbar = () => {

    const [openPopup, setOpenPopup] = useState(false);
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [active, setActive] = useState(false);
    const handleLogin = () => {
        setOpenPopup(true);
    };

    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const handleClick = () => {
        setActive(!active);
    };


    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    return (
        <nav className={styles.nav}>
            <div className={styles.container}>

                <div className={styles.search}>
                <input
                        placeholder="Search..."
                        type="text"
                        name="Search"
                        className={styles.input}
                         />
                        <div className={styles.end} >
                        <IoSearchSharp size={20}  />
                        </div>
                </div>

                <div className={styles.logoContainer} >
                    <Image
                        src="/Images/logo.svg"
                        alt="Description of the first image"
                        width={50}
                        height={50} />
                    <Link  className={styles.logo} href="/">Wanderlust</Link>
                </div>

                <ul>
                    <li 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        <Link  className={styles.navLink} href="/">Destination</Link>

                        {/* <DropdownMenu /> */}
                        {isDropdownVisible && <Dropdownitems />}

                    </li>


                    <li>
                        <Link className={styles.navLink} href="/Userpage/Aboutus">About Us</Link>
                    </li>
                    <li>
                    <button  onClick={handleLogin}>Sign In</button>
                    </li>
                </ul>
                {openPopup && <Login setOpenPopup={setOpenPopup} handleClosePopup={handleClosePopup} />}
            </div>
        </nav>
    );
}


export default Navbar;