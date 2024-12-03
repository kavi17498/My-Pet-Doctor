import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebaseconfig';
import { signOut } from 'firebase/auth';
import profilePic from '../assets/logo.png';

function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // Check for user authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="navbar bg-base-100">
      {/* Logo and Brand */}
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Profile" src={profilePic} />
            </div>
          </div>
          <Link to="/" className="btn btn-ghost text-xl ml-2">
            My Pet Doctor
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="btn btn-ghost text-xl"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? '✖️' : '☰'}
          </button>
        </div>
      </div>

      {/* Links Section */}
      <div
        className={`flex-none lg:flex lg:items-center ${
          isMenuOpen ? 'block' : 'hidden'
        } lg:block`}
      >
        <ul className="menu menu-horizontal px-1 lg:flex-row flex-col">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contactus">Contact Us</Link>
          </li>

          {/* Conditional rendering */}
          {!user ? (
            <>
              <li>
                <Link to="/login">Log in</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/PetOwnerProfile">Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-ghost">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
