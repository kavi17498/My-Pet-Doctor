import React from 'react';
import profilePic from '../assets/white.png';

function Footer() {
  return (
    <>
      <div className="navbar bg-base-100 bg-green-600 p-4">
        <div className="flex flex-wrap items-center justify-between w-full">
          <div className="flex items-center">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Profile"
                  src={profilePic}
                />
              </div>
            </div>
            <a className="btn btn-ghost text-xl text-white ml-2">My Pet Doctor</a>
          </div>
          <div className="flex-none w-full md:w-auto mt-4 md:mt-0">
            <ul className="menu menu-horizontal px-1 flex flex-wrap justify-center md:justify-end">
              <li className="mb-2 md:mb-0"><a className="text-white">Home</a></li>
              <li className="mb-2 md:mb-0"><a className="text-white">Blog</a></li>
              <li className="mb-2 md:mb-0"><a className="text-white">About us</a></li>
              <li className="mb-2 md:mb-0"><a className="text-white">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
