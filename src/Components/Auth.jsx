import React from 'react';
import { auth, authProvider } from '../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import Cookies from "universal-cookie";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/Auth.css"; 

const cookies = new Cookies();

const Auth = ({ setAuth }) => {  // Corrected the prop to setAuth
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, authProvider);
      console.log(result);
      setAuth(true);  // Updated to use setAuth
      cookies.set("auth-token", result.user.refreshToken);

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
      console.error("Error signing in: ", error.message);

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
    <>
      <div className="auth-container">
        <header className="auth-header">
          <h1 className='demo'>Welcome to My Chat Application!</h1>
          <h2 className='demo1'>Sign in with Google to Continue</h2>
          <p className="intro-text">Experience seamless and real-time communication with friends, family, and colleagues. Our chat application is designed to keep you connected, wherever you are.</p>
        </header>

        <section className="features-section">
          <h3>Why Join?</h3>
          <ul className="features-list">
            <li>🗨️ Instant Messaging: Chat in real-time with your contacts.</li>
            <li>🔒 Secure: Your data is protected with top-notch security measures.</li>
            <li>📱 Cross-Platform: Use the chat on any device, anytime.</li>
            <li>🎨 Customizable: Personalize your chat experience with themes and settings.</li>
          </ul>
        </section>

        <div className="sign-in-section">
          <button className="sign-in-button" onClick={signInWithGoogle}>
            <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" />
            Sign in with Google
          </button>
          <ToastContainer />
        </div>

        <footer className="auth-footer">
          <p>© 2024 My Chat Application. All rights reserved.</p>
          <p>By signing in, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</p>
        </footer>
      </div>
    </>
  );
};

export default Auth;
