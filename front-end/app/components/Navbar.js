"use client";
import React from 'react'
import Image from 'next/image'
import styles from './navbar.module.css'
import Dropdownitems from './Dropdownitems';
import { IoSearchSharp } from "react-icons/io5";



const Navbar = () => {

    const [active, setActive] = React.useState(false);

    const handleClick = () => {
        setActive(!active);
    };


    const [isDropdownVisible, setDropdownVisible] = React.useState(false);

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
                    <p>Wanderlust</p>
                </div>


                <ul>
                    <li 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}>
                        <a href="#">Destination</a>

                        {/* <DropdownMenu /> */}
                        {isDropdownVisible && <Dropdownitems />}




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
    );
}






export default Navbar;