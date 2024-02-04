'use client';
import React from 'react';
import Image from 'next/image';
import styles from './navbar.module.css';
import Dropdownitems from './Dropdownitems';
import { IoSearchSharp } from 'react-icons/io5';
import Link from 'next/link';
import { UserAuth } from '../context/AuthContext';
import Login from './Login';
import { useState } from 'react';


const Navbar = () => {
  
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { user, googleSignIn, logOut } = UserAuth();
  

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };


  const handleSignOut = async () => {
    try {
      await logOut();
    } 
    catch (error) {
      console.log(error);
    }
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
          <div className={styles.end}>
            <IoSearchSharp size={20} />
          </div>
        </div>

        <div className={styles.logoContainer}>
          <Image
            src="/Images/logo.svg"
            alt="Description of the first image"
            width={50}
            height={50}
          />
          <Link className={styles.logo} href="/">
            Wanderlust
          </Link>
        </div>

        <ul>
          <li
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link className={styles.navLink} href="/">
              Destination
            </Link>
            {isDropdownVisible && <Dropdownitems />}
          </li>

          <li>
            <Link className={styles.navLink} href="/Userpage/Aboutus">
              About Us
            </Link>
          </li>
          <li>
          {user ? (
  <div>
    {/* <img src={user.profilepic} alt="Profile Pic" style={{ width: '50px', height: '50px', borderRadius: '50%' }} /> */}
    {/* {user.profilepic ? (
        <Image
          src={user.profilepic}
          alt="Profile Pic"
          width={50}
          height={50}
          className={styles.profilePic} // Add your styles here if needed
        />
      ) : (
        <p>No profile picture available</p>
      )} */}
    <p>{user.displayName}</p>
    <button  onClick={handleSignOut}>
      Logout

    </button>
  </div>
) : (
  <Link className={styles.navLink} href="/Userpage/Login">
    Sign In
  </Link>
)}

          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
