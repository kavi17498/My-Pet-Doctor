import React from 'react';
import Navbar from '../components/Navbar';

function VetProfile() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen bg-gray-100">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mt-6">Veterinary Profile</h1>

        {/* Main Content Section */}
        <div className="flex flex-row items-start justify-center p-6 mt-6 w-4/5">
          {/* Left Section: Profile Information */}
          <div className="flex-1 pr-4 border-r border-gray-200">
            {/* Profile Photo */}
            <img
              src="#"
              alt="Vet's Profile"
              className="w-32 h-32 rounded-full border-2 border-gray-300 mx-auto"
            />

            {/* User Details */}
            <div className="mt-6">
              {/* Name Row */}
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-600">Your Name</label>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-800 mr-4">Name</p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                </div>
              </div>

              {/* Specialization Row */}
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-600">Specialization</label>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-800 mr-4">Specialization</p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                </div>
              </div>

              {/* Appointment Details Button */}
              <button className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                View Appointment Details
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex-1 pl-4">
            {/* About Section */}
            <h1 className="text-pink-500 text-3xl font-bold">About</h1>
            <h2 className="text-center text-xl font-semibold mt-4">Brief Introduction</h2>
            <div className="border border-black p-4 mt-4">
              <p>
                Magna aliquip consequat nisi voluptate. Veniam cillum officia nostrud quis velit labore voluptate id labore. Lorem nulla sint sunt ad incididunt. Sunt culpa magna dolore anim adipisicing aute reprehenderit.
              </p>
            </div>

            {/* Qualifications Section */}
            <h2 className="text-xl font-semibold mt-6">Qualifications</h2>
            <ul className="mt-2 list-disc list-inside">
              <li>Bachelor of Veterinary Science</li>
              <li>Certified Pet Care Specialist</li>
              <li>10+ Years of Experience</li>
            </ul>

            {/* Location Section */}
            <h2 className="text-xl font-semibold mt-6">Location</h2>
            <div className="mt-2">
              <img
                src="https://via.placeholder.com/300x150"
                alt="Map Placeholder"
                className="rounded-lg border"
              />
            </div>

            {/* Gallery Section */}
            <h2 className="text-xl font-semibold mt-6">Gallery</h2>
            <div className="flex mt-4 space-x-4">
              <img
                src="https://via.placeholder.com/100"
                alt="Gallery Image 1"
                className="rounded-lg border"
              />
              <img
                src="https://via.placeholder.com/100"
                alt="Gallery Image 2"
                className="rounded-lg border"
              />
              <img
                src="https://via.placeholder.com/100"
                alt="Gallery Image 3"
                className="rounded-lg border"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VetProfile;
