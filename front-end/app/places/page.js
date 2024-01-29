import React from 'react';
import Places from '../components/Places'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function page() {
  return (
    <div>
        <Places/>
       <Navbar/>
        <Footer/>
    </div>
  )
}
