import { BiLogoFacebook } from "react-icons/bi";
import styles from '../components/login.module.css'
import { FcGoogle } from "react-icons/fc"
import React, { useEffect, useState } from "react";
 
import { UserAuth } from "../context/AuthContext";
 
const Login = ({ setOpenPopup, handleClosePopup }) => {
  
  
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);
 
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
 
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
 
 
  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);
 
 
 
 
 
 
 
 
  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.container}>
        <button className={styles.closeButton} onClick={handleClosePopup}>
          X
        </button>
        <section className={`h-screen flex flex-col md:flex-row justify-center space-y-1 md:space-y-1 items-center my-2 mx-5 md:mx-0 ${styles.mdMyOverride}`}>
            <div className="md:w-1/2 max-w-sm mx-auto">
              <div className="text-center md:text-left">
 
 
 
            
 
 
              <div className={styles.labelContainer}>
                <label className="mr-1">Sign in with</label>
                <button
                  type="button"
                  className="mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
                >
                  <BiLogoFacebook
                    size={20}
                    className="flex justify-center items-center w-full"
                  />
                </button>
 
 
 
 
 
                {loading ? null : !user ? (
 
 
                <button onClick={handleSignIn} // Call handleGoogleSignIn when Google sign-in button is clicked
                  type="button"
                  className="mx-1 h-9 w-9 rounded-full bg-white hover:bg-blue-700 text-blue-600 shadow-[0_4px_9px_-4px_#3b71ca]"
                >
                  <FcGoogle
                    size={20}
                    className="flex justify-center items-center w-full"
                  />
                </button>
                
                ) : (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p className="cursor-pointer" onClick={handleSignOut}>
            Sign out
          </p>
        </div>
 
 
 
)}
 
 
 
              </div>
 
 
 
 
              </div>
              <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                  Or
                </p>
              </div>
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                type="text"
                placeholder="Email Address"
              />
              <input
                className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                type="password"
                placeholder="Password"
              />
              <div className="mt-4 flex justify-between font-semibold text-sm">
                <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                  <input className="mr-1" type="checkbox" />
                  <span>Remember Me</span>
                </label>
                <a
                  className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="text-center md:text-left">
                <button
                  className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                Don&apos;t have an account?{" "}
                <a
                  className="text-red-600 hover:underline hover:underline-offset-4"
                  href="#"
                >
                  Register
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
 
export default Login;