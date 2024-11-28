import React from 'react'
import profilePic from '../assets/logo.png'

function Navbar() {
  return (
    <>
        <div className="navbar bg-base-100">
  <div className="flex-1">
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={profilePic} />  
        </div>
      </div>
    <a className="btn btn-ghost text-xl">My Pet Doctor</a>
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
    <li><a>Home</a></li>
    <li><a>Blog</a></li>
    <li><a>About us</a></li>
    <li><a>Contact Us</a></li>
    <li><a>Log in</a></li>
     <li><a>Sign Up</a></li>
      <li>
       
      </li>
    </ul>
  </div>
</div>
    </>
  )
}

export default Navbar