"use client";
import { useState } from 'react';
import './App.css';

const SigninForm = () => {
  const [captchaValue, setCaptchaValue] = useState('');

  const handleRecaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  return (
    <div className="container">
      <h1>Welcome</h1>
      <h2>Sign In</h2>
      <form action="#">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SigninForm;