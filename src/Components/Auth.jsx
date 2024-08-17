import React from 'react';
import { auth, authProvider } from '../firebase-config';

import { signInWithPopup } from 'firebase/auth';
import Cookies from "universal-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import "../styles/Auth.css"; 

const cookie = new Cookies();

const Auth = ({ setISAuth }) => {  // Destructure the props to get setISAuth
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, authProvider);
      console.log(result);
      setISAuth(true);  // Use the setISAuth function to update the state in the parent component
      cookie.set("auth-token", result.user.refreshToken);

      toast.success("Signed in successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'blue-toastify',
      });
    } catch (error) {
      console.error("Error signing in: ", error.message);  // Log detailed error message

      toast.error(`Failed to sign in. ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'blue-toastify',
      });
    }
  };

  return (
    <div className="auth-container">
      <button className="sign-in-button" onClick={signInWithGoogle}>
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" />
        Sign in with Google
      </button>
      <ToastContainer />
    </div>
  );
};

export default Auth;
