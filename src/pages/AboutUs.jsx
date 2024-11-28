import React from 'react';
import Navbar from '../components/Navbar';

function AboutUs() {
  return (
    <>
      <Navbar />

      <div className="flex h-screen">
        {/* Left side: Contact Info */}
        <div className="w-1/2 flex flex-col justify-start bg-gray-100 items-left p-6">
          <h1 className="text-2xl font-bold mb-4">Contact Info</h1>

          <div className="w-full text-left ml-10">
            <p className="font-bold text-lg mb-2">My Pet Doctor</p>
            <p>
              98/3, Havlock Road,<br />
              Colombo 05, Sri Lanka<br />
              <span className="text-blue-500 cursor-pointer">(see Location)</span>
            </p>
          </div>

          <div className="w-full text-left mt-10 ml-10">
            <p className="font-bold text-lg mb-2">Call Us</p>
            <p>
              077 xxx xxx xxx<br />
              077 xxx xxx xxx<br />
              <span className="text-blue-500 cursor-pointer">(see Location)</span>
            </p>
          </div>

          <div className="w-full text-left mt-10 ml-10">
            <p className="font-bold text-lg mb-2">Email</p>
            <p>
              MypetDoctor@Health.com<br />
              <span className="text-blue-500 cursor-pointer">(see Location)</span>
            </p>
          </div>
        </div>

        {/* Right side: Send us a Message */}
        <div className="w-1/2 flex flex-col justify-start items-start bg-white p-6">
          <h1 className="text-2xl font-semibold mb-4">Send us a Message</h1>
          <div className="w-full">
            <input
              className="border border-cyan-500 w-full p-2 rounded-md mt-5"
              placeholder="Your Name"
            />
            <input
              className="border border-cyan-500 w-full p-2 rounded-md mt-5"
              placeholder="Email"
            />
          </div>
          <textarea
            className="border border-cyan-500 w-full p-3 rounded-md mt-5"
            placeholder="Your Message"
            rows="6"
          ></textarea>

          {/* Button */}
          <div className="w-full mt-5">
            <button className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
