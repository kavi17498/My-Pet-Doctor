import React from 'react';
import profilePic from '../assets/white.png';

function Footer() {
  return (
    <>
      <div className="navbar bg-base-100 bg-green-600">
        <div className="flex-1">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={profilePic}
              />
            </div>
          </div>
          <a className="btn btn-ghost text-xl text-white">My Pet Doctor</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a className="text-white">Home</a></li>
            <li><a className="text-white">Blog</a></li>
            <li><a className="text-white">About us</a></li>
            <li><a className="text-white">Contact Us</a></li>
            <li><a className="text-white">Log in</a></li>
            <li><a className="text-white">Sign Up</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
