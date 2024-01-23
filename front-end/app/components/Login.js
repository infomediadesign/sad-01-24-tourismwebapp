"use client";
import { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import './App.css';


const LoginForm = () => {
  const [captchaValue, setCaptchaValue] = useState('');

  const handleRecaptchaChange = (value) => {
    setCaptchaValue(value);
  };
  return (
    <div className="container">
      <h1>Welcome</h1>
      <h2>Login</h2>
      <form action="#">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        {/* <div className="g-recaptcha" data-sitekey="6Lcz2VcpAAAAAIHWBekKZRq1qPfaDtII_UA854ZQ"></div> */}
        <ReCAPTCHA
          className="g-recaptcha"
          sitekey="6LfXF1kpAAAAAKaURbpGiAN1OS3zVrUIFyyRu4r0"
          onChange={handleRecaptchaChange}
        />

        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;