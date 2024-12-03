import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PetCard from '../components/PetComponent';
import { db } from '../firebaseconfig'; // Firestore instance

function PetOwnerProfile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [ownerDetails, setOwnerDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const petData = {
    name: 'Buddy',
    species: 'Dog',
    age: '3 years',
    imageUrl: 'https://via.placeholder.com/150', // Replace with actual pet image URL
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setCurrentUser(user);

        try {
          const ownerDocRef = doc(db, 'users', user.uid); // Corrected collection path
          const ownerDoc = await getDoc(ownerDocRef);

          if (ownerDoc.exists()) {
            setOwnerDetails(ownerDoc.data());
          } else {
            console.error('No owner details found in Firestore.');
          }
        } catch (error) {
          console.error('Error fetching owner details:', error);
        }
      } else {
        navigate('/login'); // Redirect if user is not authenticated
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!ownerDetails) {
    return <div>Owner details not available.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mt-6">Pet Owner Profile</h1>
        <div className="flex flex-row items-start justify-center p-6 mt-6 w-4/5">
          <div className="flex-1 pr-4 border-r border-gray-200">
            <img
              src={ownerDetails.profilePhotoUrl || 'https://via.placeholder.com/150'}
              alt={`${ownerDetails.fullname || 'User'}'s Profile`}
              className="w-32 h-32 rounded-full border-2 border-gray-300 mx-auto"
            />
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-600">Your Name</label>
                <p className="text-lg font-semibold text-gray-800 mr-4">{ownerDetails.fullName}</p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-lg font-semibold text-gray-800 mr-4">{currentUser.email}</p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-600">Phone</label>
                <p className="text-lg font-semibold text-gray-800 mr-4">
                  {ownerDetails.address || 'Phone number not available'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center pl-4">
            <PetCard pet={petData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PetOwnerProfile;
