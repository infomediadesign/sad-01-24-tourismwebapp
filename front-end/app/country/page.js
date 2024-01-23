// page.js
import React from 'react';
/* import { useClient } from 'react-sdk'; */
import Country from '../components/Country';
import Navbar from '../components/Navbar';

const CountryPage = () => {
  /* useClient(); */

  return (
    <div>
      <Navbar />
      <Country />
    </div>
  );
};

export default CountryPage;

