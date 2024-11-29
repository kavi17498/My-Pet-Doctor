import React, { useState } from 'react';
import { db } from '../firebaseconfig'; // Import Firestore instance
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions

function AddVeterinarian() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add veterinarian details to Firestore
      await addDoc(collection(db, 'veterinarians'), {
        name,
        email,
        phoneNumber,
        createdAt: new Date().toISOString(), // Optional timestamp
      });
      setSuccess('Veterinarian added successfully!');
      setError('');
      // Reset the form
      setName('');
      setEmail('');
      setPhoneNumber('');
    } catch (err) {
      console.error('Error adding veterinarian: ', err);
      setError('Failed to add veterinarian. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-green-600">Add Veterinarian</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2">Name</label>
            <input
              type="text"
              className="input input-bordered w-full border-blue-500"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2">Email</label>
            <input
              type="email"
              className="input input-bordered w-full border-blue-500"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              className="input input-bordered w-full border-blue-500"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add Veterinarian
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddVeterinarian;
