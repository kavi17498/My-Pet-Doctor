import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebaseconfig';
import { signOut } from 'firebase/auth';
import profilePic from '../assets/logo.png';
import { FaUser } from 'react-icons/fa'; // Importing React icon for profile

function Navbar() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  const location = useLocation(); // Used to determine the current route

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
    <div className="navbar bg-base-100 shadow-lg px-4 md:px-8 fixed top-0 left-0 right-0 z-50">
      {/* Logo and Brand */}
      <div className="flex-1 flex items-center justify-between">
        <div className="flex items-center">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img alt="Profile" src={profilePic} />
            </div>
          </div>
          <Link to="/" className="btn btn-ghost text-xl ml-2 font-bold text-rose-500 hover:text-rose-700">
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
        <ul className="menu menu-horizontal px-1 lg:flex-row flex-col space-y-2 lg:space-y-0 lg:space-x-6">
          <li>
            <Link
              to="/"
              className={`font-bold text-rose-500 ${
                location.pathname === '/' ? 'bg-green-500 text-white' : ''
              } px-4 py-2 rounded hover:bg-rose-200 transition duration-300`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className={`font-bold text-rose-500 ${
                location.pathname === '/blog' ? 'bg-green-500 text-white' : ''
              } px-4 py-2 rounded hover:bg-rose-200 transition duration-300`}
            >
              Blog
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`font-bold text-rose-500 ${
                location.pathname === '/about' ? 'bg-green-500 text-white' : ''
              } px-4 py-2 rounded hover:bg-rose-200 transition duration-300`}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contactus"
              className={`font-bold text-rose-500 ${
                location.pathname === '/contactus' ? 'bg-green-500 text-white' : ''
              } px-4 py-2 rounded hover:bg-rose-200 transition duration-300`}
            >
              Contact Us
            </Link>
          </li>

          {/* Conditional rendering */}
          {!user ? (
            <>
              <li>
                <Link
                  to="/login"
                  className="font-bold text-rose-500 px-4 py-2 rounded hover:bg-rose-200 transition duration-300"
                >
                  Log in
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="font-bold text-rose-500 px-4 py-2 rounded hover:bg-rose-200 transition duration-300"
                >
                  Sign Up
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/PetOwnerProfile"
                  className={`font-bold text-rose-500 ${
                    location.pathname === '/PetOwnerProfile' ? 'bg-green-500 text-white' : ''
                  } px-4 py-2 rounded hover:bg-rose-200 transition duration-300 flex items-center space-x-2`}
                >
                  <FaUser className="text-xl" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className=" text-white bg-red-400 hover:bg-red-600 px-4 rounded "
                >
                  <b>Logout</b>
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
