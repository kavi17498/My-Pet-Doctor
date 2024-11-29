import React from 'react';
import Navbar from '../components/Navbar';
import ownerdata from '../assets/petprofile.json';
import PetCard from '../components/PetComponent';

function PetOwnerProfile() {
  // Access the first user in the JSON file
  const firstUser = ownerdata.users[0];
  const petData = {
    name: 'Buddy',
    species: 'Dog',
    age: '3 years',
    imageUrl: 'https://via.placeholder.com/150', // Replace with actual pet image URL
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen bg-gray-100">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mt-6">Pet Owner Profile</h1>

        {/* Main Content Section */}
        <div className="flex flex-row items-start justify-center p-6 mt-6 w-4/5">
          {/* Left Section: Profile Information */}
          <div className="flex-1 pr-4 border-r border-gray-200">
            {/* Profile Photo */}
            <img
              src={firstUser.profilePhotoUrl}
              alt={`${firstUser.name}'s Profile`}
              className="w-32 h-32 rounded-full border-2 border-gray-300 mx-auto"
            />

            {/* User Details */}
            <div className="mt-6">
              {/* Name Row */}
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-600">Your Name</label>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-800 mr-4">{firstUser.name}</p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                </div>
              </div>

              {/* Email Row */}
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-800 mr-4">{firstUser.email}</p>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                </div>
              </div>

              {/* Phone Row */}
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-gray-800 mr-4">{firstUser.phone}</p>
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

          {/* Right Section: Placeholder */}
          <div className="flex-1 flex items-center justify-center pl-4">
          <PetCard pet={petData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PetOwnerProfile;
