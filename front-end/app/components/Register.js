"use client";
import { useState } from 'react';
import './App.css';

const Register = () => {
  const [captchaValue, setCaptchaValue] = useState('');

  const handleRecaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Implement registration logic here
    console.log('Registration submitted');
  };

  return (
    <div className="container">
      <h1>Welcome</h1>
      <h2>Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <label htmlFor="email">Email Id</label>
        <input type="text" id="name" name="name" required />

         <label htmlFor="name">Enter Your Name
        </label>
        <input type="email" id="email" name="name" required />
       

        


        <label htmlFor="password">Password</label>
        <input type="password" id="confirmpassword" name="confirmpassword" required />

        <label htmlFor="password">Confirm Password</label>
        <input type="password" id="password" name="password" required />

        {/* Additional registration fields can be added here */}
        
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
