import React from 'react';

function PetCard({ pet }) {
  const { name, species, age, imageUrl } = pet;

  return (
    <div className="pet-card bg-white shadow-md rounded-lg p-4 w-64 mt-5">
      <img
        src={imageUrl || 'https://via.placeholder.com/150'}
        alt={`${name || 'Pet'}'s Image`}
        className="w-full h-32 object-cover rounded-lg"
      />
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-sm text-gray-600">{species}</p>
        <p className="text-sm text-gray-600">{age}</p>
      </div>
    </div>
  );
}

export default PetCard;
