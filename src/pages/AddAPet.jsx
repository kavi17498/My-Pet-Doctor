import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../firebaseconfig'; // Firestore and Storage instances

function AddAPet() {
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('Dog'); // Default species
  const [birthYear, setBirthYear] = useState('');
  const [petPhoto, setPetPhoto] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [uploading, setUploading] = useState(false);

  const speciesOptions = [
    'Dog',
    'Cat',
    'Fish',
    'Bird',
    'Rabbit',
    'Hamster',
    'Turtle',
    'Snake',
    'Guinea Pig',
    'Lizard',
  ];

  const handlePhotoChange = (e) => {
    setPetPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError('You must be logged in to add a pet.');
      return;
    }

    if (!petName || !species || !birthYear) {
      setError('Please fill out all required fields.');
      return;
    }

    let photoUrl = null;

    if (petPhoto) {
      try {
        setUploading(true);
        const storageRef = ref(storage, `petPhotos/${user.uid}/${Date.now()}_${petPhoto.name}`);
        const uploadTask = uploadBytesResumable(storageRef, petPhoto);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            null,
            (error) => reject(error),
            () => resolve()
          );
        });

        photoUrl = await getDownloadURL(uploadTask.snapshot.ref);
      } catch (err) {
        console.error('Error uploading photo:', err);
        setError('Failed to upload photo. Please try again.');
        setUploading(false);
        return;
      }
    }

    try {
      // Reference the user's pets subcollection
      const petsCollectionRef = collection(db, 'petOwners', user.uid, 'pets');
      await addDoc(petsCollectionRef, {
        petName,
        species,
        birthYear,
        petPhotoUrl: photoUrl || null,
      });

      setSuccess('Pet added successfully!');
      setPetName('');
      setSpecies('Dog');
      setBirthYear('');
      setPetPhoto(null);
    } catch (err) {
      console.error('Error adding pet:', err);
      setError('An error occurred while adding the pet. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Right side: Form */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-gray-100 p-6 rounded shadow-md"
        >
          <h1 className="text-2xl font-bold mb-4 text-center">Add a Pet</h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          {uploading && <p className="text-blue-500 text-sm mb-4">Uploading photo...</p>}

          {/* Pet Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Pet Name
            </label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter pet's name"
            />
          </div>

          {/* Species */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Species
            </label>
            <select
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            >
              {speciesOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Birth Year */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Birth Year
            </label>
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter birth year"
            />
          </div>

          {/* Pet Photo (Optional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Pet Photo (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={uploading}
          >
            {uploading ? 'Adding Pet...' : 'Add Pet'}
          </button>
        </form>
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
