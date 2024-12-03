import React, { useState } from 'react';
import { db } from '../firebaseconfig'; // Import Firestore instance
import { collection, addDoc } from 'firebase/firestore'; // Firestore functions
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Firebase Storage
import { v4 as uuidv4 } from 'uuid'; // Unique IDs for image names

function AddVeterinarian() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState(''); // Address state
  const [qualifications, setQualifications] = useState(''); // Qualifications state
  const [profilePhoto, setProfilePhoto] = useState(null); // Profile photo state
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const storage = getStorage();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profilePhoto) {
      setError('Please upload a profile photo.');
      return;
    }

    if (images.length !== 3) {
      setError('Please upload exactly 3 images.');
      return;
    }

    try {
      // Add veterinarian details to Firestore
      const docRef = await addDoc(collection(db, 'veterinarians'), {
        name,
        email,
        phoneNumber,
        address, // Save address
        qualifications, // Save qualifications
        createdAt: new Date().toISOString(),
      });

      const vetId = docRef.id;

      // Upload profile photo to Firebase Storage
      const profilePhotoRef = ref(storage, `veterinarians/${vetId}/profile-${uuidv4()}-${profilePhoto.name}`);
      await uploadBytes(profilePhotoRef, profilePhoto);
      const profilePhotoUrl = await getDownloadURL(profilePhotoRef);

      // Upload other images to Firebase Storage
      const imageUrls = [];
      for (const image of images) {
        const imageRef = ref(storage, `veterinarians/${vetId}/images/${uuidv4()}-${image.name}`);
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);
        imageUrls.push(downloadURL);
      }

      // Save image URLs and profile photo URL to Firestore under veterinarian's ID
      await addDoc(collection(db, `veterinarians/${vetId}/images`), { imageUrls });
      await addDoc(collection(db, `veterinarians/${vetId}/profile`), { profilePhotoUrl });

      setSuccess('Veterinarian added successfully with images!');
      setError('');
      setName('');
      setEmail('');
      setPhoneNumber('');
      setAddress('');
      setQualifications('');
      setProfilePhoto(null);
      setImages([]);
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

          {/* Address Input */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2">Address</label>
            <input
              type="text"
              className="input input-bordered w-full border-blue-500"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Qualifications Input */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2">Qualifications</label>
            <input
              type="text"
              className="input input-bordered w-full border-blue-500"
              placeholder="Enter qualifications"
              value={qualifications}
              onChange={(e) => setQualifications(e.target.value)}
              required
            />
          </div>

          {/* Profile Photo Upload */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2">Upload Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              className="w-full"
              required
            />
          </div>

          {/* Other Images Upload */}
          <div className="mb-4">
            <label className="block text-left text-gray-700 mb-2">Upload Images (3)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setImages([...e.target.files])}
              className="w-full"
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
