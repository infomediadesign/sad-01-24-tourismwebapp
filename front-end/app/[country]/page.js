// page.js
import React from 'react';
/* import { useClient } from 'react-sdk'; */
import Navbar from '../components/Navbar';

import Countries from '../components/Countries';

const CountryPage = () => {
  /* useClient(); */

  return (
    <div>
      <Navbar />
      <Countries />
    </div>
  );
};

export default CountryPage;

