import React from 'react';
import Navbar from '../components/Navbar';
import aboutus from '../assets/aboutus2.png';
import { useLocation } from 'react-router-dom';

function AboutUs() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <hr className="border-t-4 border-gray-300 my-10" />
      <div className="flex flex-col items-center px-3 relative">
        <div className="bg-white">
          <h1 className="text-3xl font-bold text-gray-800 text-center leading-relaxed">
            We are driven by a genuine passion for pets and commitment to their well-being. We believe that pets are not just animals but cherished family members. This belief is at the core of everything we do.
          </h1>
        </div>
        <hr className="border-t-4 border-black-300" />
        <div className="flex items-center justify-center w-full flex-grow relative">
          <img
            src={aboutus}
            alt="About Us"
            className="w-full h-auto max-w-5xl object-cover rounded-lg shadow-md"
          />
          <div className="absolute inset-x-50 bottom-2/5 bg-white bg-opacity-0 p-12 rounded-md">
            <h1 className="text-3xl font-bold text-gray-800 text-center leading-relaxed">
              Because pets are family.<br />
              At PetDoctor, we understand this truth.<br />
              At PetDoctor, we wholeheartedly agree.
            </h1>
          </div>
          {/* Contact Us Button */}
          <div className="absolute inset-x-50 bottom-3/4 flex justify-center">
            <a
              href="/ContactUs"
              className={`font-bold text-2xl text-white ${
                location.pathname === '/about-us' ? 'bg-green-500 text-white' : 'bg-rose-400 text-gray-800'
              } px-6 py-3 rounded hover:bg-red-300 transition duration-300 shadow-lg`}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
