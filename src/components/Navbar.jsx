import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { auth } from '../firebaseconfig'; // Import Firebase auth
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import profilePic from '../assets/logo.png';

function Navbar() {
  const [user, setUser] = useState(null);

  // Check for user authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // Listen for authentication state changes
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Profile" src={profilePic} />
          </div>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">My Pet Doctor</Link> {/* Use Link here */}
      </div>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contactus">Contact Us</Link></li>

          {/* Conditional rendering */}
          {!user ? (
            <>
              <li><Link to="/login">Log in</Link></li> {/* Show login link if no user */}
              <li><Link to="/signup">Sign Up</Link></li> {/* Show signup link if no user */}
            </>
          ) : (
            <>
              <li><Link to="/profile">Profile</Link></li> {/* Show profile link if user is logged in */}
              <li>
                <button onClick={handleLogout} className="btn btn-ghost">
                  Logout
                </button> {/* Logout button */}
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
