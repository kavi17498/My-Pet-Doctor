import React from 'react';

function PetCard({ pet }) {
  return (
    <div className="flex flex-row items-start bg-white shadow-md rounded-lg p-4 w-96">
      {/* Left Side: Pet Information */}
      <div className="flex-1">
        {/* Pet Name Row */}
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-600">Name</label>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-gray-800 mr-2">{pet.name}</p>
            <button className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button>
          </div>
        </div>

        {/* Species Row */}
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-600">Species</label>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-gray-800 mr-2">{pet.species}</p>
            <button className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button>
          </div>
        </div>

        {/* Age Row */}
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-600">Age</label>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-gray-800 mr-2">{pet.age}</p>
            <button className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Pet Image */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={pet.imageUrl}
          alt={`${pet.name}'s profile`}
          className="w-24 h-24 rounded-lg shadow-md object-cover"
        />
      </div>
    </div>
  );
}

export default PetCard;
