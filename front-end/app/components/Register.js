'use client'
import React from "react";
import { BiLogoFacebook } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import styles from '../components/login.module.css';
import { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import Login from "./Login";

const Register = ({setOpenRegister }) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [name, setName] = useState()
  const [popup, setPopup] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/users/register', { name, email, password });
      toast.success(response.data.message);
      setOpenRegister(false);
      setPopup(true)
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error('No response received from the server');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };


  return (
    <div className={styles.container}>
      <form onSubmit={handleRegister}>
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-1 md:space-y-1 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
          <div className="md:w-1/2 max-w-sm mx-auto">
            <div className="text-center md:text-left">
              <label className="mr-1">Register with</label>
              <button
                type="button"
                className="mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
              >
                <BiLogoFacebook
                  size={20}
                  className="flex justify-center items-center w-full"
                />
              </button>
              <button
                type="button"
                className="mx-1 h-9 w-9 rounded-full bg-white hover:bg-blue-700 text-blue-600 shadow-[0_4px_9px_-4px_#3b71ca]"
              >
                <FcGoogle size={20} className="flex justify-center items-center w-full" />
              </button>
            </div>
            <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
              <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                Or
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                type="text"
                placeholder="First name"
                required
              />
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                type="text"
                placeholder="Last name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="email"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Password"
              required
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                Register
              </button>
            </div>
          </div>
          {popup && <Login />}
        </section>
      </form>
    </div>
  );
};

export default Register;