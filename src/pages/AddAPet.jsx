import React from 'react';

function AddAPet() {
  return (
    <div className="flex h-screen">
     {/* Right side: Text */}
     <div className="flex-1 flex justify-center items-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Add a Pet</h1>
          <p className="text-lg text-gray-600">
            Fill in the details to add your pet to our system.
          </p>
        </div>
      </div>
      
      {/* Left side: Image */}
      <div className="flex-1 flex justify-center items-center bg-gray-200">
        <img
          src="https://via.placeholder.com/400"
          alt="Pet"
          className="max-w-full max-h-full"
        />
      </div>

     
    </div>
  );
}

export default AddAPet;
